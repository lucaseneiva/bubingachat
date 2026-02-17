import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    clearError();
    const success = await login(email, password);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-card border border-border p-8 shadow-card">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-semibold text-text-primary">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Or{' '}
              <Link to="/register" className="font-medium text-primary hover:text-primary-hover transition-colors">
                create a new account
              </Link>
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-input text-sm">
                {error}
              </div>
            )}
            
            <Input
              label="Email address"
              type="email"
              name="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              error={errors.email}
              required
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              error={errors.password}
              required
            />
            
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="w-full mt-2"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
