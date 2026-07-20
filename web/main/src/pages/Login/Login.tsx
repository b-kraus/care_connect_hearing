import {
  Apple,
  Globe,
  LockKeyhole,
  Mail,
  Monitor,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { TextField } from "../../components/forms/TextField";
import AuthLayout from "../../components/layout/AuthLayout";
import { Button } from "../../components/ui/Button";
import CareConnectLogo from "../../components/branding/CareConnectLogo";
import SocialLogin from "../../components/auth/SocialLogin";


function Login() {

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/status");
};

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        <header className="text-center">
          <div className="mb-6 flex justify-center">
            <CareConnectLogo />
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Welcome back
          </h1>

          <p className="mt-3 text-base text-white/70">
            Sign in to continue to your account.
          </p>
        </header>

        <form 
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
        >
          <TextField
            label="Email address"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@example.com"
            startIcon={<Mail size={20} />}
            required
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            startIcon={<LockKeyhole size={20} />}
            required
          />

          <div className="flex items-center justify-between gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
                <input
                type="checkbox"
                name="rememberMe"
                className="h-4 w-4 rounded border-white/30 accent-primary"
                />

                <span>Remember me</span>
            </label>

            <button
                type="button"
                className="rounded-sm text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
                Forgot password?
            </button>
        </div>
        
        <Button type="submit" size="lg" fullWidth>
            Sign In
        </Button>

        <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />

        <span className="text-sm text-white/50">
            OR
        </span>

        <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex flex-col gap-3">
        <SocialLogin
            icon={Globe}
            provider="Google"
        />

        <SocialLogin
            icon={Monitor}
            provider="Microsoft"
        />

        <SocialLogin
            icon={Apple}
            provider="Apple"
        />
        </div>
                
                </form>
            </div>
            </AuthLayout>
        );
        }

export default Login;