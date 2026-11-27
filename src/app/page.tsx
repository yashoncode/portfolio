import Divider from "@/components/Divider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NowPanel from "@/components/NowPanel";
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
import { profile } from "@/data/resume";
import { getRepositoryStats } from "@/lib/github";

const portfolioUrl = "https://yashwynth.vercel.app/";
const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: portfolioUrl,
  mainEntity: {
    "@type": "Person",
    "@id": `${portfolioUrl}#person`,
    name: profile.fullName,
    alternateName: profile.name,
    sameAs: [profile.links.linkedin, profile.links.github],
  },
};

export default async function Home() {
  const repositories = await getRepositoryStats();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
        }}
      />
      <WarpArrival />
      <Navbar />
      <main>
        <Hero nowPanel={<NowPanel />} totalStars={repositories?.totalStars ?? null}>
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
