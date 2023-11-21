import React from "react";
import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { NonProtectedRoute } from "./NonProtectedRoute";
import Adopt from "./pages/adopt";
import Login from "./auth/login";
import Signup from "./auth/signup";
import PetServices from "./pages/petservices";
import Volunteer from "./pages/volunteer";
import Donate from "./pages/donate";
import Notfound from "./components/notfound";
import MeetAVet from "./pages/meet-vet";
import Home from "./pages/home";
import AdoptForm from "./modules/adopt-form";
import ForgotPassword from "./auth/forgotPassword";
import ResetPasswordLink from "./auth/resetpasswordLink";

function App() {
    return (
        <React.Fragment>
           <Routes>
           <Route path='/passwordResetLink' element={
            <NonProtectedRoute>
            <ResetPasswordLink />
            </NonProtectedRoute>
            } />
             <Route path="/resetPassword" element={
            <NonProtectedRoute>
            <ForgotPassword />
            </NonProtectedRoute>
            } />
           <Route path='' element={
            <NonProtectedRoute>
            <Notfound />
            </NonProtectedRoute>
            } />
            <Route path='/login' element={
            <NonProtectedRoute>
            <Login />
            </NonProtectedRoute>
            } />
            <Route path='/signup' element={
            <NonProtectedRoute>
            <Signup />
            </NonProtectedRoute>
            } />
             <Route
                path="/adopt"
                element={
                <ProtectedRoute>
                    <Adopt />
                </ProtectedRoute>
                }
            />
           
             <Route
                path="/adopt/form"
                element={
                <ProtectedRoute>
                    <AdoptForm />
                </ProtectedRoute>
                }
            />
             <Route
                path="/home"
                element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
                }
            />
             <Route
                path="/pet-services"
                element={
                <ProtectedRoute>
                    <PetServices />
                </ProtectedRoute>
                }
            />
             <Route
                path="/donate"
                element={
                <ProtectedRoute>
                    <Donate />
                </ProtectedRoute>
                }
            />
            <Route
                path="/volunteer"
                element={
                <ProtectedRoute>
                    <Volunteer />
                </ProtectedRoute>
                }
            />
            <Route
                path="/meetvet"
                element={
                <ProtectedRoute>
                    <MeetAVet />
                </ProtectedRoute>
                }
            />
            </Routes>
        </React.Fragment>
    );
}
export default App;