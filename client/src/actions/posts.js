import * as api from "../Api/index.jsx"


export const getPosts=()=> async (dispatch)=>{
    try {
        const { data }=await api.fetchPost()
        dispatch({type:"FETCH_ALL", payload: data})
    } catch (error) {
        console.log(error.message);
    }
}
export const createPosts=(post)=> async (dispatch)=>{
    try {
        const { data }=await api.createPost(post)
        dispatch({type:"CREATE", payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost=(id)=> async (dispatch)=>{
    try {
        const { data }=await api.likePost(id)
        dispatch({type:"LIKE", payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost=(id)=> async (dispatch)=>{
    try {
        const { data }=await api.deletePost(id)
        dispatch({type:"DELETE", payload: id})
    } catch (error) {
        console.log(error.message);
    }
}
