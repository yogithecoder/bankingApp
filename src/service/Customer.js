import axios from "axios";
import Swal from "sweetalert2";


const REST_API_BASE_URL = "http://localhost:8080";
export const listCustomer = (url) => {
    axios.get(REST_API_BASE_URL+url);
}

export const createCustomer = (url,customer) =>{
    axios.post(REST_API_BASE_URL+url,customer,{
        headers: {"Access-Control-Allow-Origin": "*"}
      }).then((res)=>{
        if(res.data){
            Swal.fire({
                title: "Account Registered",
                icon: "success",
                confirmButtonText:"OK"
              });
        }
      })
}
