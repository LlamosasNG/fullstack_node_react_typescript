import { number, object, string } from "valibot";

export const DraftProductsSchema = object({
  name: string(),
  price: number(),
});
