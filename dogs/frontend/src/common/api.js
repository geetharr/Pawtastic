export const API_PREFIX = "http://localhost:8081/pawtasticpoohs/"
export const login = "user/login"
export const signUp = "user/add";
export const adopt = "dashboard/dogadoption"
export const volunteer = "dashboard/volunteer"
export const dogTraining = "dashboard/dogtraining"
export const dogBoarding = "dashboard/dogboarding"
export const dogGrooming = "dashboard/doggrooming"
export const doctorAppointment = 'dashboard/meetvet'
export const passwordresetLink="user/passwordResetLink/"
export const forgotpassword="user/forgotPassword/"
 
export const getHeaders = () => {
    const authToken = sessionStorage.getItem('user-token')
    return {
        "Authorization": `Bearer ${authToken}`,
        "User-Id": sessionStorage.getItem("user-id"),
        "User-Role": sessionStorage.getItem("user-role"),
    };
};