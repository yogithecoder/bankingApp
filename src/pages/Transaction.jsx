import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
    const [destAcc, setDest] = useState('');
    const [amount, setAmount] = useState('');
    const profile = JSON.parse(localStorage.getItem("customerProfile"));
    const navigator = useNavigate();
    const loginPayload = localStorage.getItem("loginPayload");
   
    
    function handleDestAcc(e){
        setDest(e.target.value);
    }
    
    function handleAmount(e){
        setAmount(e.target.value);
    }

    function onSendMoney(e){
        e.preventDefault();

        const transPayload = {
            "sourceAccount":{
                "accountNumber": profile.accountNumber
                },
             "destinationAccount":{
                "accountNumber":parseInt(destAcc)
                 },
              "amount": amount
           }
        
           axios.post("http://localhost:8080/transaction", transPayload,{
            headers: {"Access-Control-Allow-Origin": "*"}
          }).then((res)=>{
            if(res.data.length>0){
                Swal.fire({
                    title: "Transaction Successful",
                    icon: "success",
                    confirmButtonText:"OK"
                  }).then((result)=>{
                    if(result.isConfirmed){
                        setAmount('');
                        setDest('');
                        navigator('/Dashboard');
                    }
                  });

                  axios.post("http://localhost:8080/customers/login",JSON.parse(loginPayload),{
                    headers: {"Access-Control-Allow-Origin": "*"}
                  }).then((res)=>{
                    if(res.data.login){
                        localStorage.setItem("customerProfile", JSON.stringify(res.data));
                    }
                  });
            }
          });
           
    }

  return (
    <>
        <Navbar/>
        <div class="container-sm" style={{ "padding-top": "7%", "padding-right" : "10%", "padding-left":"10%" }}>
      <div class="card text-center">
        <div class="card-header">
          <h3 style={{'float': 'left'}}>Send Money</h3>
        </div>
        <div class="card-body" style={{"padding-right" : "20%", "padding-left":"20%" }}>
        <form>
        <div class="mb-3">
          <label class="form-label" style={{'float': 'left'}}>
            Enter Destination Account No.:
          </label>
          <input
            type="number"
            value={destAcc}
            class="form-control"
            placeholder="Destination Account"
            onChange={handleDestAcc}
          />
        </div>
        <div class="mb-3">
          <label class="form-label" style={{'float': 'left'}}>
            Enter Amount :
          </label>
          <input
            type="number"
            value={amount}
            class="form-control"
            placeholder="₹"
            onChange={handleAmount}
          />
        </div>
        <button type='submit' class="btn btn-primary" onClick={onSendMoney}>
        Send
        </button>
      </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Transaction