import React from 'react';
import { useAuth, SignIn, SignUp } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  Activity, 
  Zap, 
  Shield, 
  Clock, 
  Code, 
  Database,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [showAuth, setShowAuth] = useState<'signin' | 'signup' | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Send HTTP requests instantly with real-time response viewing'
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Support for Bearer tokens, Basic auth, and API key authentication'
    },
    {
      icon: Clock,
      title: 'Request History',
      description: 'Keep track of all your API calls with searchable history'
    },
    {
      icon: Code,
      title: 'JSON Editor',
      description: 'Beautiful syntax highlighting and formatting for JSON responses'
    },
    {
      icon: Database,
      title: 'Save Collections',
      description: 'Organize and save your API requests for future use'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">API Inspector</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAuth('signin')}
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => setShowAuth('signup')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {showAuth === 'signin' ? 'Welcome Back' : 'Get Started'}
                </h2>
                <button
                  onClick={() => setShowAuth(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {showAuth === 'signin' ? (
                <SignIn 
                  redirectUrl="/dashboard"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-none",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                      formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                      footerActionLink: "text-blue-600 hover:text-blue-700"
                    }
                  }}
                  routing="hash"
                  signUpUrl="#"
                />
              ) : (
                <SignUp 
                  redirectUrl="/dashboard"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-none",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                      formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                      footerActionLink: "text-blue-600 hover:text-blue-700"
                    }
                  }}
                  routing="hash"
                  signInUrl="#"
                />
              )}
              
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAuth(showAuth === 'signin' ? 'signup' : 'signin')}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {showAuth === 'signin' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Activity className="w-20 h-20 text-blue-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Test APIs Like a
              <span className="text-blue-600 block">Professional</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A powerful, intuitive API testing tool that helps developers test, debug, and document their APIs with ease. 
              Built for modern development workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button 
              onClick={() => setShowAuth('signup')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center space-x-3 text-lg font-semibold shadow-lg"
            >
              <span>Start Testing APIs</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowAuth('signin')}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center space-x-3 text-lg font-semibold"
            >
              <span>Sign In</span>
            </button>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-600">API Inspector</span>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-medium">GET</span>
                      <span className="text-gray-600 text-sm">https://api.example.com/users</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Headers: Authorization, Content-Type</div>
                      <div>Status: 200 OK • 245ms</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Response</div>
                    <div className="bg-gray-50 rounded p-3 text-xs font-mono text-gray-700">
                      {`{
  "users": [
    { "id": 1, "name": "John" },
    { "id": 2, "name": "Jane" }
  ]
}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for API Testing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade features that make API testing fast, reliable, and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors">
                <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Supercharge Your API Testing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of developers who trust API Inspector for their daily API testing needs
          </p>
          <button 
            onClick={() => setShowAuth('signup')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 flex items-center space-x-3 text-lg font-semibold mx-auto shadow-lg"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Activity className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">API Inspector</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2025 API Inspector. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;