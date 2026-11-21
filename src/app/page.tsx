import Divider from "@/components/Divider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GithubHeatmap from "@/components/GithubHeatmap";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Recognition from "@/components/Recognition";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { WarpArrival } from "@/components/Warp";
import { getRepositoryStats } from "@/lib/github";

export default async function Home() {
  const repositories = await getRepositoryStats();
  return (
    <>
      <WarpArrival />
      <Navbar />
      <main>
        <Hero totalStars={repositories?.totalStars ?? null}>
          <GithubHeatmap />
        </Hero>
        <Divider />
        <About />
        <Experience />
        <Projects repos={repositories?.counts ?? null} />
        <Skills />
        <Education />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
