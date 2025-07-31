'use client';

export default function IntlProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Intl Provider</div>
      {children}
    </div>
  );
}