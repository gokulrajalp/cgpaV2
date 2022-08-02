import React from "react";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs} from "firebase/firestore";
import "./glass.css";


export default function Admin(){


  const [users, setUsers] = useState([]);
  const [verify, setVerify] = useState();
//   let navigate = useNavigate();
  const usersCollectionRef = collection(db, "cgpa");

    useEffect(() => {
          
         const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));   
         }; 
        getUsers();
         
        
      }, []);

function checking(){
  let pwd = prompt("Hi Gokulraja, Enter Your Password");
  users.forEach((users) => {
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
{users.map((users,index)=>{
  
   return <div key={index}>
        <table>
            <tr>
                <td>{users.regNo}</td>
                <td>{users.name}</td>
                <td>{users.mail}</td>
                <td>{users.Password}</td>
                <td>{users.sgpalist}</td>
                {/* {af.map((element)=>{
                  <td >{element}</td>
              
                })} */}
            </tr>
</table>
</div>
    
})}

{users.map((user)=>{
    return <table>
    <tr>
        <td>{(user.regNo>=1913001&&user.regNo<=1913060)?user.regNo:""}</td>
    </tr>
    </table>
    })}


{users.map((user)=>{
    return <table>
    <tr>
        <td>{(user.regNo>=1913001&&user.regNo<=1913060)?user.regNo:""}</td>
    </tr>
    </table>
    })}

</div>);
}