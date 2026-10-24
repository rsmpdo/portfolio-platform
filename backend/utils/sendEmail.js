const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const { createBrandedEmailTemplate } = require('./emailTemplate');

const sendEmail = async (options) => {
  const renderedHtml =
    options.html ||
    createBrandedEmailTemplate({
      subtitle: options.subject || '',
      recipientName: options.recipientName || '',
      contentHtml: `<p style="margin: 0; line-height: 1.6;">${(options.message || '').replace(/\n/g, '<br>')}</p>`,
      footerNote: options.footerNote || ''
    });

  // Option 1: Gmail Direct SMTP (App Password)
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, '') // remove spaces
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const message = {
        from: `PortfolioCraft <${process.env.GMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: renderedHtml
      };

      const info = await transporter.sendMail(message);
      console.log('Gmail SMTP Email sent successfully:', info.messageId);
      return;
    } catch (err) {
      console.error('Gmail SMTP Error:', err);
      throw err;
    }
  }

  // Option 2: SendGrid API
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: options.email,
      from: process.env.FROM_EMAIL || 'noreply@portfolioplatform.com',
      subject: options.subject,
      text: options.message,
      html: renderedHtml,
    };

    try {
      const response = await sgMail.send(msg);
      console.log('SendGrid Email sent successfully:', response[0].statusCode);
      return;
    } catch (error) {
      console.error('SendGrid Error sending email:');
      if (error.response) console.error(error.response.body);
      else console.error(error);
      throw error;
    }
  }

  console.log('[Email Service Mock Output] No email credentials provided.');
  console.log(`To: ${options.email} | Subject: ${options.subject}`);
};

module.exports = sendEmail;
