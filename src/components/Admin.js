import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {utils, writeFile} from 'xlsx';
import "./glass.css";
import { useAuth } from "./Data";
import _ from 'lodash';
import { Button, Spinner } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import "./CSS.css";


export default function Admin(){
  let navigate = useNavigate();

const [Export, setExport] = useState([]);
const [buttonVisible, setButtonVisible] = useState(true);
const [loading, setLoading] = useState(false);
// const [filter,setFilter] = useState([]);


// const [inputNumbers, setInputNumbers] = useState("");
// const [numbers, setNumbers] = useState([]);
// const [fromNumber, setFromNumber] = useState();
// const [toNumber, setToNumber] = useState();
// const [NumberArray, setNumberArray] = useState("");


// const [inputValue, setInputValue] = useState("");
// const [intArray, setIntArray] = useState([]);


const [isDisabled, setIsDisabled] = useState(false);

// function handleSubmit() {
  // document.querySelector('#added').classList.remove('d-none');
  
//   const array = [];
//     for (let i = fromNumber; i <= toNumber; i++) {
//       array.push(parseInt(i));
//     }

   


// if(inputValue!==""){

//     const numbers = inputValue.split(" ").map(num => parseInt(num, 10));
//     const join = intArray.concat(numbers);
//     console.log(join)

//     setIntArray(join);
//     console.log(numbers)
//     console.log(intArray)
//     setInputValue("");

// }
// console.log(intArray)
//     // setNumberArray(array);
// // if(NumberArray===""){
// //   setNumberArray(inputNumbers);
// // }else{
// //     setNumberArray(NumberArray +" "+ inputNumbers);
// //     }
// //     setInputNumbers("");
// //     const input = NumberArray.split(" ").map(str => parseInt(str, 10));
// //   console.log(input)



//   // const num = [...array,...intArray];
//   // console.log(num)
//   setNumbers(array.concat(intArray));
//   console.log(numbers)
// }







 const [range, setRange] = useState({ from: 0, to: 0 });
  const [numbersArray, setNumbersArray] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setRange({ ...range, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  document.querySelector('#added').classList.remove('d-none');

    const newArray = [];
    if (range.from !== 0 && range.to !== 0) {
      for (let i = range.from; i <= range.to; i++) {
        newArray.push(i);
      }
    }
    const numbers = input.length > 0 ? input.split(" ").map(num => parseInt(num)) : [];
    setNumbersArray([...numbersArray, ...newArray, ...numbers]);
    setRange({ from: 0, to: 0 });
    setInput("");
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };


































  const handleExport = () => {
    console.log(Export);
    setIsDisabled(false);
  document.querySelector('#added').classList.add('d-none');
  document.querySelector('#added').classList.remove('text-success');

    const sortedData = _.sortBy(Export, 'RegisterNumber');
    const ws = utils.json_to_sheet(sortedData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, 'data.xlsx');



    // setNumbers([]);
    // setFromNumber("");
    // setToNumber("");
    // setIntArray([]);
    setExport([]);
    setNumbersArray([]);
  };



const dataload = (e)=>{

  setExport(prevExport=>[...prevExport,{"RegisterNumber":e.regNo,
  "Name":e.name,
  "Email":e.mail,
  "Sgpa-1": e.sgpalist ? e.sgpalist[0] : null,
  "Cgpa-1": e.cgpalist ? e.cgpalist[0] : null,

  "Sgpa-2": e.sgpalist ? e.sgpalist[1] : null,
  "Cgpa-2": e.cgpalist ? e.cgpalist[1] : null,

  "Sgpa-3": e.sgpalist ? e.sgpalist[2] : null,
  "Cgpa-3": e.cgpalist ? e.cgpalist[2] : null,

  "Sgpa-4": e.sgpalist ? e.sgpalist[3] : null,
  "Cgpa-4": e.cgpalist ? e.cgpalist[3] : null,

  "Sgpa-5": e.sgpalist ? e.sgpalist[4] : null,
  "Cgpa-5": e.cgpalist ? e.cgpalist[4] : null,

  "Sgpa-6": e.sgpalist ? e.sgpalist[5] : null,
  "Cgpa-6": e.cgpalist ? e.cgpalist[5] : null,

  "Sgpa-7": e.sgpalist ? e.sgpalist[6] : null,
  "Cgpa-7": e.cgpalist ? e.cgpalist[6] : null,

  "Sgpa-8": e.sgpalist ? e.sgpalist[7] : null,
  "Cgpa-8": e.cgpalist ? e.cgpalist[7] : null,

}])

}





const handleload =()=>{

  
  setIsDisabled(true);
  
  

    if(numbersArray.length===0){
      Data.users.forEach(e => {
      
      if(e.regNo){
        let Regno = 1913000;
      let firstFourDigits = parseInt(Regno.toString().substring(0, 4));

      let RegfirstFourDigits = parseInt(e.regNo.toString().substring(0, 4));

      if(firstFourDigits===RegfirstFourDigits){
        dataload(e);
      }
}});
      }
    else{
      // alert('ok to continue');
        Data.users.forEach(e => {
          // console.log(numbers.includes(parseInt(e.regNo)));
      if(numbersArray.includes(parseInt(e.regNo))){
        dataload(e);
      }
        });
    }
console.log(Export)
}


  let Data=useAuth(); 
 

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


function checking(){
  let pwd = localStorage.getItem("admin_pwd");
  Data.users.forEach((users) => {
        if ("lLbBntMgWIx43d8Kf8wV" === users.id) {
          
            if(pwd===users.password){
              
            }
            else{
              navigate('/');
              
            }
        }
  });
}


      useEffect(()=>{
        
      checking();
      },[])


const handleClick =() => {
  handleload();
  
  setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setButtonVisible(false);
  document.querySelector('#added').classList.add('text-success');
    }, 2000);
    
}



