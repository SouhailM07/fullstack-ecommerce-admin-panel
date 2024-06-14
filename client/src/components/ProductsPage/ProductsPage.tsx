import { faSearch, faTrash, faWrench } from "@fortawesome/free-solid-svg-icons";
// components
import { MyButton, LoadingPage } from "@/components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
// zustand stores
import productsStore from "@/zustand/products.store.js";
import confirmStore from "@/zustand/confirm.store.js";
import productStore from "@/zustand/selected_product.store.js";

export default function ProductsPage() {
  let [searchProduct, setSearchProduct] = useState<string>("");
  let [loadingP, setLoadingP] = useState<boolean>(false);
  const { setProducts, products } = productsStore((state) => state);

  const getProducts = () => {
    setLoadingP(true);
    axios
      .get("https://fullstack-ecommerce-admin-panel.onrender.com/products/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingP(false));
  };
  const filteredProducts = useMemo(() => {
    return products.filter((e) =>
      e?.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
  }, [products, searchProduct]);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <main className="space-y-[2rem] max-w-[60rem]">
      {loadingP ? (
        <LoadingPage />
      ) : (
        <>
          <section className="grid grid-cols-[1fr_2fr_1fr]  items-center">
            <Link to="createProduct">
              <MyButton color="text-white bg-secondaryColor" label="+ Add" />
            </Link>
            <MySearchInput value={searchProduct} handler={setSearchProduct} />
            <span className="justify-self-end">
              Total Products : {products.length}
            </span>
          </section>
          <section className="text-center">
            <ul className="flex flex-col gap-y-[1rem]">
              {filteredProducts.map((e, i) => (
                <RenderItem {...e} i={i} key={i} />
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}

const RenderItem = ({ _id, name, price, description, img, imgName }) => {
  const { setProductId, setConfirmation } = confirmStore((state) => state);
  const { editSelectedProduct } = productStore((state) => state);
  //
  const handleDelete = () => {
    setProductId(_id);
    editSelectedProduct({ name, price, description, _id, img, imgName });
    setConfirmation(true);
  };
  const handleEdit = () => {
    editSelectedProduct({ name, price, description, _id, img, imgName });
  };
  return (
    <li className="grid grid-cols-[9rem_10rem_5rem_1fr] gap-x-[2rem] items-center ">
      <img
        className="h-[5rem] aspect-video "
        src={img}
        alt=" img"
        loading="lazy"
      />
      <h1>{name}</h1>
      <p className="font-bold">
        <span className="text-green-500">$</span>
        {price}
      </p>
      <div className="flex gap-x-[1rem] justify-self-end">
        <Link to={`editProduct/`}>
          <MyButton
            handler={handleEdit}
            icon={faWrench}
            label="Edit"
            color="text-white bg-blue-600"
          />
        </Link>

        <MyButton
          handler={handleDelete}
          icon={faTrash}
          label="Delete"
          color="text-white bg-red-500"
        />
      </div>
    </li>
  );
};

const MySearchInput = ({ value, handler }: { value: string; handler: any }) => (
  <div className="border-2 border-black p-2 rounded-lg flex gap-x-[1rem] items-center w-full">
    <FontAwesomeIcon icon={faSearch} />
    <input
      onChange={(e) => handler(e.target.value)}
      value={value}
      placeholder="Search..."
      type="text"
      className=" outline-none w-full  "
    />
  </div>
);
