import {
  ActionFunctionArgs,
  Form,
  useNavigate,
  redirect,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils/index";
import { deleteProduct } from "../services/ProductService";

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const isAvailability = product.availability;
  const navigate = useNavigate();

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        <form method="POST">
          <button
            type="button"
            name="availability"
            value={product.availability.toString()}
            className={`${
              isAvailability ? "bg-green-600" : "bg-red-600"
            } text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center`}
          >
            {isAvailability ? "Disponible" : "No disponible"}
          </button>
        </form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center ">
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm("¿Está seguro de eliminar este producto?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
