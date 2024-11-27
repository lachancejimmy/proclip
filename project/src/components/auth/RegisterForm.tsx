import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SocialLogin from './SocialLogin';

export default function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp, loading, error } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError(t('auth.passwordMismatch'));
      return;
    }

    try {
      await signUp(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by auth store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.createAccount')}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={t('auth.email')}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={t('auth.password')}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
            />

            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label={t('auth.confirmPassword')}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              error={passwordError || error}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            {t('auth.createAccount')}
          </Button>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
}