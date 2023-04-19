// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { ref, getDatabase } from "firebase/database";
import { useDatabaseValue } from "@react-query-firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCA46OZQvdc6Q5Y4jcVfuXaXBiDa64-7nw",
  authDomain: "react-tutorial-0.firebaseapp.com",
  databaseURL: "https://react-tutorial-0-default-rtdb.firebaseio.com",
  projectId: "react-tutorial-0",
  storageBucket: "react-tutorial-0.appspot.com",
  messagingSenderId: "663156555933",
  appId: "1:663156555933:web:f8f38d9b3187311e27d474",
  measurementId: "G-PMH33C94C1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log(database);
export const useData = (path, transform) => {
  const { data, isLoading, error } = useDatabaseValue(
    path,
    ref(database, path),
    { subscribe: true }
  );
  const value = !isLoading && !error && transform ? transform(data) : data;

  return [value, isLoading, error];
};
