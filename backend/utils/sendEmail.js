const sgMail = require('@sendgrid/mail');

const sendEmail = async (options) => {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  } else {
    console.log('[Email Service Mock Output] SENDGRID_API_KEY not set.');
    console.log(`To: ${options.email} | Subject: ${options.subject}`);
    console.log(`[Email Service Message]: ${options.message}`);
    return;
  }

  const msg = {
    to: options.email,
    from: process.env.FROM_EMAIL || 'noreply@portfolioplatform.com',
    subject: options.subject,
    text: options.message,
    html: options.html || `<p>${options.message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    const response = await sgMail.send(msg);
    console.log('SendGrid Email sent successfully:', response[0].statusCode);
  } catch (error) {
    console.error('SendGrid Error sending email:');
    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error);
    }
    throw error;
  }
};

module.exports = sendEmail;
