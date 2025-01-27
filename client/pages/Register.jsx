import React from 'react';
import 'antd/dist/reset.css'; // For Ant Design v5+
import {Form,Input,message} from 'antd';
import "../styles/Registerstyle.css"
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../src/redux/features/alertSlice';



const Register = () => { 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinishHandler = async (values) => {
    try {

      console.log('Submitting values:', values); // Log form data
      // Adjust the URL if needed, and ensure your backend API is accessible
      dispatch(showLoading())
      const res = await axios.post('http://localhost:5001/api/v1/user/register', values);
      dispatch(hideLoading())
      if (res.data.success) {
        // Success response
        message.success('Registered successfully!');
        navigate('/login');
      } else {
        // Handling server-side failure response
        message.error(res.data.message || 'Registration failed!');
      }
    } catch (error) {
       dispatch(hideLoading())
      // More detailed error handling
      if (error.response) {
        console.error('Error during registration:', error.response.data); // Server returned an error
        message.error(`Error: ${error.response.data.message || 'An error occurred during registration.'}`);
      } else {
        console.error('Error during registration:', error.message); // Network or other issues
        message.error(`Error: ${error.message || 'An unexpected error occurred.'}`);
      }
    }
  };
  
  return (
   
   <>
   <div className="Form-container">
   <Form 
  layout="vertical" 
  onFinish={onFinishHandler} 
  className="register-form"
>
  <h3 className="register text-center">Register Form</h3>

  {/* Name Field */}
  <Form.Item
    label="Name"
    name="name"
    rules={[{ required: true, message: 'Please enter your name!' }]}
  >
    <Input type="text" />
  </Form.Item>

  {/* Email Field */}
  <Form.Item
    label="Email"
    name="email"
    rules={[
      { required: true, message: 'Please enter your email!' },
      { type: 'email', message: 'Please enter a valid email!' },
    ]}
  >
    <Input type="email" />
  </Form.Item>

  {/* Password Field */}
  <Form.Item
    label="Password"
    name="password"
    rules={[{ required: true, message: 'Please enter your password!' }]}
  >
    <Input.Password />
  </Form.Item>

  {/* Submit Button */}
  <button className="btn btn-primary" type="submit">Register</button>

  {/* Login Link */}
  <div className="mt-2">
    Already have an account? <Link to="/login">Login</Link>
  </div>
</Form>


   </div>
    </>
  );
};

export default Register;
