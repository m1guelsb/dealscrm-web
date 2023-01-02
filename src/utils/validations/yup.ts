import { CustomerForm, DealForm, TaskForm } from "@/types";
import { boolean, number, object, SchemaOf, string } from "yup";

export const signInFormSchema = object().shape({
  email: string().email("Invalid email").required("email required"),
  password: string().required("Password required"),
});

export const dealFormSchema = object({
  title: string().required("Field required"),
  description: string().required("Field required"),
  price: string().required("Field required").min(2, "Field required"),
  customerId: string().required("Select a customer"),

  status: string()
    .equals(["CLOSED", "IN_PROGRESS"], "Wrong value")
    .required("Select a option"),
});

export const customerFormSchema: SchemaOf<CustomerForm> = object({
  name: string().required("Name is required."),
  email: string().required("Email is required.").email("Invalid email"),
  phone: string()
    .required("Phone is required.")
    .matches(/(\d{3})-(\d{3})-(\d{4})$/, { message: "Invalid number" }),
});

export const taskFormSchema: SchemaOf<TaskForm> = object({
  title: string().required("Field required"),
  due_date: string().required("Chose a due date"),
  completed: boolean(),
});
