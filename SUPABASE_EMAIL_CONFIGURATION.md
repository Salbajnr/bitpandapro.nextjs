# Supabase Email Configuration Guide

## Overview

This document explains how to configure Supabase's built-in email service for authentication-related emails (registration, password reset, email verification) instead of using external SMTP providers like Gmail.

## Current Implementation

The application has been refactored to remove the dependency on Gmail SMTP and nodemailer. Instead, it now uses a simulated email sending approach for development purposes. In production, you should configure one of the following options:

1. Supabase Auth Email Templates (recommended)
2. Custom email service (Resend, SendGrid, etc.)

## Option 1: Using Supabase Auth Email Templates (Recommended)

### Step 1: Configure Email Templates in Supabase Dashboard

1. Log in to your Supabase project dashboard
2. Navigate to **Authentication** > **Email Templates**
3. Customize the following templates:
   - **Confirm Signup**: Email sent when users sign up
   - **Reset Password**: Email sent when users request password reset
   - **Magic Link**: Email for passwordless sign-in (if enabled)
   - **Email Change**: Email for email address changes (if enabled)
   - **Invite User**: Email for user invitations (if enabled)

### Step 2: Configure SMTP Settings (Optional but Recommended for Production)

While Supabase provides a default SMTP service, it's limited and not suitable for production. Configure a custom SMTP provider:

1. In the Supabase dashboard, go to **Authentication** > **SMTP Settings**
2. Toggle **Enable Custom SMTP** to ON
3. Select your email provider (or choose "Other" for custom settings)
4. Enter your SMTP credentials:
   - **Sender Email**: The email address that will send emails
   - **Sender Name**: The name that will appear as the sender
   - **Host**: Your SMTP host (e.g., smtp.resend.com)
   - **Port**: Your SMTP port (e.g., 465 for SSL)
   - **Username**: Your SMTP username
   - **Password**: Your SMTP password or API key

Popular SMTP providers compatible with Supabase:
- **Resend**: Host: smtp.resend.com, Port: 465, Username: resend, Password: [API Key]
- **SendGrid**: Host: smtp.sendgrid.net, Port: 587, Username: apikey, Password: [API Key]
- **Amazon SES**: Host: email-smtp.[region].amazonaws.com, Port: 587, Username: [Access Key ID], Password: [Secret Access Key]

### Step 3: Enable Email Confirmation (Optional)

To require email confirmation before users can sign in:

1. Go to **Authentication** > **Settings**
2. Toggle **Email Confirmations** to ON

## Option 2: Using a Custom Email Service

If you prefer to use a custom email service like Resend, SendGrid, etc., you can implement it using Supabase Auth Hooks.

### Step 1: Create a Supabase Edge Function

1. Install the Supabase CLI if you haven't already:
   ```bash
   npm install -g supabase
   ```

2. Create a new function:
   ```bash
   supabase functions new send-email
   ```

3. Edit the function to handle email sending with your preferred service:
   ```javascript
   // Example using Resend
   import { Resend } from 'resend';
   
   const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
   
   Deno.serve(async (req) => {
     const { email, token, redirectTo, type, template } = await req.json();
     
     let subject, html;
     switch (type) {
       case 'signup':
         subject = 'Confirm Your Email';
         html = `<p>Click <a href="${redirectTo}">here</a> to confirm your email.</p>`;
         break;
       case 'magiclink':
       case 'recovery':
         subject = 'Login Link';
         html = `<p>Click <a href="${redirectTo}">here</a> to login.</p>`;
         break;
       case 'invite':
         subject = 'You have been invited';
         html = `<p>Click <a href="${redirectTo}">here</a> to accept the invitation.</p>`;
         break;
       case 'email_change':
         subject = 'Confirm Email Change';
         html = `<p>Click <a href="${redirectTo}">here</a> to confirm the email change.</p>`;
         break;
       default:
         subject = 'Hello World';
         html = `<p>${template}</p>`;
     }
     
     try {
       const { data, error } = await resend.emails.send({
         from: 'Your App <onboarding@resend.dev>',
         to: email,
         subject,
         html,
       });
       
       if (error) {
         return new Response(JSON.stringify({ error }), {
           status: 500,
           headers: { 'Content-Type': 'application/json' },
         });
       }
       
       return new Response(JSON.stringify(data), {
         headers: { 'Content-Type': 'application/json' },
       });
     } catch (error) {
       return new Response(JSON.stringify({ error: error.message }), {
         status: 500,
         headers: { 'Content-Type': 'application/json' },
       });
     }
   });
   ```

### Step 2: Deploy the Function

```bash
supabase functions deploy send-email --project-ref your-project-ref
```

### Step 3: Configure the Auth Hook

1. In the Supabase dashboard, go to **Authentication** > **Hooks**
2. Set the **Send Email Hook** to point to your deployed function:
   ```
   https://your-project-ref.functions.supabase.co/send-email
   ```

## Testing Email Functionality

To test email functionality in development:

1. Run the verification script:
   ```bash
   npm run verify-production
   ```

2. The script will show simulated email sending. In production, emails will be sent through your configured provider.

## Troubleshooting

### Common Issues

1. **Emails not being sent**: 
   - Check that your SMTP settings are correct
   - Verify that your email provider is not blocking the connection
   - Ensure your sender email is verified with your email provider

2. **Emails going to spam**:
   - Set up SPF, DKIM, and DMARC records for your domain
   - Use a recognizable sender name and email
   - Include proper unsubscribe links in your emails

3. **Rate limiting**:
   - Check your email provider's rate limits
   - Implement exponential backoff for bulk email sending

### Logs and Monitoring

Monitor your email sending through:
- Supabase logs in the dashboard
- Your email provider's analytics dashboard
- Application logs for email sending errors

## Security Considerations

1. **API Keys**: Store SMTP credentials and API keys as environment variables
2. **Email Content**: Sanitize user input in email templates to prevent injection attacks
3. **Rate Limiting**: Implement rate limiting to prevent abuse of email sending
4. **Email Verification**: Always verify email addresses before sending sensitive information

## Further Reading

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Supabase SMTP Configuration](https://supabase.com/docs/guides/auth/auth-smtp)
- [Supabase Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks)