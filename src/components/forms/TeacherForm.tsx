"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFiled from "../InputFiled";

const schema = z.object({
  userName: z
    .string()
    .min(3, { message: "User Name must be at least 03 characters" })
    .max(20, { message: "User Name must be at most 20 characters" }),
  email: z.email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  birthDate: z.date({ message: "Birth date is required" }),
  sex: z.enum(["male", "female"], { message: "sex is required" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a New Teacher</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <InputFiled
        label="Username"
        name="userName"
        defaultValue={data?.userName}
        register={register}
        error={errors?.userName}
      />
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <button className="bg-blue-500 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
