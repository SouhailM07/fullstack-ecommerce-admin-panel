import { useEffect, useState } from "react";
//
import LoadingPage from "@/components/REUSABLE/LoadingPage/LoadingPage";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingP, setLoadingP] = useState<boolean>(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingP(true);
        const ordersResponse = await axios.get(
          "https://fullstack-ecommerce-admin-panel.onrender.com/bills/"
        );
        const ordersData = ordersResponse.data;

        // Fetch userInfoClerk for each order
        const userInfoPromises = ordersData.map((order) =>
          axios.get(
            `https://fullstack-ecommerce-admin-panel.onrender.com/clerk/${order.userId}`
          )
        );
        const userInfoResponses = await Promise.all(userInfoPromises);
        const userInfoClerks = userInfoResponses.map((res) => res.data);

        // Combine orders with userInfoClerk
        const ordersWithUserInfo = ordersData.map((order, index) => ({
          ...order,
          userInfoClerk: userInfoClerks[index],
        }));
        // reverse it to get the new ones first
        setOrders(ordersWithUserInfo.reverse());
      } catch (error) {
        console.error("Error fetching orders or user info:", error);
      } finally {
        setLoadingP(false);
      }
    };

    fetchOrders();
  }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  }

  return (
    <main>
      {loadingP ? (
        <LoadingPage />
      ) : (
        <ul>
          {orders.map((order, index) => {
            const itemsLength = order.shoppingListDataExact.reduce(
              (acc, e) => acc + e.productLength,
              0
            );
            const totalBill = order.shoppingListDataExact.reduce(
              (acc, e) => acc + e.productLength * +e.info.price,
              0
            );
            return (
              <Accordion key={index} role="listitem" type="single" collapsible>
                <AccordionItem
                  value={`item-${index}`}
                  // grid max-md:grid-cols-2 gap-y-[1rem] max-md:grid-rows-2
                >
                  <AccordionTrigger className="max-sm:grid-cols-2 max-sm:grid-rows-4  grid grid-cols-[2rem_1fr_1fr_1fr_1fr_1fr] place-items-center">
                    <img
                      className="h-[2rem] aspect-square rounded-full "
                      src={
                        order.userInfoClerk.hasImage
                          ? order.userInfoClerk.imageUrl
                          : ""
                      }
                      alt="img"
                    />
                    <span>
                      {order.userInfoClerk.firstName +
                        " " +
                        order.userInfoClerk.lastName}
                    </span>
                    <span className="max-sm:col-start-1">
                      {itemsLength} items
                    </span>
                    <span className="max-sm:row-start-3 ">
                      Total bill: ${totalBill}
                    </span>
                    <span className="">{formatDate(order.createdAt)}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-[1rem]">
                      {order.shoppingListDataExact.map((item, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-4 font-medium max-sm:grid-cols-3 max-sm:grid-row-2 max-sm:gap-y-3"
                        >
                          <span className="max-sm:col-span-3">
                            {item?.info.name}
                          </span>
                          <span>{item.productLength}</span>
                          <span>${item.info.price}</span>
                          <span className="text-green-600 ">
                            ${item.productLength * +item.info.price}
                          </span>
                        </div>
                      ))}
                    </ul>
                    <div className="flex justify-end mt-[1rem]">
                      <p className="text-[1.2rem] font-bold">
                        Total Bill :
                        <span className="text-green-500"> ${totalBill}</span>
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </ul>
      )}
    </main>
  );
}
