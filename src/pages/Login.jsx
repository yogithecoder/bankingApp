import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login.css';



const Login = () => {

    const navigator = useNavigate();
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePass(e){
        setPass(e.target.value);
    }

    function loginCustomer (e){

        if(!email){
          e.preventDefault();

          Swal.fire({
            title: "Email is empty",
            icon: "error",
            confirmButtonText:"OK"
          });
        }else if(!pass){
          e.preventDefault();
          Swal.fire({
            title: "Password is empty",
            icon: "error",
            confirmButtonText:"OK"
          });
        }else{
          e.preventDefault();
          const loginPayload = {
           "email" : email,
           "password" : pass
          }

          axios.post("http://localhost:8080/customers/login",loginPayload,{
           headers: {"Access-Control-Allow-Origin": "*"}
         }).then((res)=>{
           if(res.data.login){
             localStorage.setItem("loginPayload", JSON.stringify(loginPayload));
             
             localStorage.setItem("customerProfile", JSON.stringify(res.data));  
             navigator("/Dashboard");

             Toast.fire({
              icon: "success",
              title: "Signed in successfully"
            });

           }else if(!res.data.login){
             e.preventDefault();
               Swal.fire({
                   title: "Authentication Failed",
                   text:"Email or Password is invalid",
                   icon: "error",
                   confirmButtonText:"OK"
                 });
                 setEmail('');
                 setPass('');
           }
         });
        }
    }

  return (
    <div Style = {{
      backgroundImage:
      'url("https://www.austinwilliams.com/wp-content/uploads/2024/01/AUS1454_ROIBankWeb_BlogImage.jpg")'
   }}>
    <Navbar/>
    <div class="container-sm" style={{ "padding-top": "7%", "padding-right" : "10%", "padding-left":"10%" }}>
      <h1 style={{ "text-align": "center" }}>IBM GR3 Bank</h1>
      <div class="card text-center">
        <div class="card-header">
      <a href="/register" class="btn btn-success" style={{"float":"right"}}>
           Register
          </a>
          <h3 style={{'float': 'left'}}>Login</h3>
        </div>
        <div class="card-body" style={{"padding-right" : "20%", "padding-left":"20%" }}>
        <form>
        <div class="mb-3 mt-3">
          <label for="email" class="form-label" style={{'float': 'left'}}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            class="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            onChange={handleEmail}
          />
        </div>
        <div class="mb-3">
          <label for="pwd" class="form-label" style={{'float': 'left'}}>
            Password:
          </label>
          <input
            type="password"
            value={pass}
            class="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pswd"
            onChange={handlePass}
          />
        </div>
        <button type='submit' class="btn btn-primary" onClick={loginCustomer}>
        Login
        </button>
      </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login