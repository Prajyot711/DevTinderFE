import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const Feed = () => {

  const feed = useSelector((store) => store.feed)
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed", {withCredentials:true})
      dispatch(addFeed(res.data))
    }catch(err){
      console.error(err.message)
    }
  }

  useEffect(() => {
    getFeed()
  },[])

  return (
    feed &&
    (<div className="flex justify-center my-10 mx-5">
      {feed.map((user,_id) => (
        <UserCard user={user}/>
      ))}
        
    </div>)
  )
}

export default Feed