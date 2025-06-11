import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../auth/services/authService';
import PropTypes from 'prop-types';

const EmailVerification = ({ user }) => {
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendOtp, setResendOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [resentMessage, setResentMessage] = useState(false);
  const hasSentRef = useRef(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('email');

  const getMaskedEmail = () => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return email;

    const visible = localPart.slice(0, 2);
    const masked = '*'.repeat(localPart.length - 2);
    return `${visible}${masked}@${domain}`;
  };
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
      const prevInput = document.querySelector(
        `.otp-inputs input:nth-child(${index})`
      );
      prevInput?.focus();
      e.preventDefault();
    }
  };

  const sendOtp = async () => {
    try {
      await AuthService.sendOtp(email);
      setResendOtp(false);
      setCountdown(30);
      setResentMessage(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      const nextInput = document.querySelector(
        `.otp-inputs input:nth-child(${index + 2})`
      );
      nextInput?.focus();
    }

    if (!value && index > 0) {
      const prevInput = document.querySelector(
        `.otp-inputs input:nth-child(${index})`
      );
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.verifyOtp({
        otp: otp.join(''),
        email: email,
        role: 'ACCOUNT_VERIFICATION',
      });

      setMessage(response.data);

      if (response.status !== 200) {
        setOtp(['', '', '', '', '', '']);
        setTimeout(() => {
          document.querySelector('.otp-inputs input')?.focus();
        }, 0);
        setTimeout(() => setMessage(''), 3000);
        return;
      }

      navigate('/verification-successful');
    } catch (error) {
      console.error('Error verifying email:', error);
      setMessage('An error occurred while verifying the email.');
    }
  };

  useEffect(() => {
    if (hasSentRef.current) return;
    hasSentRef.current = true;
    const initSend = async () => {
      try {
        await AuthService.sendOtp(email);
      } catch (error) {
        console.error('Initial OTP send failed:', error);
      }
    };
    initSend();
  }, [email]);

  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      const timeout = setTimeout(() => {
        document.querySelector('form.otp-form')?.requestSubmit();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [otp]);

  useEffect(() => {
    const initSend = async () => {
      try {
        await AuthService.sendOtp(email);
      } catch (error) {
        console.error('Initial OTP send failed:', error);
      }
    };
    initSend();
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setResendOtp(true);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="email-verification">
      <div className="email-verification-header">
        <h1>Enhance Your Security</h1>

        {resentMessage ? (
          <p className="resent-message">
            A new OTP has been sent to <strong>{getMaskedEmail()}</strong>
          </p>
        ) : (
          <p>
            Protect your account with an extra layer of security. Enter the
            verification code sent to <strong>{getMaskedEmail()}</strong>
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="otp-form">
        <h2>Email Verification</h2>
        <p>Please enter the OTP sent to your email:</p>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        {message && (
          <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>
        )}
      </form>

      {resendOtp ? (
        <p>
          Didn't receive the OTP?{' '}
          <span className="resend-otp-btn" onClick={sendOtp}>
            Resend OTP
          </span>
        </p>
      ) : (
        <p>Resend available in {countdown}s</p>
      )}
    </div>
  );
};

EmailVerification.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default EmailVerification;
