import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../shared/styles/App.css";
import AppointmentPage from "../features/appointment/pages/AppointmentPage";
import HomeScreenPage from "../features/home/pages/HomeScreenPage";
import DashboardPage from "../features/dashboardScreens/pages/DashboardPage";
import LoginPage from "../features/auth/pages/LoginPage";
import OnboardingPage from "../features/onboarding/pages/OnboardingPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import OtpPage from "../features/otp/pages/OtpPage";
import EmotionQuestionarePage from "../features/MTracker/pages/EmotionQuestionarePage";
import CauseOfEmotionPage from "../features/MTracker/pages/CauseOfEmotionsPage";
import NotesForEmotionsPage from "../features/MTracker/pages/NotesForEmotionsPage";
import RecordAVoiceNotePage from "../features/MTracker/pages/RecordAVoiceNotePage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ChatPage from "../features/chat/pages/ChatPage";
import MessageDisplayPage from "../features/chat/components/AllMessages";
import KidTimelinePage from "../features/timeline/pages/KidTimelinePage";
import TimelineListPage from "../features/timeline/pages/TimelineListPage";
import SplashScreen from "../features/splashScreens/pages/SplashScreen";
import SplashScreen1 from "../features/splashScreens/pages/SplashScreen1";
import SplashScreen2 from "../features/splashScreens/pages/SplashScreen2";
import SplashScreen3 from "../features/splashScreens/pages/SplashScreen3";
import BottomNavBar from "../shared/components/BottomNavBar";
import AiDoctorPage from "../features/chat/components/AiDoctorPage";
import MTracker from "../features/MTracker/pages/MTracker"

const App = () => {
  return (
    <div className="bg-white min-h-screen ">
      <Router>
        <Routes>
          {/* Splash Screens */}
          <Route path="/" element={<SplashScreen />}></Route>
          <Route path="/splashscreen1" element={<SplashScreen1 />}></Route>
          <Route path="/splashscreen2" element={<SplashScreen2 />}></Route>
          <Route path="/splashscreen3" element={<SplashScreen3 />}></Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="password-reset" element={<ForgotPasswordPage />}></Route>

          <Route
            path="/symptom-tracker/questionare/1"
            element={<EmotionQuestionarePage />}
          />
          <Route
            path="/symptom-tracker/questionare/2"
            element={<CauseOfEmotionPage />}
          />
          <Route
            path="/symptom-tracker/questionare/3"
            element={<NotesForEmotionsPage />}
          />
          <Route
            path="/symptom-tracker/questionare/4"
            element={<RecordAVoiceNotePage />}
          />

          {/* Main Screens */}
          <Route element={<BottomNavBar />}>
            <Route path="/home" element={<HomeScreenPage />}></Route>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/mtracker" element={<MTracker />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/:id" element={<MessageDisplayPage />} />
            <Route path="/timeline" element={<TimelineListPage />} />
            <Route path="/timeline/:title" element={<KidTimelinePage />} />
          </Route>

          <Route path="/ai-doctor" element={<AiDoctorPage />}/>

          <Route
            path="*"
            element={<h1 style={{ textAlign: "center" }}>404 Not Found</h1>}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
