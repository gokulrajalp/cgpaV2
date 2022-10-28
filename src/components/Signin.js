import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "./CSS.css";


export default function Sign() {
 
  const [name, setName] = useState();

  const [mail, setmail] = useState();
  // window.location.replace("https://gokulrajalp.github.io/cgpa/");
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [regNo] = useState(localStorage.getItem(`regNo`));

  let navigate = useNavigate();


  useEffect(() => {
   if(localStorage.getItem("signin_page")==="true"){
 
   }else{
    navigate(`/`);
   }
  }, []);




  
  function remove() {
    if(window.confirm(`Click OK to edit ${localStorage.getItem("regNo")}`)===true){
      localStorage.removeItem("regNo");
      navigate("/");
    }
    
  }

  function store() {

    if (password !== confirmPassword) {
      alert("Confirm Password is not match to password");
      return;
    }

    let grade = [];
    let sgpalist = [];
    let cgpalist = [];

    const usersCollectionRef = collection(db, "cgpa");
    const createusers = async () => {
      await addDoc(usersCollectionRef, {
        name: name,
        Password: password,
        mail: mail,
        regNo: regNo,
        grade: grade,
        sgpalist: sgpalist,
        cgpalist: cgpalist,
        cgpa_page: false,
      });
    };

    createusers();
    localStorage.setItem("password_page","true");
    localStorage.setItem("signin_page","false");
    navigate("/password");
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
    // <div>
    //   <div className="container">
    //     <h1>Welcome to the CGPA Calculater</h1>
    //     <>{regNo}</>
    //     <button onClick={remove}>change and delete this Register Number</button>
    //     <br />
    //     <br />

    //     <h3>Name *</h3>
        // <input
        //   className="name"
        //   onChange={(e) => {
        //     setName(e.target.value);
        //   }}
        // />

    //     <div className="mail">
    //       <h3>Mail *</h3>
    //       <input
    //         className="mail_value"
    //         onChange={(e) => {
    //           setmail(e.target.value);
    //         }}
    //       />
    //     </div>

    //     <h3>New Password *</h3>
    //     <input
    //       className="password"
    //       type={"password"}
    //       onChange={(e) => {
    //         setPassword(e.target.value);
    //       }}
    //     />
    //     <h3>Confirm Password *</h3>
    //     <input
    //       className="confirm"
    //       type={"password"}
    //       onChange={(e) => {
    //         setconfirmPassword(e.target.value);
    //       }}
    //     />

    //     <button onClick={store}>Submit</button>
    //   </div>
    // </div>

    <div className="rootDiv">
 <div className="content">
      <div className="text">WELCOME</div>

      <form onSubmit={store}>

      <div className="field">
              <span className="bx bxs-id-card"></span>
              <input value = {localStorage.getItem(`regNo`)} onClick={remove} required/>
          </div>

          <div className="field">
              <span className="bx bxs-user"></span>
              <input placeholder="Name" onChange={(e) => {setName(e.target.value);}} required/>
          </div>

              <div className="field">
                <span className="bx bxs-envelope"></span>
                <input placeholder="Mail ID" type="email" onChange={(e) => {setmail(e.target.value);}} required/>
              </div>

              <div className="field">
                <span className="bx bxs-key"></span>
                <input placeholder="New Password" type="password" onChange={(e) => {setPassword(e.target.value);}} required/>
                </div>

              <div className="field">
              <span className="bx bxs-key"></span>
                <input placeholder="Confirm Password" type="password" onChange={(e) => {setconfirmPassword(e.target.value);}} required/>
                </div>

        <button className="button1" type="submit">Submit</button>

      </form>
      
      <div className="drak-light" onClick={mood}>
          <i className="bx bx-moon moon"></i>
          <i className="bx bx-sun sun"></i>
      </div>
  </div>

  </div>
  );
}