return(<div>




<div className="rootDiv">
 <div className="content">

 <div className="text">WELCOME</div>
 <div className="text">Faculty Admin</div>



 <form onSubmit={handleSubmit}>


 <div className="field">
              <span className="bx bxs-user"></span>
              <input disabled={isDisabled} type="number" name="from" value={range.from} onChange={handleChange}/>
          </div>



          <div className="field">
              <span className="bx bxs-user"></span>
              <input disabled={isDisabled} name="to" type="number" value={range.to} onChange={handleChange} />
          </div>



          <div className="field">
              <span className="bx bxs-user"></span>
              <input disabled={isDisabled} placeholder="Input Numbers" value={input} onChange={handleInput} />
          </div>

      {/* <br />
      <label>
        Input Numbers:
        <textarea type="text" onChange={handleInputChange} />
      </label>
      <br /> */}
      <button disabled={isDisabled} className="button1" type="submit">Add</button>
    </form>


<br></br>

    {/* <p className="d-none" id="added">{fromNumber} to {toNumber} and {JSON.stringify(intArray)}</p>

    <br></br> */}
{/* <p>{JSON.stringify(numbers)}</p> */}

          <p className="d-none" id="added">Register Numbers: {numbersArray.join(", ")}</p>

 {buttonVisible ? (

<Button variant="warning" onClick={handleClick} disabled={loading}>
{loading ? <Spinner animation="border" variant="light" size="sm" /> : 'Load data'}
</Button>
) : (
<Button variant="success" onClick={() => {handleExport();setButtonVisible(true);}}>Download Excel <FaDownload className="mr-2" /> </Button>
)}



{/* {
  <ul>
  {numbers.map(number => (
    <li key={number}>{number}</li>
  ))}
</ul>
} */}



      {/* <form onSubmit={verify}>
          <div className="field">
              <span className="bx bxs-key"></span>
              <input placeholder="Password" type='password' onChange={(e) => {setPassword(e.target.value);}} required/>
          </div>

        <button className="button1" type="submit">Verify</button>
        <p className="text_error">{error}</p>
        <p className="text_forget" onClick={forget}>Forget Password ?</p>
        

      </form> */}
      
      <div className="drak-light" onClick={mood}>
          <i className="bx bx-moon moon"></i>
          <i className="bx bx-sun sun"></i>
      </div>
  </div>

  </div>









</div>);
}