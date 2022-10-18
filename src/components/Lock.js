import React from "react";
import "./CSS.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { useAuth } from "./Data";

export default function Lock() {
  let navigate = useNavigate();
  let Data=useAuth(); 



  function replace (){
    window.location.replace("https://gokulrajalp.github.io/cgpa");
};




 
  const [regNo, setregNo] = useState();


  const check = () =>{
    
    if(localStorage.getItem("authentication") === "true"){
    let password = localStorage.getItem("cgpa_pwd");
    let key = localStorage.getItem("regNo");

    Data.users.forEach((users) => {
      if (key === users.regNo) {
        if (password === users.Password) {
          localStorage.setItem("signin_page","false");
          localStorage.setItem("password_page","false");
          localStorage.setItem("cgpa_page","true");
          const userDoc = doc(db, "cgpa", users.id);
          // const newFields = { cgpa_page: true };
          // updateDoc(userDoc, newFields);

let bool = window.confirm(`${key} is found... Click ok to continue or cancel for new login`);
if(bool){
  navigate(`/cgpa`);
}
        }}});
  }
}
  useEffect(()=>{
  check();
  },[Data.users])
 




 


  
  
 function mood() {
      document.querySelector(".drak-light").classList.toggle("active");
      document.querySelector("body").classList.toggle("dark");
      if(!document.querySelector("body").classList.contains("dark"))
      {
          localStorage.setItem("mode", "light-mode");
      }
      else
      {
          localStorage.setItem("mode", "dark-mode");
      }  
  };



  function verify() {
    var check = false;
    Data.users.forEach((users) => {
      if (regNo === users.regNo) {
        check = true;
        localStorage.setItem("regNo", users.regNo);
      }
    });

    if (check) {
      localStorage.setItem("password_page","true");
      navigate("/password");
    } else {
      localStorage.setItem("regNo", regNo);
      localStorage.setItem("signin_page","true");
      navigate("/signin");
    }
  }
  return (

<div className="rootDiv">
 <div className="content">
      <div className="text">WELCOME</div>

      <form onSubmit={verify}>
          <div className="field">
              <span className="bx bxs-user"></span>
              <input placeholder="Register Number"  type="number" id="regNo" name="fname" onChange={(e) => {setregNo(e.target.value);}} required/>
          </div>

        <button className="button1" type="submit">Verify</button>
        <p className="text_replace" onClick={replace}>Click to use old Version</p>

      </form>
      
      <div className="drak-light" onClick={mood}>
          <i className="bx bx-moon moon"></i>
          <i className="bx bx-sun sun"></i>
      </div>
  </div>

  



      {/* {Data.users.map((users)=>{
    return <div><h1>name : {users.name}</h1></div>
      })} */}


</div>
 )
}