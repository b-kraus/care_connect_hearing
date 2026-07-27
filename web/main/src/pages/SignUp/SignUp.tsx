import {
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { TextField } from "../../components/forms/TextField";
import AuthLayout from "../../components/layout/AuthLayout";
import { Button } from "../../components/ui/Button";
import CareConnectLogo from "../../components/branding/CareConnectLogo";

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        <header className="text-center">
          <div className="mb-6 flex justify-center">
            <CareConnectLogo />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Create Account
          </h1>
          <p className="mt-3 text-base text-white/70">
            Sign up to get started with CareConnect Hearing.
          </p>
        </header>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <TextField
            label="Full name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Enter your full name"
            startIcon={<User size={20} />}
            required
          />

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
            autoComplete="new-password"
            placeholder="Create a password"
            startIcon={<LockKeyhole size={20} />}
            required
          />

          <TextField
            label="Confirm password"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirm your password"
            startIcon={<LockKeyhole size={20} />}
            required
          />

          <Button type="submit" size="lg" fullWidth>
            Create Account
          </Button>

          <p className="text-center text-sm text-white/60">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
