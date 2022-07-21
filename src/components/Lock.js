import React from "react";
import "./lock.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Lock() {
  let navigate = useNavigate();

  const usersCollectionRef = collection(db, "cgpa");
  const [users, setUsers] = useState([]);
  const [regNo, setregNo] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  function verify() {
    var check = false;
    users.forEach((users) => {
      if (regNo === users.regNo) {
        check = true;
        localStorage.setItem("regNo", users.regNo);
      }
    });

    if (check) {
      navigate("/password");
    } else {
      localStorage.setItem("regNo", regNo);
      navigate("/signin");
    }
  }

  return (
    <html>
      <body>
        <div className="container">
          <h1 className="h1">CGPA CALCULATER</h1>
          <div className="align">
            <form onSubmit={verify}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span id="basic-addon1">Enter your Register Number</span>
                </div>
                <input
                  type="number"
                  id="regNo"
                  name="fname"
                  onChange={(e) => {
                    setregNo(e.target.value);
                  }}
                ></input>
              </div>
              <br />
              <button type="submit" class="btn btn-outline-success">
                Verify
              </button>
            </form>
          </div>
        </div>

        {/* {users.map((users)=>{
    return <div><h1>name : {users.regNo}</h1><h1>type : {users.mail}</h1><h1>{regNo} = {users.regNo}</h1></div>
})} */}
      </body>
    </html>
  );
}
