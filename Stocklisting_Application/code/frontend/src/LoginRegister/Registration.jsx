import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import { ToastContainer, toast } from 'react-toastify';


const Registration = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Initialize your form fields here
    userName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.userName || !formData.password){
      alert('please fill all fields');
      return;
    }
    if(! isValidPassword(formData.password)){
      alert('password must be atleaset 8 characters inclues symbol,uppercase and lowercase ');
      return;
    }
  
    try {
      const response = await fetch('http://ec2-54-153-187-40.ap-southeast-2.compute.amazonaws.com:8082/api/v1.0/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('response:', response);

      if (response.ok) {
        // Registration successful, navigate to the home page or wherever needed
        //navigate('/');
        console.log("success");
        toast.success("successfully registered");
        setTimeout(()=>{
          navigate('/login');
        }, 2000);
        
      } else {
        // Handle error cases
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  const isValidPassword =(password)=>{
   
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
     return passwordRegex.test(password);
      };

 
  return (
   <main>
    <div className="registration-bg">
      <div className="container text-center">
        <h2>Your Registration Form</h2>
        <div className="row">
          <div className="col">
            <div className="group">
        
              <input
                type="text"
                name="userName"
                placeholder='userName'
                value={formData.userName}
                onChange={handleInputChange}
              />
            </div>
            <div className="group">
          
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="group">
              <input
                type="password"
                name="password"
                placeholder='password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button className="btnGreen" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
    <ToastContainer />
    </main>
  
  );
};

export default Registration;