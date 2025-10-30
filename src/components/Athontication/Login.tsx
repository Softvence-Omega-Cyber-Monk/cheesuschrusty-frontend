import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Rocket, Sparkles, CheckCircle, Zap, Crown, Users, Star } from 'lucide-react';
import React, { useState, useCallback, useMemo } from 'react';

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "freeuser", "admin"]),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

// --- Animated Background Component ---
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated gradient orbs */}
    <div className="absolute -top-40 -right-32 w-80 h-80  from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
    <div className="absolute -bottom-40 -left-32 w-80 h-80 from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-reverse"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
  </div>
);

// --- Mock Components (same as signup) ---
interface MockInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const MockInput = React.forwardRef<HTMLInputElement, MockInputProps>(
  ({ id, type = 'text', placeholder, icon: Icon, error, value, onChange, ...props }, ref) => (
    <div className="relative group">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-blue-400 group-hover:text-blue-300 z-10" />
      )}
      <div className="relative">
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`flex h-14 w-full rounded-2xl border-2 bg-white/5 px-4 py-4 text-base text-white transition-all duration-500 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-transparent backdrop-blur-sm transform group-hover:scale-[1.02] ${
            Icon ? 'pl-12' : 'pl-4'
          } ${
            error 
              ? 'border-red-400/80 shadow-lg shadow-red-500/30' 
              : 'border-gray-500/30 hover:border-blue-400/50'
          }`}
          {...props}
        />
        {/* Animated border effect */}
        <div className={`absolute inset-0 rounded-2xl from-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 group-focus-within:opacity-20 -z-10 ${
          error ? 'from-red-500 to-pink-500' : ''
        }`}></div>
      </div>
    </div>
  )
);

MockInput.displayName = 'MockInput';

interface MockLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const MockLabel: React.FC<MockLabelProps> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="mb-3 text-sm font-semibold text-gray-200 flex items-center gap-2 transition-all duration-300 hover:text-white">
    {children}
  </label>
);

