
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-glidr-purple hover:underline mb-8 inline-block">
            ← Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including when you create an account, use our services, or communicate with us.</p>
            
            <h2>2. Social Media Integration</h2>
            <p>When you connect social media accounts to our service, we collect information from those platforms as authorized by you and in accordance with their privacy policies.</p>
            
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Develop new products and services</li>
            </ul>
            
            <h2>4. Data Retention</h2>
            <p>We retain your information as long as your account is active or as needed to provide you services. You can request deletion of your data at any time.</p>
            
            <h2>5. Data Deletion</h2>
            <p>You may request deletion of your personal data at any time by contacting us at privacy@glidrclick.com. For data connected to third-party services like Facebook, you may also disconnect these services from your account settings.</p>
            
            <h2>6. Facebook Data</h2>
            <p>For Facebook users: You can request deletion of your Facebook data that we've collected by visiting your account settings. You may also contact Facebook directly to request deletion of data that Facebook has shared with us.</p>
            <p>Our Facebook Data Deletion URL is: <a href="https://glidrclick.lovable.app/facebook-data-deletion" className="text-blue-600 hover:underline">https://glidrclick.lovable.app/facebook-data-deletion</a></p>
            
            <h2>7. Security</h2>
            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
            
            <h2>8. International Transfers</h2>
            <p>Your information may be transferred to, and maintained on, computers located outside your state, province, country, or governmental jurisdiction where data protection laws may differ.</p>
            
            <h2>9. Changes to this Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            
            <h2>10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@glidrclick.com.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
