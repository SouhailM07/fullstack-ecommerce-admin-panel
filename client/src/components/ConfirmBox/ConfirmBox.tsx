import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
// components
import MyButton from "../MyButton/MyButton";
// zustand
import confirmStore from "@/zustand/confirm.store.js";
import productsStore from "@/zustand/products.store.js";
import loadingStore from "@/zustand/loading.store.js";
import { ref } from "firebase/storage";
import { storage } from "@/firebase";
import productStore from "@/zustand/selected_product.store.js";
import { deleteImage } from "@/lib/API_HANDLERS";
export default function ConfirmBox() {
  const { productId, confirmation, setConfirmation } = confirmStore(
    (state) => state
  );
  const { selectedProduct } = productStore((state) => state);
  const { setProducts } = productsStore((state) => state);
  const { setLoading } = loadingStore((state) => state);
  // ${product?.img
  const deleteRef = ref(storage, `${selectedProduct?.imgName}`);
  const getProducts = () =>
    axios
      .get("https://fullstack-ecommerce-admin-panel.onrender.com/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

  const handleDelete = () => {
    setConfirmation(false);
    setLoading(true);
    axios
      .delete(
        `https://fullstack-ecommerce-admin-panel.onrender.com/products/delete/${productId}`
      )
      .then(async () => {
        await deleteImage(deleteRef);
        getProducts();
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <AnimatePresence>
      {confirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className=" absolutePanel"
        >
          <div className="bg-white gap-y-[1.5rem] w-[30rem] rounded-lg px-[2rem] py-[2rem] flex flex-col justify-between">
            <h1 className="text-title font-bold text-red-500">Warning!</h1>
            <p>
              You're about to Delete this Product , Are sure you want to delete
              this product ?
            </p>
            <div className="justify-between flex">
              <MyButton
                handler={() => setConfirmation(false)}
                label="Cancel"
                color="bg-blue-500 text-white"
              />
              <MyButton
                handler={handleDelete}
                label="Delete"
                color="bg-red-500 text-white"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
