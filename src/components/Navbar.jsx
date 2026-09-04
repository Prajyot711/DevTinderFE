import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";


const Navbar = () => {
    
    const user =  useSelector((store) => store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();    

    const handleLogout = async() => {
        try{
            const logout = await axios.post(BASE_URL + "/logout",{},{withCredentials:true})
            console.log(logout)
            dispatch(removeUser())
            return navigate("/login")

        }catch(err){
            console.error(err.message)
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl">🧑‍💻 DevTinder</Link>
            </div>
            <div className="flex gap-2">

                {user && (<div className="dropdown dropdown-end mx-5 flex">
                    <p className="text-xl mt-1 text-fuchsia-500 font-bold">Welcome, {user.firstName}</p>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-2">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user Photo"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to="/connections">Connections</Link></li>
                        <li><Link to="/requests">Requests</Link></li>
                        <li><Link to="/premium">Premium</Link></li>
                        <li><Link onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </div>)}
            </div>
        </div>
    )
}

export default Navbar