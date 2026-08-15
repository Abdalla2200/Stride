import { z } from "zod";

// // Checkout Form Validation

// export const checkoutSchema = z.object({
//   name: z.string().min(3, "Name is too short"),
//   phone: z.string().min(11, "Invalid phone number"),
//   address: z.string().min(10, "Address is too short"),
// });

// export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Register Validation

export const registerSchema = z
  .object({
    fullName: z.string().min(3, "Name is too short"),
    email: z.email("Invalid Email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Login Validation

export const loginSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
