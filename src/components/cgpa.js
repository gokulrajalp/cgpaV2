import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import "./glass.css";
import { useAuth } from "./Data";
// import $ from "jquery";

export default function Cgpa() {
let Data=useAuth(); 
  const [sgpalist, setSgpalist] = useState([]);
  const [cgpalist, setCgpalist] = useState([]);

  const [passwordTemp, setPasswordTemp] = useState();


  const [num, setNum] = useState(0);

  function editname(){
    navigate('/editname');
  }

  function editemail(){
    navigate('/editemail');
  }

  function editpassword(){
    navigate('/editpassword');
  }


  let elective = [{title:"Professional Elective – I"},
  {title:"Professional Elective – II"},
  {title:"Professional Elective – III"},
  {title:"Open Elective – I"},
  {title:"Professional Elective – IV"},
  {title:"Open Elective – II"}]

  let electivesub = [["Open Source Technologies - 18CS563", "Data Warehousing and Data Mining - 18CS564"],
  ["Object Oriented Analysis and Design - 18CS662", "Machine Learning Techniques - 18CS665"],
  ["Green Computing - 18CS667", "Ad hoc and Sensor Networks - 18CS669"],
  ["Agile Software Development - 18CS666", ".Net Framework Technologies - 18CS091"],
  ["IBM"],
  ["High Speed Networks - 18CS763", "Business Intelligence - 18CS766"]]


 

  let navigate = useNavigate();

  // const usersCollectionRef = collection(db, "cgpa");

  // const [users, setUsers] = useState([]);
  const [modify, setModify] = useState(false);
  const [temp, setTemp] = useState();

  function render() {
    Data.users.forEach((users) => {
      if (localStorage.getItem("id") === users.id) {
        // alert(localStorage.getItem("cgpa_pwd"));
        // alert(users.Password);
        // alert(localStorage.getItem("cgpa_pwd")===users.Password);
        if(localStorage.getItem("cgpa_pwd")===users.Password && localStorage.getItem("regNo")===users.regNo){
        // if(!users.cgpa_page){
        //   navigate(`/`);
        // }
        let grade = users.grade;
        let i = 1;
        setCgpalist(users.cgpalist);
        setSgpalist(users.sgpalist);
        grade.forEach((element) => {
          document.querySelector(`#subject${i}`).value = element;
          i = i + 1;
        });
      }else{
        navigate(`/`);
      }
    }
    });
  }



  useEffect(() => {
    // alert("aathu")
    if(localStorage.getItem("cgpa_page")==="true"){
      if(localStorage.getItem("reloadonce")==="true"){
        localStorage.setItem("reloadonce","false");
        window.location.reload();
      }
     }else{
      // alert("ithu")
      navigate('/');
     }
  }, []);


  useEffect(() => {
    if(modify){
        cgpa();
    }
  
  }, [temp]);

  useEffect(() => {
    render();
  
  }, [Data.users]);

  let regNo = localStorage.getItem("regNo");


  let id = localStorage.getItem("id");
 
  function print(){
    window.print();
  }



  function cgpa() {
    

    if(!modify){
      // let myModal = new bootstrap.Modal(document.getElementById('ask'), {});
      // myModal.show();
      // $('#ask').modal('show');
    let password = prompt("Enter your Password to make any changes");

    Data.users.map((users) => {
      if (regNo === users.regNo) {
        if(password===users.Password){
          setModify(true);
          setTemp(true);
        }
        else{
          alert("Password is wrong try again");
          window.location.reload(false);
        }
      }
    })
  }
 

  if(modify){
  

    let Cgpalist = [];
    let Sgpalist = [];
    let grade = [];
    let points = [];

    let credit = [
      3, 4, 3, 3, 3, 1, 1, 1, 3, 4, 3, 3, 3, 1, 1, 3, 4, 1, 3, 3, 3, 1, 1, 3, 3,
      1, 3, 4, 1, 4, 1, 3, 4, 3, 3, 3, 3, 3, 1, 1, 1, 4, 3, 3, 3, 3, 3, 1, 1, 3,
      3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 6, 0, 0, 0, 0, 0, 0,
    ];

    let total_subject = [8, 7, 8, 9, 9, 9, 8, 4];

    function findpoint(char, i) {
      if (char === "O") {
        return 10;
      } else if (char === "A+") {
        return 9;
      } else if (char === "A") {
        return 8;
      } else if (char === "B+") {
        return 7;
      } else if (char === "B") {
        return 6;
      } else {
        credit[i] = 0;
        return 0;
      }
    }

    let score = [];

    for (let i = 0; i < 68; i++) {
      grade[i] = document.querySelector(`#subject${i + 1}`).value;
      points[i] = findpoint(grade[i], i);
      score[i] = points[i] * credit[i];
    }

    function cgpa_credit(n) {
      let sum = 0;
      for (let i = 0; i < n; i++) {
        sum += credit[i];
      }
      return sum;
    }

    let cgpa = 0;
    let k = 0;

    for (let i = 0; i < 8; i++) {
      let sum = 0;

      let sgpa = 0;
      for (let j = 0; j < total_subject[i]; j++) {
        sum += score[k];
        cgpa += score[k];
        sgpa += credit[k];
        k = k + 1;
      }

      Sgpalist[i] = (sum / sgpa).toFixed(3);
      Cgpalist[i] = (cgpa / cgpa_credit(k)).toFixed(3);

      setSgpalist(Sgpalist);
      setCgpalist(Cgpalist);
    const userDoc = doc(db, "cgpa", id);
    const newFields = { grade: grade, sgpalist: Sgpalist, cgpalist: Cgpalist };
    updateDoc(userDoc, newFields);
    }

    // console.log(points);
    // console.log(credit);
    // console.log(score);
    // console.log(total_subject);
    // console.log(total_credit);
    // console.log(Sgpalist);
    // console.log(Cgpalist);
    // console.log(score.slice(23, 32));
    // console.log(credit.slice(23, 32));
  }
  }

 function save(){
  localStorage.setItem("cgpa_page","true");
  localStorage.setItem("authentication","true");
  navigate('/');
 }
 
 function clear(){
  localStorage.clear();
  const userDoc = doc(db, "cgpa", id);
  // const newFields = { cgpa_page: false };
  // updateDoc(userDoc, newFields);
  navigate(`/`);
}




  return (
    <div className="cgpa">
      {Data.users.map((users) => {
        if (regNo === users.regNo) {
          let name = users.name;
          return (
            <h2 className="text-primary text-center" key="{users}">
              Welcome {name} to
            </h2>
          );
        }
      })}

      <h1 className="head">CGPA Calculator</h1>

      <div className="pb-5">
        <div className="first">
          <h1>Semester 1</h1>
          <div className="one">
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
            EG Lab <nav>(18AU027):</nav>{" "}
            <select onChange={cgpa} id="subject8">
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
          </div>

          <h2 id="Result1">SGPA : {sgpalist[0]} </h2>
          <h2 id="cgpa0">CGPA : {cgpalist[0]} </h2>
        </div>
      </div>

      <div className="pb-5">
        <div className="second">
          <h1>Semester 2</h1>
          <div className="one">
            C <nav>(18CS211):</nav>{" "}
            <select onChange={cgpa} id="subject12">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            English - II <nav>(18EN251):</nav>{" "}
            <select onChange={cgpa} id="subject9">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Maths - II <nav>(18MA243):</nav>{" "}
            <select onChange={cgpa} id="subject10">
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
            Physics <nav>(18PH043):</nav>{" "}
            <select onChange={cgpa} id="subject11">
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
            Physics Lab <nav>(18PH028):</nav>{" "}
            <select onChange={cgpa} id="subject14">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
          </div>

          <h2 id="Result2">SGPA : {sgpalist[1]} </h2>

          <h2 id="cgpa1">CGPA : {cgpalist[1]} </h2>
        </div>
      </div>

      <div className="pb-5">
        <div className="third">
          <h1>Semester 3</h1>
          <div className="one">
            Python <nav>(18CS043):</nav>
            <select onChange={cgpa} id="subject19">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Data Structures <nav>(18CS311):</nav>
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
            Python Lab <nav>(18CS028):</nav>
            <select onChange={cgpa} id="subject18">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Data Structures Lab <nav>(18CS321):</nav>
            <select onChange={cgpa} id="subject22">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            Digital Systems Lab <nav>(18EC325):</nav>
            <select onChange={cgpa} id="subject23">
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
          </div>

          <h2 id="Result3">SGPA : {sgpalist[2]} </h2>

          <h2 id="cgpa2">CGPA : {cgpalist[2]} </h2>
        </div>
      </div>
      <div className="pb-5">
        <div className="fourth">
          <h1>Semester 4</h1>
          <div className="one">
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

          <h2 id="Result4">SGPA : {sgpalist[3]} </h2>

          <h2 id="cgpa3">CGPA : {cgpalist[3]} </h2>
        </div>
      </div>
      <div className="pb-5">
        <div className="fiveth">
          <h1>Semester 5</h1>
          <div className="one">
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
            PE - I (OST or DWM) <nav className="click" onClick={()=>{setNum(0)}} data-bs-toggle="modal" data-bs-target="#elective">Click&view:</nav>
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

          <h2 id="Result5">SGPA : {sgpalist[4]} </h2>

          <h2 id="cgpa4">CGPA : {cgpalist[4]} </h2>
        </div>
      </div>
      <div className="pb-5">
        <div className="sixth">
          <h1>Semester 6</h1>
          <div className="one">
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
            PE - II (OOAD or MLT) <nav className="click" onClick={()=>{setNum(1)}} data-bs-toggle="modal" data-bs-target="#elective">Click&view:</nav>
            <select onChange={cgpa} id="subject45">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            PE - III (GC or Ad hoc) <nav className="click" onClick={()=>{setNum(2)}} data-bs-toggle="modal" data-bs-target="#elective">Click&view:</nav>
            <select onChange={cgpa} id="subject46">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            OE - I (Agile or .Net) <nav className="click" onClick={()=>{setNum(3)}} data-bs-toggle="modal" data-bs-target="#elective">Click&view:</nav>
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

          <h2 id="Result6">SGPA : {sgpalist[5]} </h2>

          <h2 id="cgpa6">CGPA : {cgpalist[5]} </h2>
        </div>
      </div>
      <div className="pb-5">
        <div className="seventh">
          <h1>Semester 7</h1>
          <div className="one">
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
            PE - IV (IBM) <nav className="click" onClick={()=>{setNum(4)}} data-bs-toggle="modal" data-bs-target="#elective">Click&view:</nav>
            <select onChange={cgpa} id="subject55">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            OE - II (HSN or BI) <nav className="click" onClick={()=>{setNum(5)}} data-bs-toggle="modal" data-bs-target="#elective">Click&view:</nav>
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

          <h2 id="Result7">SGPA : {sgpalist[6]} </h2>

          <h2 id="cgpa7">CGPA : {cgpalist[6]} </h2>
        </div>
      </div>
      <div className="pb-5">
        <div className="eighth">
          <h1>Semester 8</h1>
          <div className="one">
            E – V{" "}
            <select onChange={cgpa} id="subject59">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            E – VI{" "}
            <select onChange={cgpa} id="subject60">
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>RA-F</option>
            </select>
            <br />
            OE - III
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

          <h2 id="Result8">SGPA : {sgpalist[7]} </h2>

          <h2 id="cgpa8">CGPA : {cgpalist[7]} </h2>
        </div>
      </div>

      {/* <button
        onClick={logout}
        className="btn btn-outline-success mt-3 me-3 right"
        type="submit"
      >
        Logout
      </button> */}


<button onClick={print} className="btn btn-info bottom"><span className='icon-print'></span></button>



<button type="button" className="btn btn-danger right" data-bs-toggle="modal" data-bs-target="#exampleModal">
<span className='icon'></span>
</button>

{/* <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#ask">
<span className='icon'></span>
</button> */}

<button type="button" className="btn btn-success right-buttom" data-bs-toggle="modal" data-bs-target="#edit">
<span className='icon-edit'></span>
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Logout</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <button type="button" className="btn btn-success" onClick={save} data-bs-dismiss="modal">Save login info</button>
        <button type="button" className="btn btn-danger float-end" onClick={clear} data-bs-dismiss="modal">Don't Save login info</button>
      </div>
      
    </div>
  </div>
</div>




<div className="modal fade" id="edit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Personal Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex justify-content-around">
        <button type="button" className="btn btn-success" onClick={editname} data-bs-dismiss="modal">Edit Name</button>
        <button type="button" className="btn btn-success " onClick={editemail} data-bs-dismiss="modal">Edit Email</button>
        <button type="button" className="btn btn-success " onClick={editpassword} data-bs-dismiss="modal">Edit Password</button>
      </div>
      
    </div>
  </div>
</div>





<div class="modal fade" id="ask" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Enter your Password to make any changes</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="input-group flex-nowrap">
  <span class="input-group-text" id="addon-wrapping"><span className="bx bxs-key"></span></span>
  <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => {setPasswordTemp(e.target.value);}} required/>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
      </div>
    </div>
  </div>
</div>






<div className="modal fade" id="elective" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{elective[num].title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {electivesub[num].map((ele)=>{
          return(
            <div>{ele}</div>
          )
        })}
      </div>
    </div>
  </div>
</div>






    </div>
  );
}
