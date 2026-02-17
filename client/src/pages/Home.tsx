import { Link } from 'react-router';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="relative overflow-hidden">
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl font-display font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                Welcome to <span className="text-primary">BubingaChat</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-lg text-text-secondary">
                Your elegant space for meaningful conversations. Connect with friends, join communities, and chat in real-time.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link to="/login">
                  <Button className="px-8 py-3">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" className="px-8 py-3">Create Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-semibold tracking-tight text-text-primary sm:text-4xl">
              Why Choose BubingaChat?
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Designed for clarity, built for connection.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-6 rounded-card border border-border">
              <div className="mx-auto h-12 w-12 bg-primary-light rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-text-primary">Real-time Messaging</h3>
              <p className="mt-2 text-base text-text-secondary">
                Experience instant communication with low-latency messaging.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-card border border-border">
              <div className="mx-auto h-12 w-12 bg-primary-light rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-text-primary">Community Focused</h3>
              <p className="mt-2 text-base text-text-secondary">
                Create and join communities based on your interests.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-card border border-border">
              <div className="mx-auto h-12 w-12 bg-primary-light rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-text-primary">Secure & Private</h3>
              <p className="mt-2 text-base text-text-secondary">
                Your data is protected with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
