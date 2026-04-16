import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import CaseStudySection from "@/components/CaseStudySection";
import StatsCounter from "@/components/StatsCounter";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ARCAN Studio — Modern Architecture & Design" },
      { name: "description", content: "Award-winning architecture studio creating timeless modern spaces. Residential, commercial, and interior design services." },
      { property: "og:title", content: "ARCAN Studio — Modern Architecture & Design" },
      { property: "og:description", content: "Award-winning architecture studio creating timeless modern spaces." },
    ],
  }),
});

function Index() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <CaseStudySection />
      <StatsCounter />
      <TeamSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
