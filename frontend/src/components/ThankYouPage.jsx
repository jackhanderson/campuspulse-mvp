

function ThankYouPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-2xl mx-auto text-center space-y-8 bg-white rounded-lg shadow-lg p-8 w-full">
        {/* Logo/Brand Section */}
        <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 inline-block pb-1 border-b-4 border-blue-600">
          CampusPulse
          </h1>

        </div>

        {/* Main Content */}
        <div className="py-6">
          <h2 className="text-3xl font-semibold text-gray-900">Thank You!</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Your responses have been recorded. We appreciate your time and contribution to improving career services.
          </p>
        </div>

        {/* Decorative Element */}
        {/* <div className="relative w-full max-w-sm">
          <div className="absolute inset-0 bg-blue-100 transform rotate-2 rounded-lg"></div>
          <div className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-gray-700 font-medium">
              "Your insights help us create better career opportunities for students."
            </p>
          </div>
        </div> */}

        {/* Additional Info */}
        <div className="pt-8 text-sm text-gray-500">
          <p>You may now close this window.</p>
        </div>

        {/* Optional Home Button */}
        {/* <a 
          href="/"
          className="mt-6 inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Return to Home
        </a> */}
      </div>
    </div>
  );
};

export default ThankYouPage;