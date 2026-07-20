import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-start justify-center px-6 pt-20 pb-12">
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;