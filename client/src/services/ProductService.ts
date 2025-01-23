import { safeParse } from "valibot";
import { DraftProductsSchema, ProductsSchema } from "../types";
import axios from "axios";

type ProductDataProps = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductDataProps) {
  try {
    const result = safeParse(DraftProductsSchema, {
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Ivalid data");
    }
  } catch (error) {
    console.log(error);
  }
}
