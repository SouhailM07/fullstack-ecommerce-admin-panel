import { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OrdersRoute() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await axios.get("http://localhost:3007/bills/");
        const ordersData = ordersResponse.data;

        // Fetch userInfoClerk for each order
        const userInfoPromises = ordersData.map((order) =>
          axios.get(`http://localhost:3007/clerk/${order.userId}`)
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
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="grid grid-cols-[2rem_1fr_1fr_1fr_1fr_1fr] place-items-center">
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
                  <span>{itemsLength} items</span>
                  <span>Total bill: ${totalBill}</span>
                  <span>{formatDate(order.createdAt)}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-[1rem]">
                    {order.shoppingListDataExact.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-3 font-medium">
                        <span>{item?.info.name}</span>
                        <span>{item.productLength}</span>
                        <span>${item.productLength * +item.info.price}</span>
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
    </main>
  );
}
