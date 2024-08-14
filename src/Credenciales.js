/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAPUaqSExSPB14Jsr6XwYYclGNHD2zY0w",
  authDomain: "airtable-register.firebaseapp.com",
  projectId: "airtable-register",
  storageBucket: "airtable-register.appspot.com",
  messagingSenderId: "847042359978",
  appId: "1:847042359978:web:bb5c747ebc7d3d2b9316d3"
};

// Initialize Firebase
const AppFireBase = initializeApp(firebaseConfig);
console.log('test credenciales')
export default AppFireBase
*/

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://fjnixsewltbmvzekxpoh.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const Supabase = createClient(supabaseUrl, supabaseKey);

export default Supabase;
