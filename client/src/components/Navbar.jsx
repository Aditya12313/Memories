import { useState, useRef, useEffect } from "react";
import { searchPosts } from "../Api/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  const user = useSelector((state) => state.auth.authData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const { data } = await searchPosts(value.trim());
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
  };

  return (
    <div className="bg-white shadow-md py-4 px-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-600">
          Memories
        </h1>

        {/* Search Bar */}
        <div className="relative w-72" ref={wrapperRef}>
          <input
            type="text"
            placeholder="Search memories..."
            className="w-full p-2 border rounded"
            value={query}
            onChange={handleChange}
            onFocus={() =>
              suggestions.length > 0 && setShowSuggestions(true)
            }
          />

          {showSuggestions && (
            <ul className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1 max-h-60 overflow-y-auto">

              {suggestions.map((post) => (
                <li
                  key={post._id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                >
                  <p className="font-medium text-sm truncate">
                    {post.title}
                  </p>

                  <p className="text-xs text-gray-500 truncate">
                    by {post.creator} · {post.tags.map((t) => `#${t}`).join(" ")}
                  </p>

                </li>
              ))}

            </ul>
          )}

        </div>

        {/* Auth UI */}
        {user ? (

          <div className="flex items-center gap-4">

            <span className="text-gray-700 font-medium">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>

          </div>

        ) : (

          <div className="flex gap-4">

            <Link
              to="/login"
              className="text-blue-600 font-medium"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="text-blue-600 font-medium"
            >
              Signup
            </Link>

          </div>

        )}

      </div>

    </div>
  );
}

export default Navbar;