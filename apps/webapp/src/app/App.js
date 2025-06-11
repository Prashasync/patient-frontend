import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../shared/styles/App.css";
import HomeScreenPage from "../features/home/pages/HomeScreenPage";
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
import SplashScreen from "../features/splashScreens/pages/SplashScreen";
import SplashScreen1 from "../features/splashScreens/pages/SplashScreen1";
import SplashScreen2 from "../features/splashScreens/pages/SplashScreen2";
import SplashScreen3 from "../features/splashScreens/pages/SplashScreen3";
import BottomNavBar from "../shared/components/BottomNavBar";
import MTracker from "../features/MTracker/pages/MTracker";
import ChatRoom from "../features/chat/pages/ChatRoom";
import ComingSoon from "../shared/components/ComingSoon";
import VerificationSuccessful from "../features/otp/components/VerificationSuccessful";
import AiDoctorPage from "../features/chat/pages/AiDoctorPage";
import { WebSocketProvider } from "../store/webSocketContext";
import StatsPage from "../features/dashboardScreens/pages/StatsPage";
import AccountDetailsPage from "../features/settings/pages/AccountDetailsPage";

const App = () => {
  return (
    <div className="bg-white min-h-screen ">
      <WebSocketProvider
        remoteServerUrl={process.env.REACT_APP_DOCTOR_URL}
        jwtToken={process.env.REACT_APP_DOCTOR_TOKEN}
      >
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
            <Route
              path="password-reset"
              element={<ForgotPasswordPage />}
            ></Route>

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
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/appointments" element={<ComingSoon />} />
              <Route path="/mtracker" element={<MTracker />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/timeline" element={<ComingSoon />} />
              {/* <Route path="/timeline/:title" element={<KidTimelinePage />} /> */}
            </Route>

            <Route path="/chat/:id" element={<ChatRoom />} />
            <Route path="/ai-doctor/:patientId" element={<AiDoctorPage />} />
            <Route
              path="/verification-successful"
              element={<VerificationSuccessful />}
            />
            <Route
              path="/account-details"
              element={<AccountDetailsPage />}
            />
            <Route
              path="*"
              element={<h1 style={{ textAlign: "center" }}>404 Not Found</h1>}
            />
            {/* <Route
            path="/schedule-appointment"
            element={<ScheduleAppointment />}
          /> */}
            {/* <Route
            path="/schedule-appointment/:doctor_id"
            element={<DoctorAvailability />}
          /> */}
          </Routes>
        </Router>
      </WebSocketProvider>
    </div>
  );
};

export default App;
