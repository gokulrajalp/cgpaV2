import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import "./CSS.css";
import { useAuth } from "./Data";


export default function EditPassword() {
  let navigate = useNavigate();
  let Data=useAuth(); 

  const [password, setPassword] = useState();
  const [newPawword, setNewPawword] = useState();
  const [confirmPawword, setConfirmPawword] = useState();


  const [error, setError] = useState();


  useEffect(() => {
    
    if(localStorage.getItem("editpassword")==="true"){
    localStorage.removeItem('editpassword');
      
     }else{
    navigate('/cgpa');
  }
  }, []);




  function verify() {

    if(newPawword.length>=5){
    var key = localStorage.getItem("regNo");
    Data.users.forEach((users) => {
      if (key === users.regNo) {
        if (password === users.Password) {
          if(newPawword === confirmPawword){
      

          const update = async() => {
            const userDoc = doc(db, "cgpa", users.id);
            const newFields = { Password : newPawword };
            const res = await updateDoc(userDoc, newFields);
            localStorage.removeItem('editemail');
          localStorage.setItem("reloadonce","true");
          navigate('/cgpa')
            
        }
       
                update(); 
          
      }else{
        setError("New password does not match with confirm password");
      }
        } else {
          setError("Enter old password correctly");
        }
      }
    });
    }else{
      setError("New Password Should be more than 5 characters");
    }
  }


function forget(){
  
  navigate('/cgpa');
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
      <div className="text">Edit your Email</div>
      <div className="text"> {localStorage.getItem(`regNo`)} </div>

      <form onSubmit={verify}>
          <div className="field">
              <span className="bx bxs-key"></span>
              <input placeholder="Current Password *" type='password' onChange={(e) => {setPassword(e.target.value);}} required/>
          </div>

          <div className="field" >
              <span className="bx bxs-key"></span>
              <input placeholder="New Password *" type='password' onChange={(e) => {setNewPawword(e.target.value);}} required/>
          </div>

          <div className="field" >
              <span className="bx bxs-key"></span>
              <input placeholder="Confirm Password *" type='password' onChange={(e) => {setConfirmPawword(e.target.value);}} required/>
          </div>

          

        <button className="button1" type="submit">Change</button>
        <p className="text_error">{error}</p>
        <p className="text_forget" onClick={forget}>Back to home</p>
        

      </form>
      
      <div className="drak-light" onClick={mood}>
          <i className="bx bx-moon moon"></i>
          <i className="bx bx-sun sun"></i>
      </div>
  </div>

  </div>



  );
}