import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./glass.css";

export default function Cgpa() {
  const [sgpalist, setsgpalist] = useState([]);
  const [cgpalist, setcgpalist] = useState([]);

  function cgpa() {
    let grade = [];
    let points = [];

    function findpoint(char) {
      if (char === "O") {
        return 10;
      } else if (char === "A+") {
        return 9;
      } else if (char === "A") {
        return 8;
      } else if (char === "B+") {
        return 7;
      } else if (char === "B+") {
        return 6;
      } else {
        return 0;
      }
    }

    let credit = [
      3, 4, 3, 3, 3, 1, 1, 1, 3, 4, 3, 3, 3, 1, 1, 3, 4, 1, 3, 3, 3, 1, 1, 3, 3,
      1, 3, 4, 1, 4, 1, 3, 4, 3, 3, 3, 3, 3, 1, 1, 1, 4, 3, 3, 3, 3, 3, 1, 1, 3,
      3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 6, 0, 0, 0, 0, 0, 0,
    ];

    let score = [];

    for (let i = 0; i < 68; i++) {
      grade[i] = document.querySelector(`#subject${i + 1}`).value;
      points[i] = findpoint(grade[i]);
      score[i] = points[i] * credit[i];
    }

    let total_credit = [19, 18, 19, 23, 22, 24, 20, 15];
    let total_subject = [8, 7, 8, 9, 9, 9, 8, 4];

    function cgpa_credit(n) {
      let sum = 0;
      for (let i = 0; i <= n; i++) {
        sum += total_credit[i];
      }

      return sum;
    }

    let cgpa = 0;
    let k = 0;
    for (let i = 0; i < 8; i++) {
      let sum = 0;
      for (let j = 0; j < total_subject[i]; j++) {
        sum += score[k];
        cgpa += score[k];
        k = k + 1;
      }

      sgpalist[i] = sum / total_credit[i];
      cgpalist[i] = cgpa / cgpa_credit(i);
    }

    // sgpalist[2] = 5.5;
    // console.log(sgpalist[2]);
    // console.log(grade);
    // console.log(points);
    // console.log(credit);
    // console.log(score);
    // console.log(total_subject);
    // console.log(total_credit);
    console.log(sgpalist);
    console.log(cgpalist);
    // console.log(score.slice(23, 32));
    // console.log(credit.slice(23, 32));
  }

  let navigate = useNavigate();

  const usersCollectionRef = collection(db, "cgpa");
  const [users, setUsers] = useState([]);
  // const [password, setPassword] = useState();
  // const [error, setError] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  var regNo = localStorage.getItem("regNo");

  function logout() {
    navigate(`/`);
  }

  return (
    <div className="cgpa">
      {users.map((users) => {
        if (regNo === users.regNo) {
          let name = users.name;
          return (
            <h2 className="text-primary text-center">Welcome {name} to</h2>
          );
        }
      })}

      <h1 class="head">CGPA Calculater</h1>

      <div className="pb-5">
        <div className="first">
          <h1>Semester 1</h1>

          <div class="one">
            English – I <nav>(18EN151):</nav>{" "}
            <select onChange={cgpa} id="subject1">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Maths – I <nav>(18MA151):</nav>{" "}
            <select onChange={cgpa} id="subject2">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Chemistry <nav>(18CH051):</nav>{" "}
            <select onChange={cgpa} id="subject3">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            BEEE <nav>(18EE041):</nav>{" "}
            <select onChange={cgpa} id="subject4">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            PST <nav>(18CS111):</nav>{" "}
            <select onChange={cgpa} id="subject5">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Chemistry Lab <nav>(18CH028):</nav>{" "}
            <select onChange={cgpa} id="subject6">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            PST Lab <nav>(18CS121):</nav>{" "}
            <select onChange={cgpa} id="subject7">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            EG Lab <nav>(18AU027):</nav>{" "}
            <select onChange={cgpa} id="subject8">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
          </div>

          <h2 id="Result1">SGPA : </h2>
          <h2 id="cgpa0">CGPA : </h2>
        </div>
      </div>

      <div className="pb-5">
        <div class="second">
          <h1>Semester 2</h1>
          <div class="one">
            ENGLISH - II <nav>(18EN251):</nav>{" "}
            <select onChange={cgpa} id="subject9">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            MATHS - II <nav>(18MA243):</nav>{" "}
            <select onChange={cgpa} id="subject10">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            PHYSICS <nav>(18PH043):</nav>{" "}
            <select onChange={cgpa} id="subject11">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />C <nav>(18CS211):</nav>{" "}
            <select onChange={cgpa} id="subject12">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            MP <nav>(18GE028):</nav>{" "}
            <select onChange={cgpa} id="subject13">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            PHYSICS Lab <nav>(18PH028):</nav>{" "}
            <select onChange={cgpa} id="subject14">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />C Lab <nav>(18CS221):</nav>{" "}
            <select onChange={cgpa} id="subject15">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            EVS <nav>(18MC052):</nav>{" "}
            <select onChange={cgpa} id="subject63">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
          </div>

          <h2 id="Result2">SGPA : </h2>

          <h2 id="cgpa1">CGPA : </h2>
        </div>
      </div>

      <div className="pb-5">
        <div class="third">
          <h1>Semester 3</h1>
          <div class="one">
            LDDC <nav>(18EC332):</nav>
            <select onChange={cgpa} id="subject16">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            NCT <nav>(18MA343):</nav>
            <select onChange={cgpa} id="subject17">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            PYTHON Lab <nav>(18CS028):</nav>
            <select onChange={cgpa} id="subject18">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            PYTHON <nav>(18CS043):</nav>
            <select onChange={cgpa} id="subject19">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            DATA STRUCTURES <nav>(18CS311):</nav>
            <select onChange={cgpa} id="subject20">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            COA <nav>(18CS312):</nav>
            <select onChange={cgpa} id="subject21">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            DATA STRUCTURES Lab <nav>(18CS321):</nav>
            <select onChange={cgpa} id="subject22">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            DIGITAL SYSTEMS Lab <nav>(18EC325):</nav>
            <select onChange={cgpa} id="subject23">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            COI <nav>(18MC051):</nav>{" "}
            <select onChange={cgpa} id="subject64">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            CDS - I <nav>(18HR351):</nav>{" "}
            <select onChange={cgpa} id="subject65">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
          </div>

          <h2 id="Result3">SGPA : </h2>

          <h2 id="cgpa2">CGPA : </h2>
        </div>
      </div>
      <div className="pb-5">
        <div class="fourth">
          <h1>Semester 4</h1>
          <div class="one">
            JP <nav>(18CS002):</nav>
            <select onChange={cgpa} id="subject24">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            OS <nav>(18CS003):</nav>
            <select onChange={cgpa} id="subject25">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            MP AND MC Lab <nav>(18EC425):</nav>
            <select onChange={cgpa} id="subject26">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            MP AND MC <nav>(18EC436):</nav>
            <select onChange={cgpa} id="subject27">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            PDM <nav>(18MA441):</nav>
            <select onChange={cgpa} id="subject28">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            OS Lab <nav>(18CS422):</nav>
            <select onChange={cgpa} id="subject29">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            DAA <nav>(18CS412):</nav>
            <select onChange={cgpa} id="subject30">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            JP Lab <nav>(18CS421):</nav>
            <select onChange={cgpa} id="subject31">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            SE <nav>(18CS411):</nav>
            <select onChange={cgpa} id="subject32">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            CDS - II <nav>(18HR432):</nav>{" "}
            <select onChange={cgpa} id="subject66">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
          </div>

          <h2 id="Result4">SGPA : </h2>

          <h2 id="cgpa3">CGPA : </h2>
        </div>
      </div>
      <div className="pb-5">
        <div class="fiveth">
          <h1>Semester 5</h1>
          <div class="one">
            TOC <nav>(18CS511):</nav>
            <select onChange={cgpa} id="subject33">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            DBMS <nav>(18CS512):</nav>
            <select onChange={cgpa} id="subject34">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            WP <nav>(18CS513):</nav>
            <select onChange={cgpa} id="subject35">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            CN <nav>(18CS514):</nav>
            <select onChange={cgpa} id="subject36">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            ED <nav>(18HS003):</nav>
            <select onChange={cgpa} id="subject37">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Elective-I{" "}
            <select onChange={cgpa} id="subject38">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            DBMS Lab <nav>(18CS521):</nav>
            <select onChange={cgpa} id="subject39">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Web & Open Source Lab <nav>(18CS522):</nav>
            <select onChange={cgpa} id="subject40">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            CN Lab <nav>(18CS523):</nav>
            <select onChange={cgpa} id="subject41">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            CDS - III <nav>(18HR533):</nav>
            <select onChange={cgpa} id="subject67">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
          </div>

          <h2 id="Result5">SGPA : </h2>

          <h2 id="cgpa4">CGPA : </h2>
        </div>
      </div>
      <div className="pb-5">
        <div class="sixth">
          <h1>Semester 6</h1>
          <div class="one">
            PCD <nav>(18CS611):</nav>
            <select onChange={cgpa} id="subject42">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            MC <nav>(18CS612):</nav>
            <select onChange={cgpa} id="subject43">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            ST <nav>(18CS613):</nav>
            <select onChange={cgpa} id="subject44">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Elective - II{" "}
            <select onChange={cgpa} id="subject45">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Elective - III{" "}
            <select onChange={cgpa} id="subject46">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Open Elective - I{" "}
            <select onChange={cgpa} id="subject47">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            CT LAB <nav>(18CS621):</nav>
            <select onChange={cgpa} id="subject48">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            ST Lab <nav>(18CS622):</nav>
            <select onChange={cgpa} id="subject49">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Mini Project <nav>(18CS623):</nav>
            <select onChange={cgpa} id="subject50">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            CDS - IV <nav>(18HR634):</nav>
            <select onChange={cgpa} id="subject68">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
          </div>

          <h2 id="Result6">SGPA : </h2>

          <h2 id="cgpa6">CGPA : </h2>
        </div>
      </div>
      <div className="pb-5">
        <div class="seventh">
          <h1>Semester 7</h1>
          <div class="one">
            PE <nav>(18HS051):</nav>
            <select onChange={cgpa} id="subject51">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            BD and CC <nav>(18CS711):</nav>
            <select onChange={cgpa} id="subject52">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            CNS <nav>(18CS712):</nav>
            <select onChange={cgpa} id="subject53">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            GM <nav>(18CS713):</nav>
            <select onChange={cgpa} id="subject54">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Elective - IV{" "}
            <select onChange={cgpa} id="subject55">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Open Elective - II{" "}
            <select onChange={cgpa} id="subject56">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            BD and CC Lab <nav>(18CS412):</nav>
            <select onChange={cgpa} id="subject57">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            GM Lab <nav>(18CS421):</nav>
            <select onChange={cgpa} id="subject58">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
          </div>

          <h2 id="Result7">SGPA : </h2>

          <h2 id="cgpa7">CGPA : </h2>
        </div>
      </div>
      <div className="pb-5">
        <div class="eighth">
          <h1>Semester 8</h1>
          <div class="one">
            Elective – V{" "}
            <select onChange={cgpa} id="subject59">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Elective – VI{" "}
            <select onChange={cgpa} id="subject60">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Open Elective - III
            <select onChange={cgpa} id="subject61">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Project Work <nav>(18CS821):</nav>
            <select onChange={cgpa} id="subject62">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
          </div>

          <h2 id="Result8">SGPA : </h2>

          <h2 id="cgpa8">CGPA : </h2>
        </div>
      </div>
      <button
        onClick={logout}
        className="btn btn-outline-success mt-3 me-3 right"
        type="submit"
      >
        Logout
      </button>
    </div>
  );
}
