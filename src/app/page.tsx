import Divider from "@/components/Divider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Recognition from "@/components/Recognition";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { WarpArrival } from "@/components/Warp";

export default function Home() {
  return (
    <>
      <WarpArrival />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
