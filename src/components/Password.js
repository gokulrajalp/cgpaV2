import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs,  updateDoc, doc } from "firebase/firestore";
import "./CSS.css";


export default function Signin() {
  let navigate = useNavigate();

  const usersCollectionRef = collection(db, "cgpa");
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("password_page")==="true"){
      const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
     }else{
      navigate('/');
  }
  }, []);

  function verify() {
    var key = localStorage.getItem("regNo");
    users.forEach((users) => {
      if (key === users.regNo) {
        if (password === users.Password) {
          localStorage.setItem("id", users.id);
          localStorage.setItem("cgpa_pwd", users.Password);
          localStorage.setItem("password_page","false");
          localStorage.setItem("cgpa_page","true");
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
  window.open(`https://wa.me/919659245977?text=Hi_Gokulraja_My_Register_Number_Is_${localStorage.getItem("regNo")}_Send_Me_The_Password`);
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
 <div class="content">
      <div class="text">WELCOME</div>
      <div class="text"> {localStorage.getItem(`regNo`)} </div>

      <form onSubmit={verify}>
          <div class="field">
              <span class="bx bxs-key"></span>
              <input placeholder="Password" type='password' onChange={(e) => {setPassword(e.target.value);}} required/>
          </div>

        <button className="button1" type="submit">Verify</button>
        <p className="text_error">{error}</p>
        <p className="text_error" onClick={forget}>Forget Password ?</p>
        

      </form>
      
      <div class="drak-light" onClick={mood}>
          <i class="bx bx-moon moon"></i>
          <i class="bx bx-sun sun"></i>
      </div>
  </div>

  </div>



  );
}
