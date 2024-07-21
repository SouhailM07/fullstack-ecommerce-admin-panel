import "./style/input.css";
import "./App.css";
//
import { Routes, Route } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MyLogin from "./components/SINGLE-USE/MyLogin/MyLogin";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProductsRoute from "./pages/ProductsRoute/ProductsRoute";
import OrdersRoute from "./pages/OrdersRoute/OrdersRoute";
import CustomersRoute from "./pages/CustomersRoute/CustomersRoute";
import SettingsRoute from "./pages/SettingsRoute/SettingsRoute";
import ConfirmBox from "./components/REUSABLE/ConfirmBox/ConfirmBox";
import Loading from "./components/REUSABLE/Loading/Loading";
import MyPanel from "./components/SINGLE-USE/MyPanel/MyPanel";
import Navbar from "./components/SINGLE-USE/Navbar/Navbar";

function App() {
  // auth guardian
  // useLayoutEffect(() => {
  //   if (!isSignedIn && location.pathname !== "/login/") {
  //     navigate("login/");
  //   } else {
  //     navigate("/dashboard");
  //   }
  // }, [isSignedIn]);
  return (
    <div className="flex">
      <ConfirmBox />
      <Loading />
      <MyPanel />
      <div className="w-full">
        <Navbar />
        <main id="main" className="lg:p-pxSize md:p-[1rem] p-3">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products/*" element={<ProductsRoute />} />
            <Route path="/orders/*" element={<OrdersRoute />} />
            <Route path="/customers/*" element={<CustomersRoute />} />
            <Route path="/settings/" element={<SettingsRoute />} />
            <Route path="login/" element={<MyLogin />} />
            <Route
              path="/sso-callback"
              element={<AuthenticateWithRedirectCallback />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
export default App;
