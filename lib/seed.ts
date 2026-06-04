// Run once: npx tsx lib/seed.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const app = initializeApp({
  apiKey:            "AIzaSyDnDgReDHjY9DqHpCME9jaaWtcS0p6imOg",
  authDomain:        "portfolio-a09af.firebaseapp.com",
  projectId:         "portfolio-a09af",
  storageBucket:     "portfolio-a09af.firebasestorage.app",
  messagingSenderId: "17279205539",
  appId:             "1:17279205539:web:346c44e81f4242613eff16",
});
const db = getFirestore(app);

async function seed() {
  const skills = [
    "IT Support","Networking","Hardware","Troubleshooting",
    "Windows Server","Active Directory","TypeScript","Next.js","React",
    "Flutter","Dart","Mobile Development","Computer Installation",
    "Network Troubleshooting","Hardware Diagnosing",
    "Relationship Development","[Basic] English","[Native] Indonesian",
  ];
  for (let i = 0; i < skills.length; i++) {
    await setDoc(doc(collection(db, "skills"), String(i)), { name: skills[i], order: i });
    console.log(`skill: ${skills[i]}`);
  }

  const experiences = [
    { id: "exp1", order: 0, title: "IT Support Infrastructure & IT Implementor Intern", company: "PT Triputra Agro Persada Tbk", period: "Feb 2025 – Feb 2026", desc: "Delivered end-user technical support by diagnosing and resolving hardware, software, and network-related issues. Assisted in managing enterprise IT infrastructure and implemented security measures including MFA.", tags: ["IT Support","Networking","MFA","Hardware","Documentation"] },
    { id: "exp2", order: 1, title: "Support Internship", company: "PT Mitra Adhitama Mandiri", period: "Apr 2021 – Jun 2021", desc: "Maintained employee computers to ensure optimal performance. Created export-import logistics documents.", tags: ["IT Support","Hardware","Logistics"] },
    { id: "exp3", order: 2, title: "Operator", company: "Fandani Net.", period: "Mar 2015 – Mar 2016", desc: "Managed daily operations of an internet cafe using billing and system monitoring tools. Performed hardware and software troubleshooting.", tags: ["Operations","Hardware","Troubleshooting"] },
  ];
  for (const { id, ...data } of experiences) {
    await setDoc(doc(collection(db, "experiences"), id), data);
    console.log(`experience: ${data.title}`);
  }

  const projects = [
    { id: "proj1", order: 0, num: "01", title: "Smart PillBox with IoT Integration", desc: "Bachelor's Thesis — IoT medication adherence system with mobile control", tags: ["IoT","Flutter","Firebase","Arduino","ESP32"], year: "2025", role: "Researcher & Developer", overview: "This project was developed as part of my Bachelor's Thesis in Computer Engineering. The research focuses on designing and implementing an IoT-based Smart PillBox integrated with a mobile application to help users manage their medication schedules more effectively.", features: ["Custom PCB design with EasyEDA — two dedicated boards for device control and monitoring","3D enclosure modeled in Autodesk Fusion 360 and fabricated via 3D printing","Arduino firmware with offline schedule storage and compartment rotation control","Firebase integration for real-time synchronization between hardware and mobile app","Flutter & Dart mobile app for remote schedule management and device control"], link: "github.com/Qihhmaulana" },
    { id: "proj2", order: 1, num: "02", title: "IT Support Dashboard", desc: "Internal ticket management for IT team", tags: ["React","TypeScript"], year: "2024", role: "Frontend Developer", overview: "A web-based dashboard to manage and track IT support tickets internally.", features: ["Create, assign, and track support tickets","Priority and status labeling system","Dashboard with real-time ticket statistics","Search and filter tickets by category"], link: "github.com/maulanafaqih/it-dashboard" },
    { id: "proj3", order: 2, num: "03", title: "Network Monitor", desc: "Real-time device status tracker across infrastructure", tags: ["Python","Networking"], year: "2024", role: "Developer", overview: "A simple network monitoring tool that checks the status of devices across the company infrastructure in real time.", features: ["Real-time ping monitoring of network devices","Alerts when a device goes offline","Clean status overview of all devices","Lightweight and easy to deploy"], link: "github.com/maulanafaqih/network-monitor" },
  ];
  for (const { id, ...data } of projects) {
    await setDoc(doc(collection(db, "projects"), id), data);
    console.log(`project: ${data.title}`);
  }

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
