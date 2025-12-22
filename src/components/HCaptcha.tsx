"use client";

import React from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface HCaptchaProps {
  onVerify: (token: string) => void;
  onError?: (error: string) => void;
  onExpire?: () => void;
}

const HCaptchaComponent: React.FC<HCaptchaProps> = ({ 
  onVerify, 
  onError,
  onExpire
}) => {
  const handleVerify = (token: string) => {
    console.log('hCaptcha token:', token);
    onVerify(token);
  };

  const handleError = (error: string) => {
    console.error('hCaptcha error:', error);
    if (onError) onError(error);
  };

  const handleExpire = () => {
    console.log('hCaptcha expired');
    if (onExpire) onExpire();
  };

  return (
    <div className="mb-4">
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
        onVerify={handleVerify}
        onError={handleError}
        onExpire={handleExpire}
      />
    </div>
  );
};

export default HCaptchaComponent;