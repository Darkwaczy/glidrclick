
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIWriting from "./pages/features/AIWriting";
import AutoPosting from "./pages/features/AutoPosting";
import SocialSharing from "./pages/features/SocialSharing";
import SocialPage from "./pages/dashboard/Social";
import { SocialProvider } from "./contexts/SocialContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";

// Create a dashboard placeholder component for routes that aren't implemented yet
const DashboardPlaceholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center p-8 rounded-lg bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">{title} Dashboard</h1>
      <p className="text-gray-600 mb-4">This dashboard section is coming soon!</p>
      <a href="/dashboard/social" className="text-glidr-purple hover:underline">
        Go to Social Dashboard
      </a>
    </div>
  </div>
);

// Create auth placeholder pages
const AuthPlaceholder = ({ type }: { type: 'login' | 'register' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold gradient-text">Glidrclick</h1>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {type === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>
      <div className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autoComplete="email" required 
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-glidr-purple focus:border-glidr-purple focus:z-10 sm:text-sm" 
              placeholder="Email address" />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required 
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-glidr-purple focus:border-glidr-purple focus:z-10 sm:text-sm" 
              placeholder="Password" />
          </div>
        </div>

        <div>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white gradient-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-glidr-purple">
            {type === 'login' ? 'Sign in' : 'Sign up'}
          </button>
        </div>
        
        <div className="text-center text-sm">
          {type === 'login' ? (
            <p>Don't have an account? <a href="/register" className="font-medium text-glidr-purple hover:text-glidr-purple/80">Sign up</a></p>
          ) : (
            <p>Already have an account? <a href="/login" className="font-medium text-glidr-purple hover:text-glidr-purple/80">Sign in</a></p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/features/ai-writing" element={<AIWriting />} />
          <Route path="/features/auto-posting" element={<AutoPosting />} />
          <Route path="/features/social-sharing" element={<SocialSharing />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<AuthPlaceholder type="login" />} />
          <Route path="/register" element={<AuthPlaceholder type="register" />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={
            <DashboardLayout>
              <DashboardPlaceholder title="Main" />
            </DashboardLayout>
          } />
          <Route path="/dashboard/content" element={
            <DashboardLayout>
              <DashboardPlaceholder title="Content" />
            </DashboardLayout>
          } />
          <Route path="/dashboard/social" element={
            <DashboardLayout>
              <SocialProvider>
                <SocialPage />
              </SocialProvider>
            </DashboardLayout>
          } />
          <Route path="/dashboard/calendar" element={
            <DashboardLayout>
              <DashboardPlaceholder title="Calendar" />
            </DashboardLayout>
          } />
          <Route path="/dashboard/analytics" element={
            <DashboardLayout>
              <DashboardPlaceholder title="Analytics" />
            </DashboardLayout>
          } />
          <Route path="/dashboard/settings" element={
            <DashboardLayout>
              <DashboardPlaceholder title="Settings" />
            </DashboardLayout>
          } />
          <Route path="/dashboard/social/callback" element={<NotFound />} />
          
          {/* Not found and redirect */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
