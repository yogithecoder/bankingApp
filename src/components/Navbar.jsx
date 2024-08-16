import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Navbar = () => {
  const isLoggedin = true ? localStorage.getItem('customerProfile') : false;
  const navigator = useNavigate();
  
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

  function onLoggedOut(){
    Swal.fire({
      title: "Are you sure ?",
      text:"You want to log out ?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      icon: "question"
    }).then((result)=>{
      if(result.isConfirmed){
        const profile = JSON.parse(localStorage.getItem("customerProfile"));
        axios.post("http://localhost:8080/customers/logout",{"email":profile.email},{
          headers: {"Access-Control-Allow-Origin": "*"}
        }).then(()=>{
          localStorage.setItem("customerProfile", '');
          localStorage.setItem("loginPayload", '');
          navigator('/');

          Toast.fire({
            icon: "success",
            title: "Logged out successfully"
          });

        })
        
      }
    })
    
  }

  return (
    <nav className="navbar fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
        <span className="navbar-brand">
            <img
              src="https://zeevector.com/wp-content/uploads/IBM-White-Logo-PNG-Transprent.png"
              width="70"
              height="27"
              className="d-inline-block align-text-top"
              alt="IBM"
            />
          </span>
          {isLoggedin ? <button className='btn btn-danger' onClick={onLoggedOut}>Log Out</button> :''}
        </div>
      </nav>
  )
}

export default Navbar