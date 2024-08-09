import classNames from "classnames";
import React, { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormColumnProps = {
  children?: React.ReactNode;
  className?: string;
};

type FormRowProps = {
  children?: React.ReactNode;
  className?: string;
};

const FormColumn = ({ children, className }: FormColumnProps) => {
  return (
    <div
      className={classNames(
        className,
        `flex flex-col items-center justify-center `
      )}
    >
      {children}
    </div>
  );
};

const FormRow = ({ children, className }: FormRowProps) => {
  return (
    <div className={classNames(className, `w-full flex flex-col items-start `)}>
      {children}
    </div>
  );
};

type FormValues = {
  username: string;
  email: string;
};
const FormExample = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("form data: ", data);
  };
  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 mt-10 p-10 rounded"
      >
        <FormColumn className="gap-4">
          <FormRow className="gap-2">
            <label htmlFor="username">Name:</label>
            <input
              className="border border-gray-200 rounded"
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </FormRow>
          <FormRow className="gap-2">
            <label htmlFor="email">Email:</label>
            <input
              className="border border-gray-200 rounded"
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </FormRow>

          <button
            className="mt-4 px-4 border border-gray-700 bg-gray-900 text-white hover:border-gray-50 hover:bg-gray-50 hover:text-gray-800 rounded"
            type="submit"
          >
            Submit
          </button>
        </FormColumn>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default FormExample;
