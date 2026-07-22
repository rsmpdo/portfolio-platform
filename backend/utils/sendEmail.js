const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create reusable transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL || '',
      pass: process.env.SMTP_PASSWORD || ''
    }
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Portfolio Platform'} <${process.env.FROM_EMAIL || 'noreply@portfolioplatform.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || `<p>${options.message}</p>`
  };

  if (process.env.SMTP_HOST && process.env.SMTP_EMAIL) {
    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
  } else {
    console.log(`[Email Service Mock Output] To: ${options.email} | Subject: ${options.subject}`);
    console.log(`[Email Service Message]: ${options.message}`);
  }
};

module.exports = sendEmail;
