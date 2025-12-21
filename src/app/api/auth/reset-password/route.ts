import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyPasswordResetToken, deletePasswordResetToken } from '@/lib/tokens';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    
    if (!token || !password) {
      return Response.json(
        { error: 'Token and password are required' }, 
        { status: 400 }
      );
    }
    
    // Verify the token
    const user = await verifyPasswordResetToken(token);
    
    if (!user) {
      return Response.json(
        { error: 'Invalid or expired token' }, 
        { status: 400 }
      );
    }
    
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return Response.json(
        { error: 'Server configuration error' }, 
        { status: 500 }
      );
    }
    
    // Update the user's password in Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      password,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Delete the used token
    await deletePasswordResetToken(token);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error resetting password:', error);
    return Response.json(
      { error: 'Failed to reset password' }, 
      { status: 500 }
    );
  }
}