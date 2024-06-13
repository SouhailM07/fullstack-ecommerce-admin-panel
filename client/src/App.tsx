import "./style/input.css";
import "./App.css";
//
import MyContainer from "./components/MyContainer/MyContainer";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthenticateWithRedirectCallback, useAuth } from "@clerk/clerk-react";
import { useLayoutEffect } from "react";
import MyLogin from "./components/MyLogin/MyLogin";

function App() {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // auth guardian
  useLayoutEffect(() => {
    if (!isSignedIn && location.pathname !== "/login/") {
      navigate("login/");
    } else {
      navigate("/dashboard");
    }
  }, [isSignedIn]);
  return (
    <Routes>
      <Route path="/*" element={<MyContainer />} />
      <Route path="login/" element={<MyLogin />} />
      <Route
        path="/sso-callback"
        element={<AuthenticateWithRedirectCallback />}
      />
    </Routes>
  );
}
export default App;
