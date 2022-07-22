import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./Password.css";

export default function Signin() {
  let navigate = useNavigate();

  const usersCollectionRef = collection(db, "cgpa");
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  function verify() {
    var key = localStorage.getItem("regNo");
    users.forEach((users) => {
      if (key === users.regNo) {
        if (password === users.Password) {
          localStorage.setItem("id", users.id);

          navigate(`/cgpa`);
        } else {
          setError("This is not a valid password");
        }
      }
    });
  }

  return (
    <div>
      <form onSubmit={verify}>
        <div class="msg">
          <p id="greet">Welcome</p>
          <p id="user_name"> {localStorage.getItem(`regNo`)} </p>
        </div>
        <div class="pwd">
          <h1 class="h11">Enter your Password</h1>
          <div class="container"></div>
          <input
            id="pass"
            className="password form-control"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <p>{error}</p>
          <br></br>
          <button type="submit" class="btn btn-outline-success">
            Verify
          </button>
        </div>
        {/* <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Stay Signin in this devise
          </label>
        </div> */}
      </form>
    </div>
  );
}
