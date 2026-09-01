import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {

  const[isLogin, setIsLogin] = useState(true);
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[emailId,setEmailId] = useState("pk27@gmail.com");
  const[password,setPassword] = useState("Pranali@123")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[error, setError] = useState("")

  const handleSignup = async() => {
      try{
        const response = await axios.post(BASE_URL + "/signup", {
          firstName,
          lastName,
          emailId,
          password
        },
      {
        withCredentials:true,
      });
        dispatch(addUser(response.data.data))
        return navigate("/profile")
      }catch(err){
        setError(err?.response?.data || "Something went wrong")
      }
  }

  const handleLogin = async () => {
    try{
      const response = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      },
    {
      withCredentials:true,
    });
      dispatch(addUser(response.data.data))
      return navigate("/")
    }catch(err){
      setError(err?.response?.data || "Something went wrong")
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title m-auto">{isLogin ? "Login" : "Sign Up"}</h2>
          <fieldset className="fieldset">
            {!isLogin && <>
            <legend className="fieldset-legend">First Name</legend>
            <input type="text" value={firstName} className="input" placeholder="Enter Email" onChange={(e) => setFirstName(e.target.value)}/>
            <p className="label"></p>
            <legend className="fieldset-legend">Password</legend>
            <input type="text" value={lastName} className="input" placeholder="Enter Password" onChange={(e) => setLastName(e.target.value)}/>
            </>}
            <p className="label"></p>
            <legend className="fieldset-legend">Email Id</legend>
            <input type="text" value={emailId} className="input" placeholder="Enter Email" onChange={(e) => setEmailId(e.target.value)}/>
            <p className="label"></p>
            <legend className="fieldset-legend">Password</legend>
            <input type="text" value={password} className="input" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
            <p className="text-red-500">{error}</p>
          </fieldset>
          <div className="card-actions justify-center">
          <button className="btn btn-primary justify-center" onClick={isLogin ? handleLogin : handleSignup}>{isLogin ? "Login" : "Sign Up"}</button>
          </div>
          <p className="cursor-pointer text-right mt-3" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "New User? Sign up here." : "Exisiting User? Login here."}</p>
        </div>
      </div>
    </div>
  )
}

export default Login