import React from 'react';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import StockApi from '../Stock/StockApi';
export default function Login() {
   
 

    const [loginDetail, setLoginDetail]=useState({
        userName:'',
        password:''
    })
 
    const handleChange=(event,field)=>{
       
        let actualValue=event.target.value
        setLoginDetail({
          ...loginDetail,
        [field]:actualValue
 
        })
       
    }

    const navigate = useNavigate();
 
    const  handleReset=()=> {
        setLoginDetail({
            userName:'',
            password:''
        });
    };
    const handleFormSubmit=(event)=>{
        event.preventDefault();
        if(!loginDetail.userName ||  !loginDetail.password){
          alert('please fill all fields');
          return;
        }
        console.log(loginDetail);
           
            axios.post("http://ec2-54-153-187-40.ap-southeast-2.compute.amazonaws.com:8083/api/v1.0/auth/login", (loginDetail)).then((response)=> {
                console.log(response.data)
                const { message, token } = response.data.response;
                console.log("token:",token, "end");
               
                localStorage.setItem("userName",loginDetail.userName);
                localStorage.setItem("token",token);
                toast.success(message);
                setTimeout(()=>{
                  navigate('/stockApi');
                }, 2000);
               
            }).catch((err)=> {
                //console.log(err)
                console.log(err.response)
                toast.error("invalid credential")
                //alert(err.response.data.error.message)
 
            })
    }
 
    return (
      <main >
        <div className="registration-bg">
      <div className="container text-center">
        <h2>Your Login Form</h2>
        <div className="row">
          <div className="col">
            <div className="group">
      
              <input
                type="text"
                name="userName"
                placeholder='userName'
                value={loginDetail.userName}
                onChange={(e)=>handleChange(e, 'userName')} autoComplete='off'
              />
            </div>
          
            <div className="group">
      
              <input
                type="password"
                name="password"
                placeholder='password'
                value={loginDetail.password}
                onChange={(e)=>handleChange(e, 'password')} autoComplete='off'
              />
            </div>
          </div>
        </div>
        <button className="btnGreen" onClick={handleFormSubmit}>
          Login
        </button>
      </div>
    </div>
    {/*<StockApi token={sessionStorage.getItem("token")} />*/}
    <ToastContainer/>
        
      </main>
 
    );
  }

