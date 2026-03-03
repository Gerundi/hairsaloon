import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Advantages from "@/components/Advantages";
import BeforeAfter from "@/components/BeforeAfter";
import Calculator from "@/components/Calculator";
import Steps from "@/components/Steps";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Advantages />
      <BeforeAfter />
      <Calculator />
      <Steps />
      <Team />
      <Reviews />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
