import "./mycontainer.css";
import { Routes, Route, Outlet } from "react-router-dom";
// components
import { MyPanel, Navbar, Loading, ConfirmBox } from "@/components";
// routes
import ProductsRoute from "@/pages/ProductsRoute/ProductsRoute";
import OrdersRoute from "@/pages/OrdersRoute/OrdersRoute";
import CustomersRoute from "@/pages/CustomersRoute/CustomersRoute";
import SettingsRoute from "@/pages/SettingsRoute/SettingsRoute";
import DashboardPage from "@/pages/DashboardPage/DashboardPage";

export default function MyContainer() {
  return (
    <div className="flex">
      <ConfirmBox />
      <Loading />
      <MyPanel />
      <div className="w-full">
        <Navbar />
        <Outlet />
        <main id="main" className="p-pxSize ">
          <Routes>
            <Route path="dashboard/" element={<DashboardPage />} />
            <Route path="products/*" element={<ProductsRoute />} />
            <Route path="orders/*" element={<OrdersRoute />} />
            <Route path="customers/*" element={<CustomersRoute />} />
            <Route path="settings/" element={<SettingsRoute />} />
            <Route
              path="*"
              element={<p className="underInstruction">404 Page Not Found</p>}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
