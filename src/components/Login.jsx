import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {

  const[emailId,setEmailId] = useState("pk27@gmail.com");
  const[password,setPassword] = useState("Pranali@123")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[error, setError] = useState("")

  const handleLogin = async () => {
    try{
      const response = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      },
    {
      withCredentials:true,
    });
      const userData = response.data.data;
      dispatch(addUser(userData))
      return navigate("/")
    }catch(err){
      setError(err?.response?.data || "Something went wrong")
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          {/* <div className="">
            <label>Email:</label>
            <input className="bg-base-100" type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
            <br></br>
            <label>Password:</label>
            <input className="bg-base-100" type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>

          </div> */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input type="text" value={emailId} className="input" placeholder="Enter Email" onChange={(e) => setEmailId(e.target.value)}/>
            <p className="label"></p>
            <legend className="fieldset-legend">Password</legend>
            <input type="text" value={password} className="input" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
            <p className="text-red-500">{error}</p>
          </fieldset>
          <div className="card-actions justify-center">
          <button className="btn btn-primary justify-center" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login