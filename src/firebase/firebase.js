import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsYzy0U9w_4KKPeIVWhD-kvdYrxA4K6Jo",
  authDomain: "catalogo-ae4b0.firebaseapp.com",
  databaseURL: "https://catalogo-ae4b0-default-rtdb.firebaseio.com",
  projectId: "catalogo-ae4b0",
  storageBucket: "catalogo-ae4b0.appspot.com",
  messagingSenderId: "901259557020",
  appId: "1:901259557020:web:34701cb8b03f28c748d559",
  measurementId: "G-F6P03T687B",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://catalogo-ae4b0.appspot.com/");
const db = getFirestore(app);

export default storage;
