'use client';

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Supabase Provider</div>
      {children}
    </div>
  );
}