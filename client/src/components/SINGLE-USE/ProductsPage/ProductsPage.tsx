import {
  faPlus,
  faSearch,
  faTrash,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
// components
import LoadingPage from "@/components/REUSABLE/LoadingPage/LoadingPage";
import MyButton from "@/components/REUSABLE/MyButton/MyButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useMemo, InputHTMLAttributes } from "react";
import axios from "axios";
// zustand stores
import productsStore from "@/zustand/products.store.js";
import confirmStore from "@/zustand/confirm.store.js";
import productStore from "@/zustand/selected_product.store.js";
import MyIconBtn from "@/components/REUSABLE/MyIconBtn/MyIconBtn";

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
          <ControlPanel
            products={products}
            searchProduct={searchProduct}
            setSearchProduct={setSearchProduct}
          />
          <SmallControlPanel
            products={products}
            searchProduct={searchProduct}
            setSearchProduct={setSearchProduct}
          />
          <section className="text-center">
            <ul className="flex max-md:justify-center md:flex-col gap-[1rem] flex-wrap">
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
    <li className="grid max-md:grid-row-4 md:grid-cols-[2fr_1fr_1fr_1fr] max-md:w-[15rem] max-md:justify-center items-center  gap-[1rem]">
      <img
        className="md:h-[5rem] max-md:w-full aspect-video "
        src={img}
        alt=" img"
        loading="lazy"
      />
      <h1>{name}</h1>
      <p className="font-bold">
        <span className="text-green-500">$</span>
        {price}
      </p>
      <div className="flex gap-x-[1rem] max-md:justify-between md:justify-self-end">
        <Link to={`editProduct/`}>
          <MyIconBtn
            customStyle="text-white bg-blue-600"
            icon={faWrench}
            onClick={handleEdit}
          />
        </Link>
        <MyIconBtn
          customStyle="text-white bg-red-500"
          icon={faTrash}
          onClick={handleDelete}
        />
      </div>
    </li>
  );
};

interface MySearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  customStyle?: string;
}

const MySearchInput = ({
  value,
  customStyle,
  ...props
}: MySearchInputProps) => (
  <div
    className={`${customStyle} z-[10] border-2 border-black p-2 rounded-lg flex gap-x-[1rem] items-center w-full`}
  >
    <FontAwesomeIcon icon={faSearch} />
    <input
      value={value}
      placeholder="Search..."
      type="text"
      className="outline-none w-full"
      {...props}
    />
  </div>
);

const ControlPanel = ({ searchProduct, setSearchProduct, products }) => {
  return (
    <section className="grid grid-cols-[5rem_1fr_8rem] gap-x-3 items-center max-md:hidden">
      <Link to="createProduct">
        <MyButton color="text-white bg-secondaryColor" label="+ Add" />
      </Link>
      <MySearchInput
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
      />
      <span className="justify-self-end">
        Total Products : {products.length}
      </span>
    </section>
  );
};

const SmallControlPanel = ({ products, searchProduct, setSearchProduct }) => {
  let [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const searchHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchProduct(e.target.value);
      setToggleSearch(false);
    }
  };

  return (
    <section className="md:hidden flex items-center justify-between">
      {toggleSearch && (
        <MySearchInput
          customStyle="bg-white left-0 w-full absolute h-[3rem]"
          value={searchProduct}
          onKeyDown={searchHandler}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      )}
      <span className="justify-self-end">
        Total Products : {products.length}
      </span>
      <article className="flex items-center gap-x-3">
        <Link to="createProduct">
          <MyIconBtn
            icon={faPlus}
            customStyle="!rounded-full text-white bg-secondaryColor"
          />
        </Link>
        <MyIconBtn
          onClick={() => setToggleSearch(true)}
          customStyle="!rounded-full text-white bg-secondaryColor"
          icon={faSearch}
        />
      </article>
    </section>
  );
};
