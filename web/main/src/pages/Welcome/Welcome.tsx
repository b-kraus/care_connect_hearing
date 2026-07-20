import { Button } from "../../components/ui/Button";

function Welcome() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-text">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <div>
          <p className="mb-2 font-semibold text-primary">CareConnect Hearing</p>

          <h1 className="text-4xl font-bold">
            Button Design System
          </h1>
        </div>

        <Button size="lg" fullWidth>
          Primary Button
        </Button>

        <Button variant="secondary" fullWidth>
          Secondary Button
        </Button>

        <Button variant="destructive" fullWidth>
          Destructive Button
        </Button>

        <Button variant="ghost" fullWidth>
          Ghost Button
        </Button>

        <Button loading fullWidth>
          Saving
        </Button>

        <Button disabled fullWidth>
          Disabled Button
        </Button>
      </div>
    </main>
  );
}

export default Welcome;