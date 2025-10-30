import React, { useState, useCallback, useMemo, ChangeEvent, FormEvent } from 'react';
import { Mail, Lock, User, PlusSquare, CheckCircle, Sparkles, Rocket, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Type Definitions ---
interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  image?: string;
}

interface MockInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

// --- Animated Background Component ---
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated gradient orbs */}
    <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-reverse"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
  </div>
);

// --- Mock Components with Enhanced Animations ---
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
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 group-focus-within:opacity-20 -z-10 ${
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
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

// Enhanced background image URL
const CUBE_GROUP_IMAGE = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80";

// --- Validation Function ---
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  
  if (!data.password || data.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
    errors.password = "Password must include uppercase, lowercase, and numbers.";
  }

  return errors;
};

// --- Main Application Component ---
const App: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof FormData) => 
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }, [errors]);

  const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select an image file.' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, image: 'Image must be smaller than 5MB.' }));
        return;
      }
      
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
      setErrors(prev => ({ ...prev, image: undefined }));
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});
    console.log("Signup Data:", { ...formData, file: selectedFile?.name });

    // Mock API call
    setTimeout(() => {
      setIsSignedUp(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const renderContent = useMemo(() => {
    if (isSignedUp) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl shadow-2xl border border-gray-700/50 backdrop-blur-xl transform transition-all duration-1000 animate-fade-in">
          <div className="mb-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 animate-bounce-in">
            <CheckCircle className="h-20 w-20 text-green-400 animate-pulse" />
          </div>
          <h2 className="text-5xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-slide-up">
            Welcome Aboard!
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed animate-slide-up delay-200">
            Your account has been successfully created. You now have access to all our exclusive features and resources.
          </p>
          <div className="flex gap-4 animate-slide-up delay-400">
            <MockButton 
              onClick={() => setIsSignedUp(false)}
              variant="gradient"
              className="px-10 py-4 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700"
            >
              <Rocket className="h-5 w-5 mr-2" />
              Explore Dashboard
            </MockButton>
            <MockButton 
              onClick={() => {
                setIsSignedUp(false);
                setFormData({ name: '', email: '', password: '' });
                setSelectedFile(null);
                setPreview(null);
              }}
              variant="secondary"
              className="px-10 py-4 border border-gray-600 hover:border-gray-500"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Create Another
            </MockButton>
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="grid gap-8">
        {/* Name Input */}
        <div className="grid gap-3 animate-slide-up">
          <MockLabel htmlFor="name">
            <User className="h-5 w-5" />
            Full Name
          </MockLabel>
          <MockInput
            id="name"
            type="text"
            placeholder="Enter your full name"
            icon={User}
            value={formData.name}
            onChange={handleInputChange('name')}
            error={errors.name}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-shake">
              <Zap className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="grid gap-3 animate-slide-up delay-100">
          <MockLabel htmlFor="email">
            <Mail className="h-5 w-5" />
            Email Address
          </MockLabel>
          <MockInput
            id="email"
            type="email"
            placeholder="your.email@example.com"
            icon={Mail}
            value={formData.email}
            onChange={handleInputChange('email')}
            error={errors.email}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-shake">
              <Zap className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="grid gap-3 animate-slide-up delay-200">
          <MockLabel htmlFor="password">
            <Lock className="h-5 w-5" />
            Password
          </MockLabel>
          <MockInput
            id="password"
            type="password"
            placeholder="Create a strong password"
            icon={Lock}
            value={formData.password}
            onChange={handleInputChange('password')}
            error={errors.password}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-shake">
              <Zap className="h-4 w-4" />
              {errors.password}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
            <Sparkles className="h-3 w-3" />
            Must be at least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>

        {/* Profile Picture Upload */}
        <div className="grid gap-3 animate-slide-up delay-300">
          <MockLabel htmlFor="fileInput">
            <PlusSquare className="h-5 w-5" />
            Profile Picture <span className="text-gray-500 text-xs font-normal">(Optional)</span>
          </MockLabel>
          <div
            className={`relative w-full h-44 border-3 border-dashed rounded-3xl flex items-center justify-center cursor-pointer transition-all duration-500 group backdrop-blur-sm transform hover:scale-[1.02] ${
              errors.image
                ? 'border-red-400/60 bg-red-900/10 hover:border-red-300'
                : preview 
                ? 'border-blue-400/60 bg-blue-900/10' 
                : 'border-gray-500/40 bg-gray-800/20 hover:border-blue-400 hover:bg-blue-900/10'
            }`}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-90 transition-all duration-500 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <PlusSquare className="h-10 w-10 text-white mr-3 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white text-base font-semibold">Change Image</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-gray-500 group-hover:text-blue-400 transition-all duration-500">
                <PlusSquare className="h-14 w-14 mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                <p className="text-base font-semibold">Click to upload image</p>
                <p className="text-xs mt-2 text-gray-600 group-hover:text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          {errors.image && (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-shake">
              <Zap className="h-4 w-4" />
              {errors.image}
            </p>
          )}
        </div>

        <MockButton 
          type="submit" 
          disabled={isSubmitting} 
          variant="gradient"
          className="w-full mt-6 h-14 text-lg animate-slide-up delay-400"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              Creating Your Account...
            </div>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Create Account
            </>
          )}
        </MockButton>
      </form>
    );
  }, [isSignedUp, formData, errors, isSubmitting, preview, handleInputChange, handleImageChange, handleSubmit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/80 to-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-6xl lg:grid lg:grid-cols-2 shadow-3xl rounded-3xl overflow-hidden border border-gray-700/50 backdrop-blur-xl transform transition-all duration-1000 hover:shadow-4xl relative z-10">
        {/* Left Side: Form */}
        <div className="flex items-center justify-center py-16 px-6 lg:px-16 bg-gray-800/30 backdrop-blur-2xl border-r border-gray-700/30">
          <div className="mx-auto grid w-full max-w-md gap-10">
            <div className="grid gap-6 text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-2xl border border-blue-500/30 mb-4 transform transition-all duration-500 hover:scale-105">
                <div className="h-3 w-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400 text-base font-bold">Join Thousands of Creators</span>
                <Sparkles className="h-4 w-4 text-blue-400" />
              </div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Create Account
              </h1>
              <p className="text-balance text-gray-300 text-xl leading-relaxed animate-fade-in">
                Start your journey with us. Unlock exclusive features and join our growing community.
              </p>
            </div>

            {renderContent}
            
            <div className="mt-8 text-center text-base text-gray-400 animate-fade-in">
              {isSignedUp ? (
                <div className="flex items-center justify-center gap-3 text-green-400 animate-pulse">
                  <CheckCircle className="h-5 w-5" />
                  <span>Redirecting to your dashboard...</span>
                </div>
              ) : (
                <>
                  Already part of our community?{" "}
                  <Link to="/login">
                  <button 
                    onClick={() => console.log('Navigate to login')} 
                    className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300 underline"
                  >
                    Sign In Here
                  </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden lg:block relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 z-10"></div>
          <img
            src={CUBE_GROUP_IMAGE}
            alt="Abstract futuristic background"
            className="h-full w-full object-cover transform scale-110 transition-transform duration-7000 group-hover:scale-125"
          />
          <div className="absolute bottom-10 left-10 right-10 bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transform transition-all duration-500 group-hover:scale-105">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Rocket className="h-8 w-8 text-blue-400" />
              Join Our Creative Space
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Access powerful tools, connect with like-minded creators, and bring your ideas to life in our collaborative environment.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default App;