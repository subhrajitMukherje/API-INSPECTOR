import React from 'react';
import { useAuth, useUser, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" aria-hidden="true" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">API Inspector</h1>
          </div>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full animate-pulse" aria-label="Loading user profile" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" aria-hidden="true" />
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">API Inspector</h1>
          {isSignedIn && (
            <span className="text-xs sm:text-sm text-gray-500 ml-2 sm:ml-4 hidden md:inline" aria-label={`Welcome back, ${user?.firstName || 'User'}`}>
              Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {!isSignedIn ? (
            <>
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Go back to home page"
              >
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline truncate max-w-32" aria-label={`Signed in as ${user?.emailAddresses[0]?.emailAddress}`}>
                {user?.emailAddresses[0]?.emailAddress}
              </span>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-6 h-6 sm:w-8 sm:h-8",
                    userButtonPopoverCard: "shadow-lg border border-gray-200",
                    userButtonPopoverActionButton: "hover:bg-gray-50"
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;