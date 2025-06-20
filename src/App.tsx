
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import { Toaster } from './components/ui/toaster';
import SocialSharing from './pages/features/SocialSharing';
import AIWriting from './pages/features/AIWriting';
import AutoPosting from './pages/features/AutoPosting';
import PaymentSuccess from './pages/PaymentSuccess';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/features/ai-writing" element={<AIWriting />} />
          <Route path="/features/auto-posting" element={<AutoPosting />} />
          <Route path="/features/social-sharing" element={<SocialSharing />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin-dashboard/*" element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
