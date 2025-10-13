// Internationalization configuration
export const defaultLocale = 'ar';
export const locales = ['en', 'ar'];

export function getMessages(locale: string) {
  // Get messages logic
  console.log(locale);
  return {};
}

export function formatMessage(key: string, values?: Record<string, any>) {
  // Format message logic
  console.log(key);
  console.log(values);
  return key;
}