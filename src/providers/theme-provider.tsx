'use client';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Theme Provider</div>
      {children}
    </div>
  );
}