import { Product } from "../types";
import { formatCurrency } from "../../utils/index";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const isAvailability = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {isAvailability ? "Disponible" : "No disponible"}
      </td>
      <td className="p-3 text-lg text-gray-800 "></td>
    </tr>
  );
}
