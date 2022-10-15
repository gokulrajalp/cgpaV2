import React from "react";
import { useState, useEffect } from "react";

import "./glass.css";
import { useAuth } from "./Data";

export default function Admin(){

  let Data=useAuth(); 
  // const [users, setUsers] = useState([]);
  const [verify, setVerify] = useState();
//   let navigate = useNavigate();
  // const usersCollectionRef = collection(db, "cgpa");

    

function checking(){
  let pwd = prompt("Hi Gokulraja, Enter Your Password");
  Data.users.forEach((users) => {
        if ("rrZgwiys4TX60pIMazMJ" === users.id) {
          alert("yes");
            if(pwd===users.password){
              alert("Correct");
            }
            else{
              alert("Password is wrong try again");
              window.location.reload(false);
            }
        }
  });
}


      useEffect(()=>{
        
      checking();
      },[verify])


return(<div>
{Data.users.map((user,index)=>{
  
   return <div key={index}>
        <table>
            <tr>
                <td>{user.regNo}</td>
                <td>{user.name}</td>
                <td>{user.mail}</td>
                <td>{user.Password}</td>
                <td>{user.id}</td>
                <td>{user.sgpalist}</td>
                {/* {Data.user.sgpalist.map((element,i)=>{
                  return(
                  <div key={i}><td >{element}</td></div>
                  )
                })} */}
            </tr>
</table>
</div>
    
})}
{/* 
{users.map((user)=>{
    return <table>
    <tr>
        <td>{(user.regNo>=1913001&&user.regNo<=1913060)?user.regNo:""}</td>
    </tr>
    </table>
    })} */}
{/* {console.log(Data.users)} */}

{Data.users.map((user)=>{
    return <table>
    <tr>
        <td>{(user.regNo>=1913001&&user.regNo<=1913060)?user.regNo:""}</td>
    </tr>
    </table>
    })}

</div>);
}