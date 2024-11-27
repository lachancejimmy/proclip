import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { useAuth } from '../../lib/auth';

export default function SocialLogin() {
  const { t } = useTranslation();
  const { signInWithGoogle, loading } = useAuth();

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            {t('auth.orContinueWith')}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full"
          icon={
            <img
              className="h-5 w-5"
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
          }
        >
          Google
        </Button>
      </div>
    </div>
  );
}