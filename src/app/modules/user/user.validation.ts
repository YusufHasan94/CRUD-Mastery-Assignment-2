import { z } from "zod";
const userNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});
const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: userNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: z.array(orderSchema).optional(),
});

export default userValidationSchema;
