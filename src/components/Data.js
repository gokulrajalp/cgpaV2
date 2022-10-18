import { createContext } from 'react';
import React, { useContext,useState,useEffect } from "react"
import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebase-config";


const AuthContext=createContext(null);
const usersCollectionRef = collection(db, "cgpa");


export const AuthProvider=({children})=> {


    
    const[users,setUsers]=useState([]);

    useEffect(() => {
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
  
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getUsers();
    }, []);




  return (

    // DataContext.Provider is providing user with the help of value attribute to all the chilren in app.js and it is sent with the help of useAuth()..
        <AuthContext.Provider value={{users}}>
            {children}
        </AuthContext.Provider>
  )
}


// Data function is used to give access of user,login ,logout object to any component whomever wants to use it for authentication
// usecontext is used when we want to share the state variable among different components..

export const useAuth=()=>{
    return useContext(AuthContext); 
}
