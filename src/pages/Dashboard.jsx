import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    if(!localStorage.getItem("customerProfile")){
      return(<h1 style={{textAlign:"center", paddingTop:"10%"}}>Access Denied</h1>)
    }   
    //get the whole object using getItem
    const profile = JSON.parse(localStorage.getItem("customerProfile"));

    
    const transactions = profile.transactinons.sort((a,b) => (a.transactionDate > b.transactionDate) ? 1 : ((b.transactionDate > a.transactionDate) ? -1 : 0));
    transactions.reverse();

    function formatDate(timestamp) {
      // Create a Date object from the timestamp
      const date = new Date(timestamp);
  
      // Array of abbreviated month names
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
      // Extract the month, day, and year
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
  
      // Format the date as "mmm dd, yyyy"
      return `${month} ${day}, ${year}`;
  }

  function extractTimeAMPM(isoDateTime, isUTC = false) {
    // Create a Date object from the ISO 8601 string
    const date = new Date(isoDateTime);

    // Extract time components based on the time zone preference
    const hours = isUTC ? date.getUTCHours() : date.getHours();
    const minutes = isUTC ? date.getUTCMinutes() : date.getMinutes();
    const seconds = isUTC ? date.getUTCSeconds() : date.getSeconds();

    // Convert hours to 12-hour format and determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = ((hours % 12) || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Return formatted time in `hh:mm:ss a` format
    return `${hours12}:${formattedMinutes}:${formattedSeconds} ${period}`;
  }
  return (
    <>
      <Navbar/>
      <div
        class="container-sm"
        style={{
          "padding-top": "8%",
          "padding-right": "10%",
          "padding-left": "10%",
        }}
      >
        <div class="card text-center">
          <div class="card-header">
            <h3 style={{ float: "left" }}>Profile</h3>
          </div>
          <div
            class="card-body"
            style={{ "padding-right": "20%", "padding-left": "20%" }}
          >
            <form>
              <div class="row">
                <label class="col-sm-3">
                  <h5 style={{ float: "right" }}>Name :</h5>
                </label>
                <div class="col-sm-9">
                  <h5 style={{ float: "left" }}>{profile.name}</h5>
                </div>
              </div>
              <div class="row">
                <label for="staticEmail" class="col-sm-3">
                  <h5 style={{ float: "right" }}>Email :</h5>
                </label>
                <div class="col-sm-9">
                  <h5 style={{ float: "left" }}>{profile.email}</h5>
                </div>
              </div>

              <div class="row">
                <label class="col-sm-3">
                  <h5 style={{ float: "right" }}>Account No:</h5>
                </label>
                <div class="col-sm-9">
                  <h5 style={{ float: "left" }}>{profile.accountNumber}</h5>
                </div>
              </div>

              <div class="row">
                <label class="col-sm-3">
                  <h5 style={{ float: "right" }}>Balance:</h5>
                </label>
                <div class="col-sm-9">
                  <h5 style={{ float: "left" }}><span>₹ </span>{profile.balance}</h5>
                </div>
              </div>
            </form>
          </div>
        </div>

        <br />
        <br />

        <div class="card text-center">
          <div class="card-header">
            <a href="/Transaction" class="btn btn-success" style={{"float":"right"}}>
            <span>₹ </span>Send Money
            </a>
            <h3 style={{ float: "left" }}>Transactions</h3>
          </div>
          <div
            class="card-body"
          >
            <table class="table">
              <thead class="table-dark">
                <tr>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Transaction Account</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Transaction Type</th>
                </tr>
              </thead>
              <tbody class="table-info">
              {
                transactions.map((val,i) =>
                  <tr>
                    <td>{val.transactionId}</td>
                    <td>{formatDate(val.transactionDate)+ " | "+ extractTimeAMPM(val.transactionDate)}</td>
                    <td>{val.destinationAccount.accountNumber}</td>
                    <td><span>₹ </span>{val.amount}</td>
                    {profile.accountNumber == val.destinationAccount.accountNumber ? <td style={{"color":"green"}}><b>Credited</b></td> : <td style={{"color":"red"}}><b>Debited</b></td> }
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
