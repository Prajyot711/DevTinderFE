import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequest } from "../utils/requestSlice"
import { useEffect } from "react"

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector(store => store.requests)

    const getRequests = async() => {
        try{
            const res = await axios.get(BASE_URL + "/user/request/received", {withCredentials:true})
            console.log(res.data.data)
            dispatch(addRequest(res.data.data))
        }catch(err){
            console.error(err.message)
        }
    }

    useEffect(() => {
        getRequests();
    },[])
  
    if (!requests) return;

    if(requests.length === 0) return <p className="text-4xl font-bold flex justify-center my-10">No Requests!</p>

    return (
    <div>
        <h1 className="flex justify-center my-10 font-bold text-3xl ">Connections</h1>
        {requests.map((user) => {

            const{_id,firstName, lastName, age, gender, photoUrl} = user.fromUserId

            return(
                <div className="flex justify-between mx-auto bg-base-300 m-4 p-4 rounded-lg max-w-4/12 items-center" key={_id}>
                    <div >
                        <img alt="photo" src={photoUrl} className="rounded size-30"></img>
                    </div >
                        
                    <div className="text-left mx-4">
                        <h2 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
                        <p>{age && gender && <p>`${age}, ${gender}`</p>}</p>
                    </div>
                    <div>
                        <button className="btn btn-secondary mx-2">Accept</button>
                        <button className="btn btn-primary mx-2">Reject</button>    
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Requests