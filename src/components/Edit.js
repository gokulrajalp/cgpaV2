import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import "./CSS.css";
import { useAuth } from "./Data";


export default function Edit() {
  let navigate = useNavigate();
  let Data=useAuth(); 
  // const usersCollectionRef = collection(db, "cgpa");
  // const [users, setUsers] = useState([]);
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    // if(localStorage.getItem("edit_page")!=="true"){
    //   navigate('/');
    //  }
  }, []);

  function verify() {
    var key = localStorage.getItem("regNo");
    Data.users.forEach((users) => {
      if (key === users.regNo) {
        if (password === users.Password) {
          localStorage.setItem("id", users.id);
          
            const userDoc = doc(db, "cgpa", users.id);
            const newFields = { cgpa_page: true };
            updateDoc(userDoc, newFields);
            setCheck(true);
        } else {
          setError("This is not a valid password");
        }
      }
    });
  }


function forget(){
  // window.open(`https://wa.me/919659245977?text=Hi_Gokulraja_My_Register_Number_Is_${localStorage.getItem("regNo")}_Send_Me_The_Password`);
  // localStorage.setItem("forgot_page","true");
  navigate('/');
}



  useEffect(() => {
    if(check){
      navigate(`/cgpa`);
    }
  }, [check]);

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
      <div className="text">Edit your details</div>
      <div className="text"> {localStorage.getItem(`regNo`)} </div>

      <form onSubmit={verify}>
          <div className="field">
              <span className="bx bxs-key"></span>
              <input placeholder="Current Password *" type='password' onChange={(e) => {setPassword(e.target.value);}} required/>
          </div>


          <div className="field d-none" id="name">
              <span className="bx bxs-key"></span>
              <input placeholder="Name" type='text' onChange={(e) => {setPassword(e.target.value);}} required/>
          </div>


          <div className="field d-none" id="email">
              <span className="bx bxs-key"></span>
              <input placeholder="Email" type='email' onChange={(e) => {setPassword(e.target.value);}} required/>
          </div>

          <div className="field d-none" id="password">
              <span className="bx bxs-key"></span>
              <input placeholder="New Password" type='password' onChange={(e) => {setPassword(e.target.value);}} required/>
          </div>

          <div className="field d-none" id="password">
              <span className="bx bxs-key"></span>
              <input placeholder="Confirm New Password" type='password' onChange={(e) => {setPassword(e.target.value);}} required/>
          </div>

        <button className="button1" type="submit">Update</button>
        <p className="text_error">{error}</p>
        <p className="text_forget" onClick={forget}>Back to login</p>
        

      </form>
      
      <div className="drak-light" onClick={mood}>
          <i className="bx bx-moon moon"></i>
          <i className="bx bx-sun sun"></i>
      </div>
  </div>

  </div>



  );
}