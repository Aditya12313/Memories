const authReducer =(state={authData:null},action)=>{
    switch(action.type){
        case "LOGIN":
            case"SIGNUP":
            localStorage.setItem("token",action.payload.jwtToken)
            return {
                ...state,authData: action.payload
            }

            case "LOGOUT": 
            localStorage.removeItem("token");
            return {
                ...state,authData:null
            }
            default: return state;
    }
}

export default authReducer;