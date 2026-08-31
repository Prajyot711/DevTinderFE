import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"


const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections)
    console.log(connections)
    const getConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections" , {withCredentials:true})
            console.log(res.data.data)
            dispatch(addConnections(res?.data?.data))
        }catch(err){
            console.error(err.message)
        }
    }

    useEffect(() => {
        getConnections();
    },[])

    if(!connections) return;

    if(connections.length === 0) return <p>No Connections!</p>

    return (
    <div>
        <h1 className="flex justify-center my-10 font-bold text-3xl">Connections</h1>
        {connections.map((user,_id) => {

            const{firstName, lastName, age, gender, about, photoUrl} = user

            return(
                <div className="flex mx-auto bg-base-300 m-4 p-4 rounded-lg w-1/2" key={_id}>
                    <div >
                        <img alt="photo" src={photoUrl} className="rounded size-30"></img>
                    </div >
                        
                    <div className="text-left mx-4">
                        <h2 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
                        <p>{age && gender && <p>`${age}, ${gender}`</p>}</p>
                        <p>{about}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Connections