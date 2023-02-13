import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { authService } from "fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=> {
      console.log(user)
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      {init ? < AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
      <footer>&copy; Mwitter {new Date().getFullYear()}</footer>
    </>
    );
}

export default App;