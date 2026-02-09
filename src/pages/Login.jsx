import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-section">
      <nav className="flex items-center justify-between px-4 lg:px-8 py-5 bg-white border-b border-border/60">
        <Link to="/" className="flex items-center gap-2">
          <HeartHandshake className="h-8 w-8 text-primary" />
          <span className="font-semibold text-xl text-primary">Share-Nearby</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/signup">
            <Button variant="outline" className="rounded-xl px-5">Sign up</Button>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-b from-section to-background">
        <Card className="w-full max-w-md rounded-3xl border border-border/60 shadow-soft-lg bg-white p-8">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Welcome back
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              Sign in to your account to continue
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-border h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-border h-11 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-11 rounded-xl shadow-button mt-2">
                Sign in
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
