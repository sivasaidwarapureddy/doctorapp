import React from 'react';
import 'antd/dist/reset.css'; // For Ant Design v5+
import {Form,Input,message} from 'antd';
import "../styles/Registerstyle.css"
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../src/redux/features/alertSlice';

const Login = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
  // onfinsih handler
  const onFinishHandler = async(values) =>{
    try {
      dispatch(showLoading())
      const res = await axios.post('http://localhost:5001/api/v1/user/login',values)
      dispatch(hideLoading())
      if(res.data.sucess){
        localStorage.setItem("token",res.data.token)
        message.success("Login sucessful ")
        navigate('/')
      }
      else{
        message.error('somethig went wrong ')
      }
      
    } catch (error) {
      dispatch(hideloading())
      if (error.response) {
        console.error('Error during Login:', error.response.data); 
        message.error(`Error: ${error.response.data.message || 'An error occurred during login.'}`);
      } else {
        console.error('Error during Login:', error.message); // Network or other issues
        message.error(`Error: ${error.message || 'An unexpected error occurred.'}`);
      }
    }
  }
  
return (
 
 <>
 <div className="Form-container">
  
  <Form layout=" vertical " onFinish={onFinishHandler} className='register-form'>
     <h3 className="register text-center"> Login Form </h3>
  
    
    <Form.Item label = "Email" name = "email">
      <Input type = " text" required/>
      
    </Form.Item>
    <Form.Item label = "Password" name = "password">
      <Input type = "password" required/>
      
    </Form.Item>
    <Link to ="/register" className='ms-2' > Register ? </Link>
    <button className=' btn btn-primary ms-4' type='submit'>   Login </button>
  </Form>

 </div>
  </>
);
};


export default Login
