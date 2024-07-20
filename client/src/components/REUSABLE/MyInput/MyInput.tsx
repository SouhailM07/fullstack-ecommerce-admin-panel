// shadcn-ui
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function MyInput({ name, control, label, placeholder, type }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type == "input" ? (
              <Input
                className="sm:min-w-[18rem]"
                placeholder={placeholder}
                {...field}
                type={name == "price" ? "number" : "text"}
                onChange={(event) =>
                  field.onChange(
                    name == "price" ? +event.target.value : event.target.value
                  )
                }
              />
            ) : (
              <textarea
                className="border-2 min-h-[7rem] border-borderColor w-full rounded-lg p-2 resize-none"
                placeholder="Product Description"
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
