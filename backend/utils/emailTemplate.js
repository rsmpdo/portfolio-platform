/**
 * Centralized Branded Email Template Builder for PortfolioCraft.
 * Produces clean, responsive, dark-mode luxury HTML emails matching
 * the platform's signature styling.
 */

function createBrandedEmailTemplate({
  subtitle = '',
  recipientName = '',
  contentHtml = '',
  ctaText = '',
  ctaUrl = '',
  details = null,
  footerNote = ''
}) {
  const greeting = recipientName ? `Hello <strong>${recipientName}</strong>,` : 'Hello,';

  let detailsHtml = '';
  if (details && Array.isArray(details) && details.length > 0) {
    const rows = details
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px 14px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.06);">${item.label}</td>
          <td style="padding: 10px 14px; color: #ffffff; font-weight: 600; font-size: 13px; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.06);">${item.value}</td>
        </tr>
      `
      )
      .join('');

    detailsHtml = `
      <div style="margin: 22px 0;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; border-collapse: separate; overflow: hidden;">
          ${rows}
        </table>
      </div>
    `;
  }

  let ctaHtml = '';
  if (ctaText && ctaUrl) {
    ctaHtml = `
      <div style="text-align: center; margin: 32px 0;">
        <a href="${ctaUrl}" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: #ffffff; padding: 14px 28px; border-radius: 10px; font-weight: bold; text-decoration: none; display: inline-block; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); font-size: 14px;">
          ${ctaText}
        </a>
      </div>
      <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin: 20px 0 0 0;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${ctaUrl}" target="_blank" rel="noopener noreferrer" style="color: #818cf8; word-break: break-all; text-decoration: underline;">${ctaUrl}</a>
      </p>
    `;
  }

  const defaultFooter = footerNote || 'If you did not request this, please ignore this email or contact support.';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PortfolioCraft</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #060911; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #0b0f19; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.6); overflow: hidden;">
          <tr>
            <td style="padding: 36px 32px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="color: #6366f1; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">PortfolioCraft</h2>
                ${subtitle ? `<p style="color: #94a3b8; font-size: 13.5px; margin: 6px 0 0 0;">${subtitle}</p>` : ''}
              </div>

              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                ${greeting}
              </p>

              <div style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
                ${contentHtml}
              </div>

              ${detailsHtml}

              ${ctaHtml}

              <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 28px 0 20px 0;" />

              <p style="color: #64748b; font-size: 11.5px; text-align: center; margin: 0; line-height: 1.5;">
                ${defaultFooter}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Pre-built template for Initial Email Verification
 */
function getEmailVerificationTemplate({ recipientName, verifyUrl }) {
  return createBrandedEmailTemplate({
    subtitle: 'Verify Your Email Address',
    recipientName,
    contentHtml: `
      <p style="margin: 0 0 12px 0;">
        Welcome to <strong>PortfolioCraft</strong>! Thank you for joining our platform.
      </p>
      <p style="margin: 0 0 12px 0;">
        Please confirm your email address by clicking the button below so you can publish your portfolio, customize themes, and unlock full platform capabilities.
      </p>
      <p style="margin: 0; color: #cbd5e1;">
        This verification link will remain valid for <strong>24 hours</strong>.
      </p>
    `,
    ctaText: 'Verify Email Address',
    ctaUrl: verifyUrl,
    footerNote: 'If you did not create an account on PortfolioCraft, you can safely ignore this email.'
  });
}

/**
 * Pre-built template for Password Reset
 */
function getPasswordResetTemplate({ recipientName, resetUrl, expiresIn = '10 minutes' }) {
  return createBrandedEmailTemplate({
    subtitle: 'Password Reset Request',
    recipientName,
    contentHtml: `
      <p style="margin: 0 0 12px 0;">
        We received a request to reset your PortfolioCraft account password. Click the button below to choose a new password.
      </p>
      <p style="margin: 0; color: #cbd5e1;">
        This link is valid for <strong>${expiresIn}</strong>.
      </p>
    `,
    ctaText: 'Reset Password',
    ctaUrl: resetUrl,
    footerNote: 'If you didn\'t request a password reset, you can safely ignore this email. Your password will remain unchanged.'
  });
}

/**
 * Pre-built template for Premium Tier Purchase Confirmation
 */
function getPaymentApprovedTemplate({ recipientName, plan, amount, adminNote, clientUrl }) {
  const planUpper = String(plan || 'pro').toUpperCase();
  const loginUrl = `${clientUrl || 'https://portfoliocraftlk.vercel.app'}/login`;

  const details = [
    { label: 'Purchased Plan', value: `${planUpper} Tier` },
    { label: 'Amount Paid', value: `$${amount} USD` },
    { label: 'Access Type', value: 'One-Time Lifetime Access' },
    { label: 'Status', value: 'Verified & Activated ✅' }
  ];

  const adminNoteHtml = adminNote
    ? `<div style="margin: 16px 0; padding: 12px 16px; background-color: rgba(99, 102, 241, 0.08); border-left: 3px solid #6366f1; border-radius: 4px; color: #c7d2fe; font-size: 13px;"><strong>Note from Team:</strong> ${adminNote}</div>`
    : '';

  return createBrandedEmailTemplate({
    subtitle: `${planUpper} Plan - Payment Approved!`,
    recipientName,
    contentHtml: `
      <p style="margin: 0 0 12px 0;">
        Great news! Your payment for the PortfolioCraft <strong>${planUpper} Plan</strong> has been verified and successfully approved.
      </p>
      <p style="margin: 0 0 12px 0;">
        Your account has been upgraded with all premium capabilities unlocked - including custom domains, high-tier layouts, analytics, and white-label branding.
      </p>
      ${adminNoteHtml}
      <p style="margin: 0;">
        This is a one-time lifetime purchase with zero recurring subscription fees.
      </p>
    `,
    details,
    ctaText: 'Open Portfolio Studio',
    ctaUrl: loginUrl,
    footerNote: 'Thank you for building with PortfolioCraft! If you need any assistance, reach out to our team at any time.'
  });
}

/**
 * Pre-built template for Payment Request Update Required / Rejection
 */
function getPaymentRejectedTemplate({ recipientName, plan, reason, clientUrl }) {
  const planUpper = String(plan || 'pro').toUpperCase();
  const pricingUrl = `${clientUrl || 'https://portfoliocraftlk.vercel.app'}/pricing`;

  return createBrandedEmailTemplate({
    subtitle: 'Payment Verification Update',
    recipientName,
    contentHtml: `
      <p style="margin: 0 0 12px 0;">
        We reviewed your payment submission for the PortfolioCraft <strong>${planUpper} Plan</strong>.
      </p>
      <div style="margin: 16px 0; padding: 14px 16px; background-color: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; border-radius: 6px; color: #fca5a5; font-size: 13.5px;">
        <strong>Reason:</strong> ${reason || 'We were unable to verify the attached transaction proof.'}
      </div>
      <p style="margin: 0;">
        Please visit our pricing page to resubmit your transaction ID or a clearer payment receipt. If you have already transferred funds, our support team will gladly assist you.
      </p>
    `,
    ctaText: 'Resubmit Payment Proof',
    ctaUrl: pricingUrl,
    footerNote: 'If you believe this is an error, simply reply to this email or contact support.'
  });
}

/**
 * Pre-built template for Admin Moderation Warning
 */
function getModerationWarningTemplate({ recipientName, warningMessage, clientUrl }) {
  const editorUrl = `${clientUrl || 'https://portfoliocraftlk.vercel.app'}/editor`;

  return createBrandedEmailTemplate({
    subtitle: 'Account Moderation Notice',
    recipientName,
    contentHtml: `
      <p style="margin: 0 0 12px 0;">
        Our platform administration team has conducted a routine review of your published portfolio and issued the following notice:
      </p>
      <div style="margin: 16px 0; padding: 14px 16px; background-color: rgba(245, 158, 11, 0.08); border-left: 3px solid #f59e0b; border-radius: 6px; color: #fde68a; font-size: 13.5px;">
        ${warningMessage || 'Please ensure all content in your portfolio complies with community guidelines.'}
      </div>
      <p style="margin: 0;">
        Please log in to your editor and update your portfolio content accordingly to maintain active public visibility.
      </p>
    `,
    ctaText: 'Review Portfolio',
    ctaUrl: editorUrl,
    footerNote: 'PortfolioCraft Trust & Safety Team.'
  });
}

/**
 * Pre-built template for Newsletter Welcome
 */
function getNewsletterWelcomeTemplate({ email, clientUrl }) {
  const exploreUrl = `${clientUrl || 'https://portfoliocraftlk.vercel.app'}/templates`;

  return createBrandedEmailTemplate({
    subtitle: 'Welcome to Weekly Tips & Masterclasses',
    recipientName: email.split('@')[0],
    contentHtml: `
      <p style="margin: 0 0 12px 0;">
        Thank you for subscribing to <strong>PortfolioCraft Weekly</strong>!
      </p>
      <p style="margin: 0 0 12px 0;">
        Every week, you will receive concise, actionable insights on high-converting portfolio structures, client acquisition case studies, and modern UI design techniques.
      </p>
      <p style="margin: 0;">
        In the meantime, feel free to browse our collection of hand-crafted designer and developer templates.
      </p>
    `,
    ctaText: 'Explore Templates',
    ctaUrl: exploreUrl,
    footerNote: 'You received this email because you subscribed to PortfolioCraft Weekly. You can unsubscribe at any time.'
  });
}

module.exports = {
  createBrandedEmailTemplate,
  getEmailVerificationTemplate,
  getPasswordResetTemplate,
  getPaymentApprovedTemplate,
  getPaymentRejectedTemplate,
  getModerationWarningTemplate,
  getNewsletterWelcomeTemplate
};
