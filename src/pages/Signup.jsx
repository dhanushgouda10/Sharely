import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';

export function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate brief loading state for smooth UX
    setTimeout(() => {
      // Save user data to localStorage
      const userData = {
        email: email,
        name: email.split('@')[0], // Use part of email as name
        avatar: null
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('loginSuccess', 'true');
      
      // Show success state
      setIsSuccess(true);
      
      // Trigger auth-change event to update navbar in same tab
      window.dispatchEvent(new Event('auth-change'));
      
      // Navigate back to landing page after brief delay
      setTimeout(() => {
        navigate('/');
      }, 300);
    }, 500);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white transition-opacity duration-500 ${
      isSuccess && isLoading === false ? 'opacity-95' : 'opacity-100'
    }`}>
      <nav className="flex items-center justify-between px-4 lg:px-8 py-5 bg-white">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-green-600">Nextdoor</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-[oklch(20.8%_0.042_265.755)] hover:text-green-700 font-medium">
            Log in
          </Link>
        </div>
      </nav>

      <div className="w-full border-t border-gray-150"></div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create an account to join your neighborhood.
            </h1>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <Button 
              variant="outline" 
              className="w-[400px] h-12 rounded-[50px] justify-start gap-3 bg-[oklch(92.8%_0.006_264.531)] hover:bg-slate-200  text-[oklch(20.8%_0.042_265.755)] font-bold   !border-none" 
              type="button"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            <Button 
              variant="outline" 
             className="w-[400px] h-12 rounded-[50px] justify-start gap-3 bg-[oklch(92.8%_0.006_264.531)] hover:bg-gray-300 text-[oklch(20.8%_0.042_265.755)] !border-none" 
              type="button"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13 1.86 1.15 2.5 1.95 4.12 1.95 1.12 0 1.9-.27 3.07-.92 1.27-.82 2.13-2.17 3.32-2.18 1.2 0 1.96.91 3.22 1.9zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
            <div className="space-y-2">

      
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border-gray-400 h-12 w-[400px] font-medium  text-[oklch(20.8%_0.042_265.755)] placeholder:text-[oklch(20.8%_0.042_265.755)] focus:border-green-500 focus:ring-green-500"
                  required
                />
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=" Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border-gray-400 h-12 w-[400px] pr-10 font-medium text-[oklch(20.8%_0.042_265.755)] placeholder:text-[oklch(20.8%_0.042_265.755)] focus:border-green-500 focus:ring-green-500"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 w-[400px] text-[oklch(20.8%_0.042_265.755)] ">
              By continuing with sign up, you agree to our{' '}
              <Link to="#" className="text-[oklch(20.8%_0.042_265.755)] underline hover:no-underline">Privacy Policy</Link>,{' '}
              <Link to="#" className="text-[oklch(20.8%_0.042_265.755)] underline hover:no-underline">Cookie Policy</Link>, and{' '}
              <Link to="#" className="text-[oklch(20.8%_0.042_265.755)] underline hover:no-underline">Member Agreement</Link>.
            </p>
            <Button 
              type="submit" 
              disabled={isLoading}
              className={`w-[400px] h-12 rounded-[50px] text-white font-medium mt-4 transition-all duration-300 flex items-center justify-center gap-2 ${
                isSuccess 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-green-600 hover:bg-green-700 disabled:opacity-75'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Success!</span>
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link to="#" className="text-[oklch(20.8%_0.042_265.755)] hover:text-green-700 font-medium text-sm">
              Have a business? Get started
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-6 text-[13px] text-[oklch(20.8%_0.042_265.755)] ">
            <Lock className="h-3 w-3" />
            <span>Your information is</span><span className="underline hover:no-underline "> safe and secure.</span>
            <Link to="#" className="text-[oklch(20.8%_0.042_265.755)]  font-bold underline hover:no-underline  ml-2">
              Help
            </Link>
          </div>
    </div>
  );
}
