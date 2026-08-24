import { useSelector } from "react-redux";


const Navbar = () => {

    const user =  useSelector(store => store.user)
    console.log(user)

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">🧑‍💻 DevTinder</a>
            </div>
            <div className="flex gap-2">

                {user && (<div className="dropdown dropdown-end mx-5 flex">
                    <p>Welcome, {user.firstName}</p>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
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
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>)}
            </div>
        </div>
    )
}

export default Navbar