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
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState();
  const regNo= localStorage.getItem("regNo");



  useEffect(() => {
    if(localStorage.getItem("forgot_page")!=="true"){
      navigate('/');
     }
  }, []);

  function verify() {
    

    const values ={
      tomail:mail,
      regNo:regNo,
      password:password
    }

    Data.users.forEach(element => {
      if (regNo === element.regNo) {
          setMail(element.mail);
          setPassword(element.Password);
      }
    });


    axios.post("http://localhost:8000/mail", values)
    .then( res => {
        alert(res.data.message);
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
 <div class="content">
      <div class="text"> {localStorage.getItem(`regNo`)} </div>
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
          let mail1 = users.mail.substring(4);
          return (
            <h4 className="text-primary text-center">****{mail1}</h4>
          );
        }
      })}

        <button className="button5" onClick={verify}>Click Here to Sent</button>
 
        

      
   
      <div class="drak-light" onClick={mood}>
          <i class="bx bx-moon moon"></i>
          <i class="bx bx-sun sun"></i>
      </div>
  </div>

  </div>



  );
}
