import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const NotFound = ()=>{
    const userToken = sessionStorage.getItem('user-token');
    const [, setIsLoggedIn] = useState(false);
    useEffect(() => {
      if (userToken) {
        setIsLoggedIn(true)
      }
    }, [userToken])
  
    if (!userToken) {
      // user is not authenticated
      return <Navigate to="/login" />;
    }
    return <Navigate to="/adopt" />; 
}
export default NotFound