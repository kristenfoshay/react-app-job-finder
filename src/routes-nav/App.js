import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-nav/NavBar";
import Routes from "./routes-nav/Routes";
import jwt from "jsonwebtoken";
import JoblyApi from "./api/api";
import useLocalStorage from "./hooks/LocalStorage";
import userContext from "./UserContext";

//import UserContext from "./UserContext";

const [user, setUser] = useLocalStorage("user", "");
const [token, setToken] = useLocalStorage("token", "");

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      //currUser: null,
      loading: true
    }

    this.login = this.login.bind(this);
    this.logOut = this.logOut.bind(this);
    this.Signup = this.Signup.bind(this);
    //this.updateUser = this.updateUser.bind(this);
  }

  //call login to get rid of duplicate code
  async componentDidMount() {
    if (localStorage.token) {
      //let currUser = await this.getUser();
      //this.setState({ currUser, loading: false });
      this.setState({ loading: false });
    } else {
      //this.setState({ currUser: null, loading: false });
      this.setState({ loading: false });
    }
  }

  async Signup(newUser){
 
    let regUser = await JoblyApi.signup(newUser);
   
    setToken(regUser);
    let user = await JoblyApi.getCurrentUser(newUser.username);
    setUser(user);
   
   }

  async login() {
    let currUser = await this.getUser();
    this.setState({ currUser });
  }

  logOut() {
    localStorage.removeItem("token");
    this.setState({ currUser: null });
  }

  async updateUser() {
    let currUser = await this.getUser();
    this.setState({ currUser });
  }

  async getUser() {
    try {
      let user = (await jwt.decode(localStorage.token)).username;
      let profile = await JoblyApi.getUser(user);
      return profile;
    } catch (err) {
      return null;
    }
  }

  render() {
    if (this.state.loading) {
      return null;
    } else {
      return (
        <div className="App">
          {/* <UserContext.Provider value={this.state.currUser}> */}
            <BrowserRouter>
              <NavBar/>
              <Routes
                loginUser={this.login}
                logOutUser={this.logOut}
                SignUpUser={this.Signup}
                updateUserDetails={this.updateUser} />
            </BrowserRouter>
          {/* </UserContext.Provider> */}
        </div>
      );
    }
  }
}

export default App;
