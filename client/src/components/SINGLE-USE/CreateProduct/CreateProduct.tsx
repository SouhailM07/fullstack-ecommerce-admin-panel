import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MyButton from "../../REUSABLE/MyButton/MyButton";
import {
  faArrowRight,
  faCloud,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { inputs_t } from "@/types";
import loadingStore from "@/zustand/loading.store.js";
import MyInput from "../../REUSABLE/MyInput/MyInput";
import { Form } from "../../ui/form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { uploadImage } from "@/lib/API_HANDLERS";

// Define the validation schema using Zod
const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().min(3, "Description is required"),
  img: z.any().refine((file) => file instanceof File, {
    message: "Image must be a File or a valid URL",
  }),
});

export default function CreateProduct() {
  return (
    <main className="space-y-[2rem]">
      <Header />
      <FormSection />
    </main>
  );
}

const Header = () => (
  <section className="justify-between flex items-start">
    <span className="text-title font-bold">New Product</span>
    <Link to="/products">
      <MyButton
        icon={faArrowRight}
        color="border-2 border-black"
        label="Back"
      />
    </Link>
  </section>
);

const FormSection = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const navigate = useNavigate();
  const { setLoading } = loadingStore((state) => state);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    let { imgName, downloadURL }: any = await uploadImage(values?.img).then(
      (res) => res
    );
    try {
      await axios.post(
        `https://fullstack-ecommerce-admin-panel.onrender.com/products/create`,
        {
          ...values,
          img: downloadURL,
          imgName,
        }
      );

      navigate("/products");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
                  <ProductImg field={field} />
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
          label="Create"
          color="border-2 border-black self-end"
        />
      </form>
    </Form>
  );
};

const ProductImg = ({ field }) => {
  const [previewImg, setPreviewImg] = useState<string>();

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
