// Run once: npx tsx lib/seed-tools.ts
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

const tools = [
  { id: "t01", order: 0,  name: "VS Code",        category: "CODE EDITOR",     icon: "ti-brand-vscode",   color: "#60a5fa" },
  { id: "t02", order: 1,  name: "Android Studio", category: "MOBILE IDE",      icon: "ti-brand-android",  color: "#4ade80" },
  { id: "t03", order: 2,  name: "Fusion 360",     category: "3D DESIGN",       icon: "ti-box-model-2",    color: "#f97316" },
  { id: "t04", order: 3,  name: "EasyEDA",        category: "PCB DESIGN",      icon: "ti-cpu-2",          color: "#22d3ee" },
  { id: "t05", order: 4,  name: "Canva",          category: "DESIGN",          icon: "ti-palette",        color: "#a78bfa" },
  { id: "t06", order: 5,  name: "Arduino IDE",    category: "FIRMWARE",        icon: "ti-microchip",      color: "#2dd4bf" },
  { id: "t07", order: 6,  name: "Flutter",        category: "MOBILE DEV",      icon: "ti-brand-flutter",  color: "#38bdf8" },
  { id: "t08", order: 7,  name: "GitHub",         category: "VERSION CONTROL", icon: "ti-brand-github",   color: "#f1f5f9" },
  { id: "t09", order: 8,  name: "Figma",          category: "UI/UX DESIGN",    icon: "ti-brand-figma",    color: "#f472b6" },
  { id: "t10", order: 9,  name: "Firebase",       category: "BACKEND SERVICE", icon: "ti-database",       color: "#fbbf24" },
  { id: "t11", order: 10, name: "Next.js",        category: "WEB FRAMEWORK",   icon: "ti-brand-nextjs",   color: "#f1f5f9" },
  { id: "t12", order: 11, name: "Postman",        category: "API TESTING",     icon: "ti-send-2",         color: "#fb923c" },
];

async function seed() {
  for (const { id, ...data } of tools) {
    await setDoc(doc(collection(db, "tools"), id), data);
    console.log(`✓ ${data.name}`);
  }
  console.log("\n✅ Tools seeded!");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
