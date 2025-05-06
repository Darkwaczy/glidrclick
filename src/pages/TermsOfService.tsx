
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-glidr-purple hover:underline mb-8 inline-block">
            ← Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the Glidrclick service, you agree to be bound by these Terms of Service.</p>
            
            <h2>2. Description of Service</h2>
            <p>Glidrclick provides AI-powered content creation and social media automation tools designed to help users create, schedule, and publish content across various platforms.</p>
            
            <h2>3. User Accounts</h2>
            <p>To use certain features of the Service, you must register for an account. You agree to provide accurate information and to keep it updated.</p>
            
            <h2>4. User Conduct</h2>
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Distribute malware or other harmful code</li>
              <li>Attempt to gain unauthorized access to the Service</li>
            </ul>
            
            <h2>5. Content</h2>
            <p>You retain ownership of any content you create using the Service. However, you grant us a license to use, store, and display your content in connection with providing and improving the Service.</p>
            
            <h2>6. Third-Party Platforms</h2>
            <p>The Service integrates with third-party platforms like Facebook, Instagram, and WordPress. Your use of these integrations is subject to the terms and policies of those platforms.</p>
            
            <h2>7. Termination</h2>
            <p>We reserve the right to terminate or suspend access to the Service at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties, or for any other reason.</p>
            
            <h2>8. Changes to Terms</h2>
            <p>We may modify these Terms at any time. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>
            
            <h2>9. Disclaimer of Warranties</h2>
            <p>The Service is provided "as is" without warranties of any kind, either express or implied.</p>
            
            <h2>10. Limitation of Liability</h2>
            <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.</p>
            
            <h2>11. Contact Information</h2>
            <p>For questions about these Terms, please contact us at support@glidrclick.com.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
