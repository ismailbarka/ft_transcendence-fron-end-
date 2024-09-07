// /Users/isbarka/Desktop/ft_transcendence-fron-end-/front/Components/QRCodeGeneratore/QRCodeGeneratore.tsx
import React from 'react';
import { QRCode } from 'qrcode.react';

interface QRCodeGeneratoreProps {
  otpUri: string;
}

const QRCodeGeneratore: React.FC<QRCodeGeneratoreProps> = ({ otpUri }) => {
  return (
    <div>
      <h2>Scan this QR Code with your OTP Authenticator App</h2>
      <QRCode value={otpUri} size={256} level={"H"} />
    </div>
  );
};

export default QRCodeGeneratore;
