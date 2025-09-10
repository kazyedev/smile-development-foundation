import { ReactNode } from "react";

export default function AuthLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Simple server component layout - authentication will be handled by individual pages
  return <>{children}</>;
}


