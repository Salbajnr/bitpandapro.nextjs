// Send email function placeholder - In a production environment, configure Supabase Auth Email Templates
// or implement a custom email sending solution using services like Resend, SendGrid, etc.
export async function sendEmail(to: string, subject: string, html: string, text?: string) {
  console.warn('Email sending is not configured. Please set up Supabase Auth Email Templates or a custom email service.');
  
  // In a production environment, you would integrate with an email service here
  // For example, using Resend, SendGrid, or configuring Supabase Auth Email Templates
  
  // For now, we'll simulate successful email sending for development purposes
  console.log(`📧 Simulated email send to ${to}: ${subject}`);
  console.log(`HTML Content: ${html.substring(0, 100)}...`);
  
  return { 
    success: true, 
    messageId: 'simulated-' + Date.now(), 
    accepted: [to], 
    rejected: [], 
    error: null 
  };
}

// Send verification email
export async function sendVerificationEmail(to: string, verificationToken: string) {
  const subject = 'Verify your email address';
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${verificationToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #103e36; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Bitpanda Pro</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #103e36;">Verify your email address</h2>
        <p>Thank you for registering with Bitpanda Pro. Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #103e36; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
        <p><a href="${verificationUrl}">${verificationUrl}</a></p>
        <p>This link will expire in 24 hours.</p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          If you didn't create an account with Bitpanda Pro, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;
  
  const text = `
    Verify your email address
    
    Thank you for registering with Bitpanda Pro. Please copy and paste this link into your browser to verify your email address:
    
    ${verificationUrl}
    
    This link will expire in 24 hours.
    
    If you didn't create an account with Bitpanda Pro, you can safely ignore this email.
  `;
  
  const result = await sendEmail(to, subject, html, text);
  if (!result.success) {
    console.error('Failed to send verification email:', result.error);
    throw new Error(`Failed to send verification email: ${result.error}`);
  }
  return result;
}

// Send password reset email
export async function sendPasswordResetEmail(to: string, resetToken: string) {
  const subject = 'Password Reset Request';
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #103e36; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Bitpanda Pro</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #103e36;">Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #103e36; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          This email was sent to ${to} because someone requested a password reset for this account.
        </p>
      </div>
    </div>
  `;
  
  const text = `
    Password Reset Request
    
    We received a request to reset your password. Copy and paste this link into your browser to reset it:
    
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you didn't request a password reset, you can safely ignore this email.
  `;
  
  const result = await sendEmail(to, subject, html, text);
  if (!result.success) {
    console.error('Failed to send password reset email:', result.error);
    throw new Error(`Failed to send password reset email: ${result.error}`);
  }
  return result;
}