export default function LocaleLayout({
  children,
  // params: { locale }
}: {
  children: React.ReactNode;
  // params: { locale: string };
}) {
  return (
    <div>
      {/* <div>Locale Layout for {locale}</div> */}
      {children}
    </div>
  );
}