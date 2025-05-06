
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">Glidrclick</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
            <p className="text-gray-600 mb-4">
              This is your dashboard where you can manage your content and settings.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-md border">
                <h3 className="font-medium text-gray-900">AI Writing</h3>
                <p className="text-sm text-gray-500 mt-1">Create AI-generated content for your blog</p>
                <Button variant="link" className="text-glidr-purple p-0 mt-2" onClick={() => navigate("/features/ai-writing")}>
                  Get Started →
                </Button>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border">
                <h3 className="font-medium text-gray-900">Auto-Posting</h3>
                <p className="text-sm text-gray-500 mt-1">Schedule and automate your content posting</p>
                <Button variant="link" className="text-glidr-purple p-0 mt-2" onClick={() => navigate("/features/auto-posting")}>
                  Get Started →
                </Button>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border">
                <h3 className="font-medium text-gray-900">Social Sharing</h3>
                <p className="text-sm text-gray-500 mt-1">Share your content across social platforms</p>
                <Button variant="link" className="text-glidr-purple p-0 mt-2" onClick={() => navigate("/features/social-sharing")}>
                  Get Started →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
