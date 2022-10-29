import React from "react";
// import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { db } from "../firebase-config";
// import { collection, getDocs} from "firebase/firestore";
import "./CSS.css";
import { useAuth } from "./Data";
// import $ from 'jquery';
// import { click } from "@testing-library/user-event/dist/click";
import axios from "axios"

export default function ForgotPassword() {
  let navigate = useNavigate();
  let Data=useAuth(); 

  // const usersCollectionRef = collection(db, "cgpa");
  // const [users, setUsers] = useState([]);
  let mail = "";
  let password = "";
  
  const regNo= localStorage.getItem("regNo");



  useEffect(() => {
    if(localStorage.getItem("forgot_page")==="true"){
      localStorage.removeItem("forgot_page");
     }else{
      navigate('/');
     }
  }, []);

  function verify() {

    document.querySelector('.changetext').textContent="Sending...";
    
Data.users.forEach((element) => {
  
      if (regNo === element.regNo) {
          mail=element.mail;
          password=element.Password;
      }
    });


    const values ={
      tomail:mail,
      regNo:regNo,
      password:password
    }

    


    axios.post("https://gokulrajalp.herokuapp.com/mail", values)
    .then( res => {
      if(res.data.message==="Password is sent to your regesterd Email ID"){
        document.querySelector('.changetext').textContent="Successfully sent";
      }
        alert(res.data.message);
        localStorage.removeItem("forgot_page");
        navigate('/password');
    })

  }





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

  return (

<div className="rootDiv">
 <div className="content">
      <div className="text"> {localStorage.getItem(`regNo`)} </div>
      <div>Your password will sent to</div>
      


      {/* {Data.users.map((users) => {
        if (regNo === users.regNo) {
          let name = users.name;
          return (
            <h2 className="text-primary text-center" key="{users}">
              Welcome {name} to
            </h2>
          );
        }
      })} */}



      {Data.users.map((users) => {
        if (regNo === users.regNo) {
          let mail1 = users.mail.substring(5);
          return (
            <h4 className="text-primary text-center">*****{mail1}</h4>
          );
        }
      })}

        <button className="button1 changetext" onClick={verify}>Click Here to Sent</button>
 
        

      
   
      <div className="drak-light" onClick={mood}>
          <i className="bx bx-moon moon"></i>
          <i className="bx bx-sun sun"></i>
      </div>
  </div>

  </div>



  );
}
