
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

import store from "./store";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);