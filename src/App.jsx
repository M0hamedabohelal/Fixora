import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

// Homeowner Pages
import HomeownerDashboard from './pages/homeowner/HomeownerDashboard';
import CreateRequest from './pages/homeowner/CreateRequest';
import Orders from './pages/homeowner/Orders/Orders';
import OrderDetails from './pages/homeowner/OrderDetails/OrderDetails';
import Notifications from './pages/homeowner/Notifications/Notifications';
import Chat from './pages/homeowner/Chat/Chat';

// Homeowner Pages
import HomeownerProfile from './pages/homeowner/Profile/Profile';
import Addresses from './pages/homeowner/Addresses/Addresses';
import Payments from './pages/homeowner/Payments/Payments';
import Settings from './pages/homeowner/Settings/Settings';
import Support from './pages/homeowner/Support/Support';
import Checkout from './pages/homeowner/Checkout/Checkout';
import ProProfileView from './pages/homeowner/ProProfileView/ProProfileView';

// Professional Pages
import ProfessionalDashboard from './pages/professional/ProfessionalDashboard';
import ProfessionalProfile from './pages/professional/Profile/Profile';
import ProfessionalNotifications from './pages/professional/Notifications/Notifications';
import Portfolio from './pages/professional/Portfolio/Portfolio';
import Wallet from './pages/professional/Wallet/Wallet';
import ProSettings from './pages/professional/Settings/ProSettings';
import Verification from './pages/professional/Verification/Verification';
import RequestDetails from './pages/professional/RequestDetails/RequestDetails';
import ProfessionalChat from './pages/professional/Chat/ProfessionalChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<HomeownerDashboard />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/homeowner/orders" element={<Orders />} />
        <Route path="/homeowner/orders/:id" element={<OrderDetails />} />
        <Route path="/homeowner/notifications" element={<Notifications />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pro-profile/:id" element={<ProProfileView />} />
        
        <Route path="/profile" element={<HomeownerProfile />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />

        <Route path="/pro-dashboard" element={<ProfessionalDashboard />} />
        <Route path="/pro-profile" element={<ProfessionalProfile />} />
        <Route path="/pro-notifications" element={<ProfessionalNotifications />} />
        <Route path="/pro-portfolio" element={<Portfolio />} />
        <Route path="/pro-wallet" element={<Wallet />} />
        <Route path="/pro-settings" element={<ProSettings />} />
        <Route path="/pro-chat" element={<ProfessionalChat />} />
        <Route path="/pro-verification" element={<Verification />} />
        <Route path="/pro-request/:id" element={<RequestDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
