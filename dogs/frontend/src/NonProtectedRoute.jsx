import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NonProtectedRoute = ({ children }) => {
  const userToken = sessionStorage.getItem('user-token');
  const [, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (userToken) {
      setIsLoggedIn(true)
    }
  }, [userToken])
const navigate = useNavigate()
  if (!userToken) {
    // user is not authenticated
    return children;
  }
  return navigate(-1);
};