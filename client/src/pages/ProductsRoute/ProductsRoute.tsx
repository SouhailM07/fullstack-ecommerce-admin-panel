import { Routes, Route } from "react-router-dom";
import ProductsPage from "@/components/SINGLE-USE/ProductsPage/ProductsPage";
import EditProduct from "@/components/SINGLE-USE/EditProduct/EditProduct";
import CreateProduct from "@/components/SINGLE-USE/CreateProduct/CreateProduct";

export default function ProductsRoute() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/editProduct/" element={<EditProduct />} />
      <Route path="/createProduct" element={<CreateProduct />} />
    </Routes>
  );
}
