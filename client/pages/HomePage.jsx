import React from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../src/redux/features/alertSlice';
import Layouts from '../src/components/Layouts';




const HomePage = () => {
  
     const dispatch = useDispatch()
  const getuserdata = async() =>{
    <h1> home page </h1>
    try {
      dispatch(showLoading())
       const res = await axios.post('http://localhost:5001/api/v1/user/getuserdata',{},{
        headers :{
          Authorization : "Bearer" + localStorage.getItem("token"),
        },
       })
        dispatch(hideLoading())
      
      
    } catch (error) {
       dispatch(hideLoading())
      console.log(error)

    }

  useEffect(() => {
    getuserdata(); // Call API on component mount
  }, []);

  }
  return (
    <Layouts>
    <div>  Home Page </div>
  </Layouts>
      
  )
}

export default HomePage;
