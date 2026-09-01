import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFromFeed } from "../utils/feedSlice";


const UserCard = ({user}) => {

    const {_id, firstName, lastName, photoUrl, age, gender, about} = user;
    const dispatch = useDispatch();

    const actionOnProfile = async(status,_id) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id,{},{withCredentials:true})
            console.log(res.data.data);
            dispatch(removeFromFeed(_id))
        }catch(err){
            console.log(err.message)
        }
    }

    return (
        <div className='my-10 mx-10'>
            <div className="card bg-base-300 w-80 shadow-sm">
                <figure>
                    <img
                    src={photoUrl}
                    alt="photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-center my-2">
                    <button className="btn btn-primary" onClick={() => actionOnProfile('ignored', _id)}>ignore</button>
                    <button className="btn btn-secondary" onClick={() => actionOnProfile('interested', _id)}>interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default UserCard