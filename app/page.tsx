"use client";

import { useState, useEffect } from "react";
import { collection, getDocsFromServer, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Navbar          from "@/components/Navbar";
import HeroSection     from "@/components/HeroSection";
import MetaStrip       from "@/components/MetaStrip";
import SkillsSection   from "@/components/SkillsSection";
import ToolsSection    from "@/components/ToolsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection  from "@/components/ContactSection";
import StatusBar       from "@/components/StatusBar";

type Project = {
  num: string; title: string; desc: string; tags: string[];
  year: string; role: string; overview: string; features: string[]; link?: string;
};
type Experience = { title: string; company: string; period: string; desc: string; tags: string[] };
type Tool       = { name: string; category: string; icon: string; color: string; order: number };

export default function Home() {
  const [skills, setSkills]           = useState<string[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects]       = useState<Project[]>([]);
  const [tools, setTools]             = useState<Tool[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sSnap, eSnap, pSnap, tSnap] = await Promise.all([
          getDocsFromServer(query(collection(db, "skills"),      orderBy("order"))),
          getDocsFromServer(query(collection(db, "experiences"), orderBy("order"))),
          getDocsFromServer(query(collection(db, "projects"),    orderBy("order"))),
          getDocsFromServer(query(collection(db, "tools"),       orderBy("order"))),
        ]);
        console.log("skills:", sSnap.size, "exp:", eSnap.size, "projects:", pSnap.size, "tools:", tSnap.size);
        setSkills(sSnap.docs.map(d => (d.data() as { name: string }).name));
        setExperiences(eSnap.docs.map(d => d.data() as Experience));
        setProjects(pSnap.docs.map(d => d.data() as Project));
        setTools(tSnap.docs.map(d => d.data() as Tool));
      } catch (err) {
        console.error("Firestore fetch failed:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="grid-bg" />
      <div className="grid-fade" />
      <div className="shine-orb shine-1" />
      <div className="shine-orb shine-2" />
      <div className="shine-3" />
      <div className="shine-4" />

      <div style={{ background: "linear-gradient(160deg,#05050f 0%,#080818 50%,#05050f 100%)", minHeight: "100vh", position: "relative" }}>
        <Navbar />
        <HeroSection />
        <MetaStrip />

        <div style={{ height: "1.5rem" }} />
        <div className="divider" />

        <SkillsSection skills={skills} />
        <div className="divider" />

        <ToolsSection tools={tools} />
        <div className="divider" />

        <ExperienceSection experiences={experiences} />
        <div className="divider" />

        <ProjectsSection projects={projects} />
        <div className="divider" />

        <ContactSection />

        <StatusBar />
      </div>
    </>
  );
}
