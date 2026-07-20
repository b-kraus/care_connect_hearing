import { Mail, Search } from "lucide-react";

import { TextField } from "../../components/forms/TextField";
import { Button } from "../../components/ui/Button";

function Welcome() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-text">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <div>
          <p className="mb-2 font-semibold text-primary">
            CareConnect Hearing
          </p>

          <h1 className="text-4xl font-bold">
            Form Design System
          </h1>
        </div>

        <TextField
          label="Email address"
          type="email"
          placeholder="name@example.com"
          startIcon={<Mail size={20} />}
          helperText="We will never share your email."
        />

        <TextField
          label="Search"
          type="search"
          placeholder="Search messages"
          startIcon={<Search size={20} />}
        />

        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          errorMessage="Password is required."
        />

        <TextField
          label="Disabled field"
          placeholder="Unavailable"
          disabled
        />

        <Button size="lg" fullWidth>
          Continue
        </Button>
      </div>
    </main>
  );
}

export default Welcome;