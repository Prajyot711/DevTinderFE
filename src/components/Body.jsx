import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useCallback, useEffect} from 'react'


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(store => store.user)

  const fetchUser = useCallback(async() => {
    if(userProfile) return;
    try{
      const res = await axios.get(BASE_URL + '/profile/view' , {withCredentials:true})
      console.log(res.data)
      dispatch(addUser(res.data))

    }catch(err){
      if(err.status == 401){
        navigate("/login")
      }
      console.error(err)
    }
  },[userProfile,dispatch,navigate]);

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
    
  )
}

export default Body