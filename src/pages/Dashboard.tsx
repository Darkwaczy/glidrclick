
import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import ContentPage from '@/components/dashboard/pages/ContentPage';
import SocialPage from '@/components/dashboard/pages/SocialPage';
import AnalyticsPage from '@/components/dashboard/pages/AnalyticsPage';
import SettingsPage from '@/components/dashboard/pages/SettingsPage';
import ProfilePage from '@/components/dashboard/pages/ProfilePage';
import SchedulePage from '@/components/dashboard/pages/SchedulePage';
import NewPostPage from '@/components/dashboard/pages/NewPostPage';
import EditPostPage from '@/components/dashboard/pages/EditPostPage';
import BillingPage from '@/components/dashboard/pages/BillingPage';
import { useAuthContext } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuthContext();
  const location = useLocation();
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  
  // Extract the active page from the current path
  const getActivePage = () => {
    const path = location.pathname.split('/').pop() || '';
    return path === 'dashboard' ? 'dashboard' : path;
  };
  
  return (
    <div className="min-h-screen flex relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-electric/8 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-pink/8 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-neon-lime/8 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '-6s' }}></div>
      </div>
      
      <DashboardSidebar activePage={getActivePage()} />
      <div className="flex-1 flex flex-col relative z-10">
        <DashboardHeader onWatchDemo={() => {}} />
        <main className="flex-1 p-6 bg-transparent">
          <Routes>
            <Route index element={<Navigate to="content" replace />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="social" element={<SocialPage />} />
            <Route path="new-post" element={<NewPostPage />} />
            <Route path="edit-post" element={<EditPostPage postId={editingPostId} />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="*" element={<Navigate to="content" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
