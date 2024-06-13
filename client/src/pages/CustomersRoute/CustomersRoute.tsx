import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CustomersRoute() {
  return (
    <main className="underInstruction text-red-500">
      <div>
        <FontAwesomeIcon icon={faBan} /> Not allowed
      </div>
    </main>
  );
}
