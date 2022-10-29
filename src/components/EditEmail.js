import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import "./CSS.css";
import { useAuth } from "./Data";


export default function EditEmail() {
  let navigate = useNavigate();
  let Data=useAuth(); 
  // const usersCollectionRef = collection(db, "cgpa");
  // const [users, setUsers] = useState([]);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();


  const [error, setError] = useState();
  // const [check, setCheck] = useState(false);

  useEffect(() => {
    
    if(localStorage.getItem("editemail")==="true"){
    localStorage.removeItem('editemail');
      
     }else{
    navigate('/cgpa');
  }
  }, []);

  // useEffect(()=>{
  // if(check){
  //   alert("ok")
  //   window.location.replace("https://gokulrajalp.github.io/cgpa");
  // }

  // },[check])

  function verify() {
    if(email.length>=10){
    var key = localStorage.getItem("regNo");
    Data.users.forEach((users) => {
      if (key === users.regNo) {
        if (password === users.Password) {
      

          const update = async() => {
            const userDoc = doc(db, "cgpa", users.id);
            const newFields = { mail : email };
            const res = await updateDoc(userDoc, newFields);
            localStorage.removeItem('editemail');
          localStorage.setItem("reloadonce","true");
          navigate('/cgpa')
            
        }
       
                update(); 
          
            // const userDoc = doc(db, "cgpa", users.id);
            // alert(email);
            // alert(users.mail);
            // const newFields = { mail : email };
            // updateDoc(userDoc, newFields);
            // alert("Email changed successfully");
            // navigate('/cgpa');
            // localStorage.setItem("reloadonce","true");
        } else {
          setError("This is not a valid password");
        }
      }
    });
    }else{
      setError("email is not Valid");
    }
  }


function forget(){
  // window.open(`https://wa.me/919659245977?text=Hi_Gokulraja_My_Register_Number_Is_${localStorage.getItem("regNo")}_Send_Me_The_Password`);
  // localStorage.setItem("forgot_page","true");
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
              <span className="bx bxs-user"></span>
              <input placeholder="Email *" type='email' onChange={(e) => {setEmail(e.target.value);}} required/>
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