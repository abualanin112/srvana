// src/App.jsx
import { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import { Spinner } from "@/components/ui/spinner";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/Signup"));
const FastServiceStep1 = lazy(() => import("./pages/FastServiceStep1"));
const FastServiceStep2 = lazy(() => import("./pages/FastServiceStep2"));
const FastServiceStep3 = lazy(() => import("./pages/FastServiceStep3"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const ServiceCompletionPage = lazy(() =>
  import("./pages/ServiceCompletionPage")
);
const TechnicianForm = lazy(() => import("@/components/layout/TechnicianForm"));
const TechnicianSkillsForm = lazy(() =>
  import("@/components/layout/TechnicianSkillsForm")
);

const ServiceRating = lazy(() => import("./pages/ServiceRating"));
const TechnicianIncomingRequest = lazy(() =>
  import("./pages/technician/TechnicianIncomingRequest")
);
const TechnicianRejectionReason = lazy(() =>
  import("./pages/technician/TechnicianRejectionReason")
);
const TechnicianTaskTracking = lazy(() =>
  import("./pages/technician/TechnicianTaskTracking")
);
const TechnicianPaymentConfirmation = lazy(() =>
  import("./pages/technician/TechnicianPaymentConfirmation")
);
const ProjectSubmissionPage = lazy(() =>
  import("./pages/ProjectSubmissionPage")
);
const ProjectReviewPage = lazy(() => import("./pages/ProjectReviewPage"));
const ProjectSummaryPage = lazy(() => import("./pages/ProjectSummaryPage"));
const ProjectOffersPage = lazy(() => import("./pages/ProjectOffersPage"));
const ProjectChatPage = lazy(() => import("./pages/ProjectChatPage"));
const ProjectProcessingPage = lazy(() =>
  import("./pages/ProjectProcessingPage")
);
const TechnicianPortfolio = lazy(() =>
  import("./pages/technician/TechnicianPortfolio")
);
const OpenProjectsPage = lazy(() =>
  import("./pages/technician/OpenProjectsPage")
);

export default function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Spinner className="size-10" />
          </div>
        }
      >
        <Routes>
          {/*MainLayout*/}
          <Route
            element={
              <MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/projects-services"
              element={<ProjectSubmissionPage />}
            />
            <Route path="/project/review" element={<ProjectReviewPage />} />
            <Route path="/project/summary" element={<ProjectSummaryPage />} />
            <Route path="/project/offers" element={<ProjectOffersPage />} />
            <Route path="/project/chat" element={<ProjectChatPage />} />
            <Route
              path="/project/processing"
              element={<ProjectProcessingPage />}
            />
            <Route path="/service/request" element={<FastServiceStep1 />} />
            <Route
              path="/service/select-technician"
              element={<FastServiceStep2 />}
            />
            <Route path="/service/payment" element={<FastServiceStep3 />} />
            <Route path="/service/tracking" element={<OrderTracking />} />
            <Route path="/order/tracking" element={<OrderTracking />} />
            <Route path="/service/rating" element={<ServiceRating />} />
            <Route
              path="/service/completion"
              element={<ServiceCompletionPage />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/technician/portfolio"
              element={<TechnicianPortfolio />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/technician/incoming-request"
              element={<TechnicianIncomingRequest />}
            />
            <Route
              path="/technician/reject-reason"
              element={<TechnicianRejectionReason />}
            />
            <Route
              path="/technician/task-tracking"
              element={<TechnicianTaskTracking />}
            />
            <Route
              path="/technician/payment-confirmation"
              element={<TechnicianPaymentConfirmation />}
            />
            <Route path="/projects/open" element={<OpenProjectsPage />} />
          </Route>

          {/* AuthLayout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/TechnicianForm" element={<TechnicianForm />} />
            <Route
              path="/TechnicianSkillsForm"
              element={<TechnicianSkillsForm />}
            />
            {/* reset-password */}
            <Route
              path="/technician/incoming-request"
              element={<TechnicianIncomingRequest />}
            />
            <Route
              path="/technician/reject-reason"
              element={<TechnicianRejectionReason />}
            />
            <Route
              path="/technician/task-tracking"
              element={<TechnicianTaskTracking />}
            />
            <Route
              path="/technician/payment-confirmation"
              element={<TechnicianPaymentConfirmation />}
            />
          </Route>

          {/*  404  */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
