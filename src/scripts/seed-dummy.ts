
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { config } from "dotenv";

config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if config is loaded
if (!firebaseConfig.apiKey) {
  console.error("Error: Firebase config not found in .env.local");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { getAuth, signInAnonymously } from "firebase/auth";
const auth = getAuth(app);

async function seed() {
  try {
    await signInAnonymously(auth);
    console.log("Signed in anonymously");
  } catch (e) {
    console.warn("Anonymous sign in failed, proceeding anyway...", e);
  }

  const email = "athlete.dummy@kulturjuara.org";

  // Check if athlete with email exists
  const q = query(collection(db, "athletes"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    console.log("Dummy athlete already exists.");
  } else {
    // Determine a new ID (random or specific)
    const newId = "ATLET-DUMMY-" + Math.floor(Math.random() * 1000);
    await setDoc(doc(db, "athletes", newId), {
      fullName: "Atlet Uji Coba",
      email: email,
      role: "ATHLETE",
      status_aktif: "AKTIF",
      level: "Intermediate",
      category: "Dewasa",
      phone: "081234567890",
      jerseySize: "L",
      dob: "2000-01-01",
      createdAt: new Date().toISOString(),
      avatar: "/avatars/03.png",
      skillScore: 85,
      coachNotes: "Atlet ini memiliki potensi besar namun perlu meningkatkan konsistensi.",
      coachName: "Coach Budi"
    });
    console.log(`Dummy athlete created with ID: ${newId}`);
  }
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
