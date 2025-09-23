import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Sp144 from "../pages/Sp144";
import SharePage from "../pages/SharePage";

// Importing new components
import Black from "../pages/Black";
import BlueGrey from "../pages/BlueGrey";
import GraphiteGrey from "../pages/GraphiteGrey";
import Pebble from "../pages/Pebble";
import SilverGrey from "../pages/SilverGrey";
import StoneGrey from "../pages/StoneGrey";
import White from "../pages/White";

import RegistrationForm from "../pages/RegistrationForm";
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import AccountPage from '../pages/AccountPage';    

import { AuthProvider } from '../context/AuthContext'; 
import ProtectedRoute from '../components/ProtectedRoute';
import GoogleCallback from '../GoogleCallback'; // Adjust the import path as necessary
const AppRoutes = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rendering-library"
        element={
          // <ProtectedRoute>
            <AccountPage />
          // </ProtectedRoute>
        }
      />
      <Route path="/google-callback" component={GoogleCallback} />
      <Route path="/sp-144" element={<Sp144 />} />
      <Route path="/share" element={<SharePage />} />
      <Route path="/black" element={<Black />} />
      <Route path="/blue-grey" element={<BlueGrey />} />
      <Route path="/graphite-grey" element={<GraphiteGrey />} />
      <Route path="/pebble" element={<Pebble />} />
      <Route path="/silver-grey" element={<SilverGrey />} />
      <Route path="/stone-grey" element={<StoneGrey />} />
      <Route path="/white" element={<White />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
