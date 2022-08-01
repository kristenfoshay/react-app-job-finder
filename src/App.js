import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-nav/NavBar";
import Routes from "./routes-nav/Routes";
import jwt from "jsonwebtoken";
import JoblyApi from "./api/api";
import useLocalStorage from "./useLocalStorage";
import UserContext from "./UserContext";
import LoadingSpinner from "./common/LoadingSpinner";

//import UserContext from "./UserContext";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  //const [applicationIds, setApplicationIds] = useState(new Set([]));
  //const [isLoading, setIsLoading] = useState(true);
  //const [companies, setCompanies] = useState([]);
  //const [jobs, setJobs] = useState([]);
  //const [user, setUser] = useLocalStorage("user", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [currentUser, setCurrentUser] = useState(null);
  // const [applied, setApplied] = useState([]);

  // useEffect(() => {
  //   async function getCompaniesAndJobs() {
     
  //     let companies = await JoblyApi.getCompanies();
  //     let jobs = await JoblyApi.getJobs();

  //     setCompanies(companies);
  //     setJobs(jobs);
  //     //setIsLoading(false);
  //   }
  //   getCompaniesAndJobs();
  // }, []);

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          //setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }
  


  //not clearing out local storage here with either method
  function logout(){
    
    console.log("logging out")
    setToken(null);
    setCurrentUser(null);
    
  }

  // async function updateUser(name, data) {
  //   //setIsLoading(true);
  //   let user = await JoblyApi.updateUser(name, data);
  //   setUser(user);
  //   //setIsLoading(false);
  // }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
      value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
);
}

export default App;
