import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "freeuser", "admin"],  ),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    localStorage.setItem("userData", JSON.stringify(data));

    switch (data.role) {
      case "admin":
        navigate("/admin");
        break;
      case "user":
        navigate("/user");
        break;
      case "freeuser":
        navigate("/freeuser");
        break;
    }
  };

  return (
    <div className="flex items-center justify-center    ">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-start">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-start text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm text-start font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm text-start font-medium text-gray-700">Role</label>
            <select
              {...register("role")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Select a role</option>
              <option value="user">User</option>
              <option value="freeuser">Free User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <div className="mb-3">
            <p>
              Don't have an account? <Link to="/signup" className="text-blue-400">Sign up here</Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
