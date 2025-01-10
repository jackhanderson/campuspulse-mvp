import React, { useState } from 'react';
import api from '../api';
import toastr from 'toastr';

const TermsOfServiceContent = () => (
  <div className="prose prose-sm max-w-none">
    <h1>CampusPulse Terms of Service</h1>
    <p className="text-gray-600">Last Updated: January 8, 2025</p>

    <section className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
      <p className="mt-2 text-gray-700">
        CampusPulse delivers actionable insights and analysis on career trends, 
        aspirations, and sentiments by leveraging data from AI-powered student 
        interviews ("Services"). By using our Services, you agree
        to abide by these Terms and our Privacy Policy. If you do not agree with
        these Terms, please refrain from using our Services.
      </p>
    </section>

    <section className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900">2. What We Collect</h2>
      <ul className="list-disc pl-5 mt-2 text-gray-700">
        <li>Personal Information: Name, email address</li>
        <li>Survey Responses: Career preferences, experiences, and insights</li>
        <li>Technical Data: IP address, browser type, device information</li>
        <li>Usage Data: How you interact with our platform</li>
      </ul>
    </section>

    <section className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900">3. Data Security</h2>
      <p className="mt-2 text-gray-700">
        We implement industry-standard security measures to protect your data, including:
      </p>
      <ul className="list-disc pl-5 mt-2 text-gray-700">
        <li>Encryption of data in transit and at rest</li>
        <li>Secure cloud storage with limited access controls</li>
        <li>Regular security audits and updates</li>
      </ul>
    </section>

    <section className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900">4. Your Rights</h2>
      <p className="mt-2 text-gray-700">You have the right to:</p>
      <ul className="list-disc pl-5 mt-2 text-gray-700">
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Withdraw consent at any time</li>
        <li>Request data portability</li>
        <li>Opt-out of data sales (for California residents)</li>
      </ul>
    </section>

    <section className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900">5. Contact Us</h2>
      <p className="mt-2 text-gray-700">
        For questions about these Terms or your privacy rights:
        <br />Email: jack.anderson@yale.edu
        <br />Phone: ***
        <br />Address: ***
      </p>
    </section>
  </div>
);

const TermsOfServiceModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-lg">
          <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto">
          <TermsOfServiceContent />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-lg">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAccept();
                onClose();
              }}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
              I Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Login({startSurvey}) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    acceptedTerms: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      alert('Please accept the Terms of Service to continue');
      return;
    }
    
    // Handle form submission

    try{
      const uuid = await api.createChat(formData.name, formData.email);
    
      startSurvey(uuid);
    }catch(err){
      alert("We apologize, the server is down. Please try again later.")
    }
    
    
    //console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="space-y-6">
          {/* Header */}
          {/* <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">CampusPulse</h1>
            <div className="h-1 w-40 bg-blue-600  rounded-full"></div>
            <h2 className="text-2xl text-gray-900">Career Insights Interview</h2>
          </div> */}

          {/* Header v2 */}


          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 inline-block pb-1 border-b-4 border-blue-600">
              CampusPulse
            </h1>
            <h2 className="text-2xl text-gray-900">Career Insights Interview</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Eli"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="eli.whitney@yale.edu"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptedTerms"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="acceptedTerms" 
                className="text-sm text-gray-700"
              >
                I have read the{' '}
                <span 
                  onClick={() => setIsTermsOpen(true)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Terms of Service
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
              Begin
            </button>
          </form>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <TermsOfServiceModal 
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAccept={() => {
          setFormData(prev => ({ ...prev, acceptedTerms: true }));
        }}
      />
    </div>
  );
};

export default Login;