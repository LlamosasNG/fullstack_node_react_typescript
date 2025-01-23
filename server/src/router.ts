import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateAvailability,
  updateProduct,
} from "./handlers/product";

const router = Router();

// Rounting
router.get("/", getProduct);
router.get(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  getProductById
);
router.post(
  "/",
  body("name").notEmpty().withMessage("The product name cannot be empty."),
  body("price")
    .isNumeric()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("The product price cannot be empty")
    .custom((value) => value > 0)
    .withMessage("Invalid price"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  body("name").notEmpty().withMessage("The product name cannot be empty."),
  body("price")
    .isNumeric()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("The product price cannot be empty")
    .custom((value) => value > 0)
    .withMessage("Invalid price"),
  body("availability")
    .isBoolean()
    .withMessage("Value for availability not valid"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  deleteProduct
);

export default router;
