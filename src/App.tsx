import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider } from "./context/LangContext";
import "./i18n/config";
import "./styles/globals.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ScrollReveal from "./components/ScrollReveal";
import ScrollProgress from "./components/ScrollProgress";
import ViewTransitions from "./components/ViewTransitions";
import CursorGlow from "./components/CursorGlow";
import Interactions from "./components/Interactions";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import AnalyticsTracker from "./components/AnalyticsTracker";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Photography from "./pages/Photography/Photography";
import WebDesign from "./pages/WebDesign/WebDesign";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound";
import UtmRedirect from "./pages/UtmRedirect/UtmRedirect";

function ProjectRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/projekty/${slug}`} replace />;
}

function PrivacyRedirect() {
  useEffect(() => { window.location.replace('/privacy.html'); }, []);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LangProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AnalyticsTracker />
            <ScrollReveal />
            <ScrollProgress />
            <ViewTransitions />
            <Navbar />
            <Routes>
              <Route path="/ig" element={<UtmRedirect source="ig" />} />
              <Route path="/" element={<Home />} />
              <Route path="/o-mne" element={<About />} />
              <Route path="/projekty" element={<Projects />} />
              <Route path="/projekty/:slug" element={<ProjectDetail />} />
              <Route path="/fotografie" element={<Photography />} />
              <Route path="/weby" element={<WebDesign />} />
              <Route path="/kontakt" element={<Contact />} />
              {/* Legacy URL redirects — old English paths and leftover URLs Google crawled */}
              <Route path="/project/:slug" element={<ProjectRedirect />} />
              <Route path="/privacy" element={<PrivacyRedirect />} />
              <Route path="/index" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <CookieBanner />
            <CursorGlow />
            <Interactions />
          </BrowserRouter>
        </LangProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
