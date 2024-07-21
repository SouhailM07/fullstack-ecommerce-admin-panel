import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
export default function DashboardPage() {
  interface detail_t {
    title: string;
    value: string;
    change: string;
  }
  const details: detail_t[] = [
    { title: "Total Orders", value: "1,234", change: "12% increase" },
    { title: "Total Revenue", value: "$98,765", change: "8% increase" },
    { title: "New Customers", value: "456", change: "15% increase" },
    { title: "Avg. Order Value", value: "$80", change: "2% decrease" },
  ];
  return (
    <section className="min-h-screenH max-w-[70rem]">
      <ul
        id="details"
        className="flex items-center max-sm:justify-center flex-wrap  gap-[1rem]"
      >
        {details.map((e: detail_t, i) => (
          <li
            key={i}
            className="border-borderColor max-sm:text-center rounded-lg sm:aspect-square border max-sm:w-full min-w-[11rem] flex flex-col justify-between px-3 py-[1rem]"
          >
            <div className="flex flex-col gap-y-[1rem]">
              <h1 className="text-title font-bold">{e.title}</h1>
              <h2 className="text-title font-bold text-secondaryColor">
                {e.value}
              </h2>
            </div>
            <div className="space-x-[1rem]">
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`${
                  e.change.includes("increase")
                    ? "text-green-500"
                    : "text-red-500 rotate-180"
                }`}
              />
              <span>{e.change}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
