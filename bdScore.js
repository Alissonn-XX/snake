import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore,doc, getDocs,collection, addDoc, onSnapshot,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBr_Zk3oPChVrUEEMZ6TSqFCxahLEIvjNQ",
  authDomain: "conhecendo-firebase-54fef.firebaseapp.com",
  projectId: "conhecendo-firebase-54fef",
  storageBucket: "conhecendo-firebase-54fef.appspot.com",
  messagingSenderId: "277838327132",
  appId: "1:277838327132:web:3350e0b3b8bdbba951e599",
  measurementId: "G-S1V4GF6MD1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const consultBD = collection(db, "play")


const querySnapshot = await getDocs(consultBD);
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});


export {querySnapshot}