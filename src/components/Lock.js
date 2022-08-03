import React from "react";
import "./CSS.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs,  updateDoc, doc } from "firebase/firestore";

export default function Lock() {
  let navigate = useNavigate();








  const usersCollectionRef = collection(db, "cgpa");
  const [users, setUsers] = useState([]);
  const [regNo, setregNo] = useState();

  function checking() {
    // alert("Server under maintenance click ok to use the standard version");
window.location.replace("https://gokulrajalp.github.io/cgpa/");
    
    if (localStorage.getItem("authentication") === "true"){
      let password = localStorage.getItem("cgpa_pwd");
      let key = localStorage.getItem("regNo");
   
      users.forEach((users) => {
        if (key === users.regNo) {
          if (password === users.Password) {
            localStorage.setItem("signin_page","false");
            localStorage.setItem("password_page","false");
            localStorage.setItem("cgpa_page","true");
            const userDoc = doc(db, "cgpa", users.id);
            const newFields = { cgpa_page: true };
            updateDoc(userDoc, newFields);
            navigate(`/cgpa`);
          }}});
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);


  useEffect(() => {
    checking();
  }, [users]);


  
  
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
    users.forEach((users) => {
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
 <div class="content">
      <div class="text">WELCOME</div>

      <form onSubmit={verify}>
          <div class="field">
              <span class="bx bxs-user"></span>
              <input placeholder="Register Number"  type="number" id="regNo" name="fname" onChange={(e) => {setregNo(e.target.value);}} required/>
          </div>

        <button className="button1" type="submit">Verify</button>

      </form>
      
      <div class="drak-light" onClick={mood}>
          <i class="bx bx-moon moon"></i>
          <i class="bx bx-sun sun"></i>
      </div>
  </div>

  </div>



//         {/* {users.map((users)=>{
//     return <div><h1>name : {users.regNo}</h1><h1>type : {users.mail}</h1><h1>{regNo} = {users.regNo}</h1></div>
// })} */}

  );
}