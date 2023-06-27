import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const { isCandidate } = useRole();
  const { login } = useAuth();
  const loginMutation = useMutation(
    (formData: LoginFormValues) => login(formData),
    {
      onError: (err: any) => {
        console.log(err.message);
      },
      onSuccess: (res: any) => {
        if (isCandidate) {
          navigate("/all-job");
        } else {
          navigate("/posted-job");
        }
      },
    }
  );

  const onSubmit = (data: LoginFormValues) => {
    setLoading(true);
    loginMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 flex-col">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center text-xl text-white mb-10">
          Welcome to Hudle Jobs
        </div>
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div
          className="text-white mt-4 cursor-pointer hover:text-blue-400"
          onClick={() => navigate("/register")}
        >
          Register here{" "}
        </div>
      </div>
      <div className="text-xs text-white ml-4 bg-gray-500 mt-6">
        <div>Sample login</div>
        <div className="mt-2">
          <div>Admin Login</div>
          <div>Email: admin1@gmail.com</div>
          <div>Password@1</div>
        </div>
        <div className="mt-2">
          <div>Candidate Login</div>
          <div>Email: candidate1@gmail.com</div>
          <div>Candidate@1</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
