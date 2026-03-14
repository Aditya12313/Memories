import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createPosts } from "../actions/posts.js";

function Form() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  if (!user) {
    return (
      <p className="text-center text-gray-600">
        Please login to create memories
      </p>
    );
  }
   
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPosts(postData));
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPostData({ ...postData, selectedFile: reader.result });
    };
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Create Memory</h2>
      <input
        placeholder="Creator"
        className="w-full mb-3 p-2 border rounded"
        value={postData.creator}
        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
      ></input>
      <input
        placeholder="Title"
        className="w-full mb-3 p-2 border rounded"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />

      <textarea
        placeholder="Message"
        className="w-full mb-3 p-2 border rounded"
        value={postData.message}
        onChange={(e) =>
          setPostData({ ...postData, message: e.target.value })
        }
      />

      <input
        placeholder="Tags (comma separated)"
        className="w-full mb-3 p-2 border rounded"
        value={postData.tags}
        onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
      />

      <input
        type="file"
        className="w-full mb-3"
        onChange={(e) => convertToBase64(e.target.files[0])}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
export default Form;