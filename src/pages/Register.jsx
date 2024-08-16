import React, { useState } from "react";
import { createCustomer } from "../service/Customer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";


const Register = () => {
    const navigator = useNavigate();
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    
    const validatePass = (pass)=>{
      return String(pass).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/);
    }

    function handleName (e){
        setName(e.target.value);
    }
    
    function handleEmail (e){
        setEmail(e.target.value);
    }
    
    function handlePass (e){
        setPass(e.target.value);
    }

    function saveCustomer(e){

        if(!name){
          e.preventDefault();
            Swal.fire({
                title: "Name is empty !",
                icon: "error",
                confirmButtonText:"OK"
              });
        }else if(!email){
          e.preventDefault();
            Swal.fire({
                title: "Email is empty !",
                icon: "error",
                confirmButtonText:"OK"
              });
        }else if(!validateEmail(email)){
          e.preventDefault();
            Swal.fire({
                title: "Invalid Email !",
                text:'Please enter correct email',
                icon: "error",
                confirmButtonText:"OK"
              }).then((result)=>{
                if(result.isConfirmed){
                   setEmail(''); 
                }
              })
        }else if (!pass){
          e.preventDefault();
            Swal.fire({
                title: "Invalid Password",
                icon: "error",
                confirmButtonText:"OK"
              });
        }else if(!validatePass(pass)){
          e.preventDefault();

          Swal.fire({
            title: "Invalid Password",
            text : "Password must contain a special character and must be 8-15 characters",
            icon: "error",
            confirmButtonText:"OK"
          });
        }else{
            e.preventDefault();

            const customer = {"name":name,"email":email,"password":pass};
            
            // createCustomer("/customers",customer);
            axios.post("http://localhost:8080/customers",customer,{
                headers: {"Access-Control-Allow-Origin": "*"}
              }).then((res)=>{
                console.log(res);
                if(res.data){
                    Swal.fire({
                        title: "Account Registered",
                        icon: "success",
                        confirmButtonText:"OK"
                      }).then((result)=>{
                        if(result.isConfirmed){
                            navigator('/');
                        }
                      })
                      
                }else if(res.data == "" || res.data == null || !res.data){
                    Swal.fire({
                        title: "Email already exists",
                        icon: "error",
                        confirmButtonText:"OK"
                      }).then((result)=>{
                        if(result.isConfirmed){
                            setName(''); setEmail(''); setPass('');
                        }
                      })
                }
              })
           
        } 
    }
  return (
    <>
    <Navbar/>
    <div className="container-sm" style={{ "paddingTop": "7%", "paddingRight" : "20%", "paddingLeft":"20%" }}>
        <h1>
            Registration
        </h1>
    <form>
    <div className="mb-3 mt-3">
          <label  className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            placeholder="Enter name"
            name="name"
            onChange={handleName}
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            placeholder="Enter email"
            name="email"
            onChange={handleEmail}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Password: (Should contain a special character and must be 8 to 15 characters)
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            value={pass}
            placeholder="Enter password"
            name="pswd"
            onChange={handlePass}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={saveCustomer}>
          Register
        </button>
      </form>
    </div>
      
    </>
  );
};

export default Register;
