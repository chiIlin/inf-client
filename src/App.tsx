import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import RegisterInfluencer from "./pages/RegisterInfluencer";
import RegisterBrand from "./pages/RegisterBrand";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import ScrollToTop from "@/components/ScrollToTop";
import About from "./pages/About";
import InfluencerProfile from "@/pages/InfluencerProfile";
import BrandProfile from "@/pages/BrandProfile";
import Messages from "./pages/Messages";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";
import axios from "axios";

// ДОДАЄМО компонент для захисту адмін маршруту
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-600">
            Доступ заборонено
          </h1>
          <p className="text-xl text-gray-600">
            Ця сторінка доступна тільки адміністраторам системи.
          </p>
        </div>
      </section>
    );
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token && role) {
        try {
          // ОНОВЛЮЄМО: додаємо підтримку admin ролі
          let endpoint = "";
          if (role === "admin") {
            endpoint = "http://localhost:5112/api/admin/stats"; // Простий endpoint для перевірки токена адміна
          } else if (role === "company") {
            endpoint = "http://localhost:5112/api/profile/company";
          } else {
            endpoint = "http://localhost:5112/api/profile/influencer";
          }

          await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("Token is valid for role:", role);
        } catch (error) {
          // Якщо токен недійсний, очищаємо localStorage
          console.log("Token validation failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.dispatchEvent(new Event("authStateChanged"));
        }
      }
    };

    validateToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/register-influencer" element={<RegisterInfluencer />} />
            <Route path="/register-brand" element={<RegisterBrand />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />

            <Route path="/influencer-profile" element={<InfluencerProfile />} />
            <Route path="/brand-profile" element={<BrandProfile />} />
            <Route path="/messages/:userId" element={<Messages />} />

            {/* ОНОВЛЮЄМО: захищаємо адмін маршрут */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
