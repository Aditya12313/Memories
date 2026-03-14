import { signupuser, loginuser, googleLoginUser } from "../Api";

export const signup=(formData, navigate)=>async (dispatch)=>{
    try {
        const {data}=await signupuser(formData);
        localStorage.setItem("token",data.jwtToken);
        dispatch({
            type:"SIGNUP",
            payload:data
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
export const login=(formData, navigate)=>async (dispatch)=>{
    try {
        const {data}=await loginuser(formData);
        localStorage.setItem("token",data.jwtToken);
        dispatch({
            type:"LOGIN",
            payload:data
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};
export const googleLogin=(token, navigate)=>async (dispatch)=>{
    try {
        const {data}=await googleLoginUser(token);
        localStorage.setItem("token",data.jwtToken);
        dispatch({
            type:"LOGIN",
            payload:data
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};