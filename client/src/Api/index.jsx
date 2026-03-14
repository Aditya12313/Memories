import axios from "axios"; // import axios to send HTTP requests

const API=axios.create({
    baseURL: "http://localhost:5000" //backend baseURL create axios instance with backend base URL
})

export const fetchPost = () => API.get("/posts"); //get all posts // send GET request to fetch all posts


export const createPost =(newPost)=>{
    return API.post("/posts",newPost); //send new post to backend // send POST request to create new post
}

export const likePost =(_id)=>{
       return API.patch(`/posts/${_id}/likePost`); //like a post to update the current state and not the whole data
}

export const deletePost =(_id)=>{
    return API.delete(`/posts/${_id}`);
}


export const searchPosts = (query) => API.get(`/posts/search?q=${query}`);

export const signupuser=(formData)=>{
    return API.post("/auth/sign-up",formData);
}
export const loginuser=(formData)=>{
    return API.post("/auth/log-in",formData);
}

export const googleLoginUser=(token)=>{
    return API.post("/auth/google-login",{token});
}

API.interceptors.request.use((req)=>{
    const token=localStorage.getItem("token");
    if(token){
        req.headers.Authorization=`Bearer ${token}`;
    }
    return req;
})