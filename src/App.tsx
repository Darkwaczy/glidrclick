
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import Analytics from './pages/dashboard/Analytics';
import Create from './pages/dashboard/Create';
import Users from './pages/dashboard/Users';
import CalendarPage from './pages/dashboard/Calendar';
import Settings from './pages/dashboard/Settings';
import { AuthProvider } from './context/AuthContext';

// Create the client
const queryClient = new QueryClient();

// Cache bust: 2025-06-01-20:12:00
console.log('App.tsx loading - timestamp: 2025-06-01-20:12:00');

const App = () => {
  console.log('App component rendering');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="analytics" element={<Analytics />} />
                <Route path="create" element={<Create />} />
                <Route path="users" element={<Users />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="settings" element={<Settings />} />
                {/* Add more dashboard routes as needed */}
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
