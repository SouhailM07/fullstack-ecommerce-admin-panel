import "./editproduct.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// ! shadcn-ui
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// shadcn-ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import MyButton from "../MyButton/MyButton";
import {
  faArrowRight,
  faCloud,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { inputs_t } from "@/types";
import MyInput from "../MyInput/MyInput";
import productStore from "@/zustand/selected_product.store.js";
import loadingStore from "@/zustand/loading.store.js";
import { ref } from "firebase/storage";
import { storage } from "@/firebase";
import { deleteImage, uploadImage } from "@/lib/API_HANDLERS";

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().min(3, "Description is required"),
  img: z.union([z.instanceof(File), z.string().url()]).refine(
    (fileOrUrl) => {
      return fileOrUrl instanceof File || typeof fileOrUrl === "string";
    },
    {
      message: "Image must be a File or a valid URL",
    }
  ),
});

export default function EditProduct() {
  return (
    <main className="space-y-[2rem]">
      <Header />
      <FormSection />
    </main>
  );
}

const Header = () => {
  const { selectedProduct } = productStore((state) => state);
  return (
    <section className=" justify-between flex items-start">
      <span className="text-title font-bold">{selectedProduct?.name}</span>
      <Link to="/products">
        <MyButton
          icon={faArrowRight}
          color="border-2 border-black"
          label="Back"
        />
      </Link>
    </section>
  );
};

const FormSection = () => {
  const { selectedProduct } = productStore((state) => state);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedProduct?.name,
      price: selectedProduct?.price,
      description: selectedProduct?.description,
      img: selectedProduct?.img,
    },
  });

  const navigate = useNavigate();

  // Define the type for input fields

  let inputs: inputs_t[] = [
    {
      name: "name",
      placeholder: "Product Name",
      label: "Product name",
      type: "input",
    },
    {
      name: "price",
      placeholder: "Price",
      label: "Product Price",
      type: "input",
    },
  ];
  const { setLoading } = loadingStore((state) => state);

  const onSubmit = async (values: any) => {
    setLoading(true);
    let editImgName: any = selectedProduct?.imgName;
    const handleDeleteAndUpload = async () => {
      const deleteRef = ref(storage, `${selectedProduct?.imgName}`);
      try {
        await deleteImage(deleteRef);
        await uploadImage(values.img).then((res) => {
          values.img = res?.downloadURL;
          editImgName = res?.imgName;
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (values.img !== selectedProduct?.img) {
      await handleDeleteAndUpload();
    }
    axios
      .put(`http://localhost:3007/products/edit/${selectedProduct?._id}`, {
        ...values,
        imgName: editImgName,
      })
      .then(() => {
        navigate("/products");
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-[1rem]"
      >
        <article className="flex justify-between items-start">
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProductImg selectedProduct={selectedProduct} field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ul className="space-y-[1rem]">
            {inputs.map((e: any, i) => (
              <MyInput key={i} {...e} control={form.control} />
            ))}
          </ul>
        </article>
        <article className="space-y-[1rem]">
          <MyInput
            name="description"
            placeholder="Product description"
            label="Product description"
            type="textarea"
            control={form.control}
          />
        </article>
        <MyButton
          icon={faCloud}
          label="Save"
          color="border-2 border-black self-end"
        />
      </form>
    </Form>
  );
};
const ProductImg = ({ field, selectedProduct }) => {
  const [previewImg, setPreviewImg] = useState<string>(selectedProduct?.img);

  return (
    <div className="product__img grid place-items-center h-[10rem] relative">
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => {
          const file = e.target.files![0];
          if (file) {
            field.onChange(file); // Update the form field value
            const imageUrl = URL.createObjectURL(file);
            setPreviewImg(imageUrl);
          }
        }}
        className="z-[3] h-full opacity-0 cursor-pointer"
      />
      <div className="grid place-items-center absolute">
        <img
          className="h-[10rem] rounded-sm"
          src={previewImg || "https://placehold.co/600x400"}
          alt="img"
        />
        <FontAwesomeIcon
          size="2x"
          icon={faDownload}
          className="absolute icon"
        />
      </div>
    </div>
  );
};
