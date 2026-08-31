import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const EditProfile = ({user}) => {

    const[firstName, setFirstName] = useState(user.firstName)
    const[lastName, setLastName] = useState(user.lastName)
    const[photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const[age, setAge] = useState(user.age)
    // const[gender, setGender] = useState(user.gender)
    const[about, setAbout] = useState(user.about)
    const[error,setError] = useState("")
    const dispatch = useDispatch()
    const[showToast,setShowToast] = useState(false)
    const genderArray = ["male","female","others"];
    const[gender,setGender] = useState(genderArray[0]);

    const saveProfile = async() => {
        setError("")
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit", {firstName, 
                lastName,
                photoUrl,
                age,
                gender,
                about
            },{
                withCredentials:true
            })
            console.log(res)
            dispatch(addUser(res?.data?.data))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
            },3000)
        }catch(err){
            setError(err?.response?.data)
        }
    }

    




    return (
        <>
            <div className="flex justify-center mx-10">
                <div className="flex justify-center my-10 mx-10">
                <div className="card card-border bg-base-300 w-96">
                    <div className="card-body">
                    <h2 className="card-title">Edit Profile</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" value={firstName} className="input" onChange={(e) => setFirstName(e.target.value)}/>
                        <p className="label"></p>
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" value={lastName} className="input" onChange={(e) => setLastName(e.target.value)}/>
                        <p className="label"></p>
                        <legend className="fieldset-legend">Photo Url</legend>
                        <input type="text" value={photoUrl} className="input" onChange={(e) => setPhotoUrl(e.target.value)}/>
                        <p className="label"></p>
                        <legend className="fieldset-legend">Age</legend>
                        <input type="text" value={age} className="input" onChange={(e) => setAge(e.target.value)}/>
                        <p className="label"></p>
                        <legend className="fieldset-legend">Gender</legend>
                        <select type="text" value={gender} className="input" onChange={(e) => setGender(e.target.value)}>
                            {genderArray.map((gen) => (
                                <option key={gen} value={gen}> {gen}</option>
                            ))}
                        </select>
                        <p className="label"></p>
                        <legend className="fieldset-legend">About</legend>
                        <input type="text" value={about} className="input" onChange={(e) => setAbout(e.target.value)}/>
                    </fieldset>
                    <div className="card-actions justify-center">
                    <button className="btn btn-primary justify-center" onClick={saveProfile}>Save Profile</button>
                    </div>
                    <p className="text-red-600">{error}</p>
                    </div>
                </div>
                </div>
                <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
            </div>
            {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully!</span>
                </div>
            </div>)}
        </>
    )
    }

export default EditProfile