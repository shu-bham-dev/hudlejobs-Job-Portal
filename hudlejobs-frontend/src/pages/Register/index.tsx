import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../queries/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define validation schema using Yup
const validationSchema = yup.object().shape({
  name: yup.string().min(3),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phone: yup.string().required("Phone number is required"),
  skills: yup.array().min(1, "At least one skill is required"),
  confirmPassword: yup
    .string()
    // .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Confirm Password is required"),
});

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  skills: string[];
  confirmPassword: string;
};

const Register: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    // resolver: yupResolver(validationSchema),
  });

  const registerMutation = useMutation(
    (formData: RegisterFormValues) => signup(formData),
    {
      onError: (err: any) => {
        console.log(err);
      },
      onSuccess: (res: any) => {
        toast.success("Register Successfull");
        navigate("/");
      },
    }
  );
  const onSubmit = (data: RegisterFormValues) => {
    Object.assign(data, { skills: skills });
    console.log(data);
    registerMutation.mutate(data);
  };

  const handleAddSkill = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value.trim() !== "") {
      const newSkill = event.currentTarget.value.trim();
      if (!skills.includes(newSkill)) {
        setSkills((prevSkills) => [...prevSkills, newSkill]);
      }
      event.currentTarget.value = "";
      event.preventDefault();
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-300">
              Full name
            </label>
            <input
              type="text"
              id="name"
              className={`bg-gray-700 appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-gray-300">
              Email
            </label>
            <input
              type="text"
              id="email"
              className={`bg-gray-700 appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-300">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className={`bg-gray-700 appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="skills" className="text-gray-300">
              Skills
            </label>
            <div className="bg-gray-700 appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 flex flex-wrap gap-2 items-center">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-blue-500 text-white py-1 px-2 rounded flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500 hover:text-red-600 cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16A8 8 0 0010 2zM4.293 5.293a1 1 0 00-1.414 1.414L8.586 11l-5.707 5.293a1 1 0 101.414 1.414L10 12.414l5.293 5.707a1 1 0 001.414-1.414L11.414 11l5.707-5.293a1 1 0 10-1.414-1.414L10 9.586 4.707 4.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <input
                type="text"
                id="skills"
                name="skills"
                className="flex-grow bg-transparent focus:outline-none"
                onKeyDown={handleAddSkill}
              />
            </div>
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">
                {errors.skills.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`bg-gray-700 appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`bg-gray-700 appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </form>
        <div
          className="text-white mt-4 cursor-pointer hover:text-blue-400"
          onClick={() => navigate("/login")}
        >
          Login here{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
