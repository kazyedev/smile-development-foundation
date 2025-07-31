'use client';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Auth Provider</div>
      {children}
    </div>
  );
}