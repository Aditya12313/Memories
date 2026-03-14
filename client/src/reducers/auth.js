const authReducer =(state={authData:JSON.parse(localStorage.getItem("profile"))},action)=>{
    switch(action.type){
        case "LOGIN":
            case"SIGNUP":
            localStorage.setItem("profile", JSON.stringify(action.payload));
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