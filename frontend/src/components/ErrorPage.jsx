import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage () {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-2xl mx-auto text-center space-y-8 bg-white rounded-lg shadow-lg p-8 w-full">
        {/* Logo/Brand Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 inline-block pb-1 border-b-4 border-blue-600">
            CampusPulse
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-4 py-6">
          <h2 className="text-6xl font-bold text-gray-900">404</h2>
          <h3 className="text-2xl font-semibold text-gray-800">Page Not Found</h3>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Visual Element */}
        {/* <div className="relative w-full max-w-sm py-4">
          <div className="relative bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700">
              If you believe this is an error, please contact support at{' '}
              <span className="text-blue-600">support@campuspulse.com</span>
            </p>
          </div>
        </div> */}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
          >
            Return Home
          </button>
          {/* <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Go Back
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;