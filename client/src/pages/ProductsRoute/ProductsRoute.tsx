import { Routes, Route } from "react-router-dom";
import ProductsPage from "@/components/ProductsPage/ProductsPage";
import EditProduct from "@/components/EditProduct/EditProduct";
import CreateProduct from "@/components/CreateProduct/CreateProduct";

export default function ProductsRoute() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/editProduct/" element={<EditProduct />} />
      <Route path="/createProduct" element={<CreateProduct />} />
    </Routes>
  );
}
