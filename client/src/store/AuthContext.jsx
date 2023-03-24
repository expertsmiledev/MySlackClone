import { createContext, useState } from "react";


export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [loginStatus, setloginStatus] = useState(false);
    // console.log(user)
    const [register,setResgister]=useState({
        username:"",
        email:"",
        password:"",
        image:""
    })
    const value={
        loginStatus,
        register,
        setloginStatus,
        setResgister,
    }
    return <authContext.Provider value={value}>{children}</authContext.Provider>

}
