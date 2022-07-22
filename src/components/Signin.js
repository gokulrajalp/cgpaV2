import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "./signin.css";

export default function Sign() {
  const [name, setName] = useState();

  const [mail, setmail] = useState();

  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [regNo] = useState(localStorage.getItem(`regNo`));

  let navigate = useNavigate();
  function remove() {
    localStorage.removeItem(`${localStorage.getItem("current")}`);
    navigate("/");
  }

  function store() {
    if (!name) {
      alert("enter the name");
      return;
    }

    if (!mail) {
      alert("enter the mail");
      return;
    }

    if (password !== confirmPassword) {
      alert("enter the password and confirm password");
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
      });
    };

    createusers();

    navigate("/password");
  }

  return (
    <div>
      <div className="container">
        <h1>Welcome to the CGPA Calculater</h1>
        <>{regNo}</>
        <button onClick={remove}>change and delete this Register Number</button>
        <br />
        <br />

        <h3>Name *</h3>
        <input
          className="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <div className="mail">
          <h3>Mail *</h3>
          <input
            className="mail_value"
            onChange={(e) => {
              setmail(e.target.value);
            }}
          />
        </div>

        <h3>New Password *</h3>
        <input
          className="password"
          type={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <h3>Confirm Password *</h3>
        <input
          className="confirm"
          type={"password"}
          onChange={(e) => {
            setconfirmPassword(e.target.value);
          }}
        />

        <button onClick={store}>Submit</button>
      </div>
    </div>
  );
}
