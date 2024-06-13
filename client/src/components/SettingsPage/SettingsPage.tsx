import { useEffect, useState } from "react";
import axios from "axios";

export default function SettingsPage() {
  let [admins, setAdmins] = useState<{ id; email: string }[]>([]);
  // ! handlers
  const getAdmins = () =>
    axios["get"]("https://fullstack-ecommerce-admin-panel.onrender.com/admins")
      .then((res) => setAdmins(res.data))
      .catch((err) => console.log(err));
  // ? on component mount
  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <section className=" min-h-screenH flex flex-col justify-between">
      <article className="space-y-[2rem]">
        <h1 className="text-red-500 text-title font-bold">Admins</h1>
        <ul className="border-2 border-borderColor min-h-[4rem] rounded-lg ">
          {admins.map((e, i) => (
            <li
              key={i}
              className="p-3 border-b border-borderColor flex items-center gap-x-[1rem]"
            >
              <span>{i + 1}</span>
              <p>{e.email.split("").map((e, i) => (i > 7 ? "*" : e))}</p>
            </li>
          ))}
        </ul>
      </article>
      <article className="text-center ">
        <p>@Copyrights 2024/2025</p>
      </article>
    </section>
  );
}
