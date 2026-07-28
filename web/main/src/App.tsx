import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import Status from "./pages/Status/Status";
import Alerts from "./pages/Alerts/Alerts";
import Messages from "./pages/Messages/Messages";
import Emergency from "./pages/Emergency/Emergency";
import Welcome from "./pages/Welcome/Welcome";
import EmergencyPage from "./pages/EmergencyPage/EmergencyPage";
import Onboarding from "./pages/Onboarding/Onboarding";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Onboarding
        " replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/status" element={<Status />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/emergency-page" element={<EmergencyPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;