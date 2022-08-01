import JoblyApi from "../api/api";
import useLocalStorage from "../hooks/LocalStorage";

const [user, setUser] = useLocalStorage("user", "");
const [token, setToken] = useLocalStorage("token", "");

async function Signup(newUser){
 
 let regUser = await JoblyApi.signup(newUser);

 setToken(regUser);
 let user = await JoblyApi.getCurrentUser(newUser.username);
 setUser(user);

}

export default Signup;