interface MockButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'gradient';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const MockButton: React.FC<MockButtonProps> = ({ 
  children, 
  type = 'button', 
  variant = 'gradient',
  className = '', 
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-500 transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/30",
    secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500/30",
    success: "bg-green-600 hover:bg-green-700 focus:ring-green-500/30",
    gradient: "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 focus:ring-blue-500/30"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

// Enhanced background image URL
const LOGIN_IMAGE = "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: "user"
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const selectedRole = watch("role");

  const onSubmit = async (data: LoginFormInputs) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    localStorage.setItem("userData", JSON.stringify(data));
    setIsLoggedIn(true);
    
    // Navigate after success animation
    setTimeout(() => {
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
    }, 2000);
  };

  const handleRoleSelect = useCallback((role: "user" | "freeuser" | "admin") => {
    setValue("role", role);
  }, [setValue]);

  const roleConfig = {
    user: { icon: Users, label: "Premium User", color: "from-blue-500 to-cyan-500", description: "Full access to all features" },
    freeuser: { icon: Star, label: "Free User", color: "from-green-500 to-emerald-500", description: "Basic features access" },
    admin: { icon: Crown, label: "Administrator", color: "from-purple-500 to-pink-500", description: "Full system control" }
  };

  const renderContent = useMemo(() => {
    if (isLoggedIn) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center from-gray-800/80 to-gray-900/80 rounded-3xl shadow-2xl border border-gray-700/50 backdrop-blur-xl transform transition-all duration-1000 animate-fade-in">
          <div className="mb-6 p-6 from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 animate-bounce-in">
            <CheckCircle className="h-20 w-20 text-green-400 animate-pulse" />
          </div>
          <h2 className="text-5xl font-black from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-slide-up">
            Welcome Back!
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed animate-slide-up delay-200">
            Successfully logged in. Redirecting you to your personalized dashboard...
          </p>
          <div className="flex items-center gap-3 text-green-400 animate-pulse">
            <Rocket className="h-5 w-5" />
            <span>Taking you to your workspace...</span>
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
        {/* Email Input */}
        <div className="grid gap-3 animate-slide-up">
          <MockLabel htmlFor="email">
            <Mail className="h-5 w-5" />
            Email Address
          </MockLabel>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register("email")}
            className="flex h-14 w-full rounded-2xl border-2 bg-white/5 px-4 py-4 text-base text-white transition-all duration-500 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-transparent backdrop-blur-sm border-gray-500/30 hover:border-blue-400/50 pl-12"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-shake">
              <Zap className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="grid gap-3 animate-slide-up delay-100">
          <MockLabel htmlFor="password">
            <Lock className="h-5 w-5" />
            Password
          </MockLabel>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="flex h-14 w-full rounded-2xl border-2 bg-white/5 px-4 py-4 text-base text-white transition-all duration-500 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-transparent backdrop-blur-sm border-gray-500/30 hover:border-blue-400/50 pl-12"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-shake">
              <Zap className="h-4 w-4" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role Selection */}
        <div className="grid gap-3 animate-slide-up delay-200">
          <MockLabel htmlFor="role">
            <User className="h-5 w-5" />
            Select Role
          </MockLabel>
          <div className="grid grid-cols-3 gap-4">
            {(["user", "freeuser", "admin"] as const).map((role) => {
              const config = roleConfig[role];
              const Icon = config.icon;
              const isSelected = selectedRole === role;
              
              return (
                <div
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-105 backdrop-blur-sm ${
                    isSelected
                      ? `border-transparent ${config.color} shadow-2xl`
                      : 'border-gray-500/30 bg-white/5 hover:border-blue-400/50'
                  }`}
                >
                  <div className={`text-center transition-all duration-300 ${
                    isSelected ? 'text-white' : 'text-gray-400'
                  }`}>
                    <Icon className={`h-8 w-8 mx-auto mb-2 transition-transform duration-300 ${
                      isSelected ? 'scale-110' : ''
                    }`} />
                    <div className="text-sm font-semibold">{config.label}</div>
                    <div className="text-xs opacity-80 mt-1">{config.description}</div>
                  </div>
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 from-green-400 to-cyan-400 rounded-full p-1 animate-bounce">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {errors.role && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-shake">
              <Zap className="h-4 w-4" />
              {errors.role.message}
            </p>
          )}
        </div>

        <MockButton 
          type="submit" 
          disabled={isSubmitting} 
          variant="gradient"
          className="w-full mt-6 h-14 text-lg animate-slide-up delay-300"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              Signing You In...
            </div>
          ) : (
            <>
              <Rocket className="h-5 w-5 mr-2" />
              Access Your Account
            </>
          )}
        </MockButton>
      </form>
    );
  }, [isLoggedIn, errors, isSubmitting, selectedRole, handleRoleSelect, handleSubmit]);

  return (
    <div className="min-h-screen from-gray-900 via-purple-900/80 to-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-6xl lg:grid lg:grid-cols-2 shadow-3xl rounded-3xl overflow-hidden border border-gray-700/50 backdrop-blur-xl transform transition-all duration-1000 hover:shadow-4xl relative z-10">
        {/* Left Side: Form */}
        <div className="flex items-center justify-center py-16 px-6 lg:px-16 bg-gray-800/30 backdrop-blur-2xl border-r border-gray-700/30">
          <div className="mx-auto grid w-full max-w-md gap-10">
            <div className="grid gap-6 text-center">
              <div className="inline-flex items-center gap-3 from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-2xl border border-blue-500/30 mb-4 transform transition-all duration-500 hover:scale-105">
                <div className="h-3 w-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400 text-base font-bold">Welcome Back!</span>
                <Sparkles className="h-4 w-4 text-blue-400" />
              </div>
              <h1 className="text-6xl font-black from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Login
              </h1>
              <p className="text-balance text-gray-300 text-xl leading-relaxed animate-fade-in">
                Access your account and continue your creative journey with us.
              </p>
            </div>

            {renderContent}
            
            <div className="mt-8 text-center text-base text-gray-400 animate-fade-in">
              {isLoggedIn ? (
                <div className="flex items-center justify-center gap-3 text-green-400 animate-pulse">
                  <CheckCircle className="h-5 w-5" />
                  <span>Redirecting to your dashboard...</span>
                </div>
              ) : (
                <>
                  New to our platform?{" "}
                  <Link to="/signup">
                    <button className="font-bold bg-white  from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300 underline">
                      Create Account Here
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden lg:block relative overflow-hidden group">
          <div className="absolute inset-0  from-blue-500/10 via-purple-500/10 to-cyan-500/10 z-10"></div>
          <img
            src={LOGIN_IMAGE}
            alt="Collaborative workspace"
            className="h-full w-full object-cover transform scale-110 transition-transform duration-7000 group-hover:scale-125"
          />
          <div className="absolute bottom-10 left-10 right-10 bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transform transition-all duration-500 group-hover:scale-105">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-purple-400" />
              Continue Your Journey
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Pick up where you left off. Your projects, collaborations, and creative tools are waiting for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;