import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import "./CSS.css";
import { useAuth } from "./Data";
import { async } from "@firebase/util";


export default function EditName() {
  let navigate = useNavigate();
  let Data=useAuth(); 
  // const usersCollectionRef = collection(db, "cgpa");
  // const [users, setUsers] = useState([]);
  const [password, setPassword] = useState();
  const [name, setName] = useState();


  // if(check){
  //   localStorage.removeItem('editname');
  //   localStorage.setItem("reloadonce","true");
  //   navigate('/cgpa')}



  const [error, setError] = useState();
  // const [id, setId] = useState();

  // const [check, setCheck] = useState(false);

  // useEffect(() => {
    
  //   if(localStorage.getItem("editname")!=="true"){
  //     navigate('/cgpa');
  //    }
  // }, []);



  // async function update(){
  
  //             const userDoc = doc(db, "cgpa", id);
  //             const newFields = { name : name };
  //             updateDoc(userDoc, newFields);
              
  
  // }



  // useEffect(()=>{

  //   const up = async ()=>{
  //     if(check){
  //     alert("start")
  //     const up = await update();
  //     alert("end");
  //   }  
  //   }

  //   up()
    
  // // if(check){
  // //   localStorage.removeItem('editname');
  // //   localStorage.setItem("reloadonce","true");
  // //   navigate('/cgpa')
  // // }

  // },[check])



function verify() {
    // alert("triggered")
    if(name.length>=3){
    var key = localStorage.getItem("regNo");
    Data.users.forEach((users) => {
      if (key === users.regNo) {
        if (password === users.Password) {
          // setCheck(true);
          // alert(check)
            // alert("Name changed successfully");
            // setId()
            
    //         localStorage.removeItem('editname');
    // localStorage.setItem("reloadonce","true");
    // navigate('/cgpa')


    const update = async() => {
      const userDoc = doc(db, "cgpa", users.id);
      const newFields = { name : name };
      const res = await updateDoc(userDoc, newFields);
      localStorage.removeItem('editname');
    localStorage.setItem("reloadonce","true");
    navigate('/cgpa')
      
  }
 
          update(); 
  
    

            
        } else {
          setError("This is not a valid password");
        }
      }
    });
    }else{
      setError("Name is not Valid");
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
      <div className="text">Edit your Name</div>
      <div className="text"> {localStorage.getItem(`regNo`)} </div>

      <form onSubmit={verify}>
          <div className="field">
              <span className="bx bxs-key"></span>
              <input placeholder="Current Password *" type='password' onChange={(e) => {setPassword(e.target.value);}} required/>
          </div>

          

          <div className="field" >
              <span className="bx bxs-user"></span>
              <input placeholder="Name *" type='text' onChange={(e) => {setName(e.target.value);}} required/>
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