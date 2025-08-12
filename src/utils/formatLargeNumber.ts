// utils/formatLargeNumber.ts

type Lang = 'en' | 'ar';
type Type = 'view' | 'download' | 'read';

const typeWords: Record<Type, { en: { singular: string; plural: string }; ar: string }> = {
  view: { en: { singular: 'view', plural: 'views' }, ar: 'مشاهدة' },
  download: { en: { singular: 'download', plural: 'downloads' }, ar: 'تحميل' },
  read: { en: { singular: 'read', plural: 'reads' }, ar: 'قراءة' },
};

export function formatLargeNumber(
  value: number,
  type: Type = 'view',
  lang: Lang = 'ar'
): string {
  if (lang === 'en') {
    const { formattedNumber, formatIndicator } = formatEnglish(value);
    const typeWord = value === 1 ? typeWords[type].en.singular : typeWords[type].en.plural;
    return `${formattedNumber}${formatIndicator} ${typeWord}`;
  }

  const { formattedNumber, formatIndicator } = formatArabic(value);
  const typeWord = typeWords[type].ar;
  return `${formattedNumber}${formatIndicator} ${typeWord}`;
}

// Format English like 1.2k, 2M, etc.
function formatEnglish(value: number): { formattedNumber: string; formatIndicator: string } {
  if (value >= 1_000_000) {
    const num = value / 1_000_000;
    const formattedNumber = num % 1 === 0 ? num.toString() : num.toFixed(1);
    return { formattedNumber, formatIndicator: 'M' };
  }
  if (value >= 1_000) {
    const num = value / 1_000;
    const formattedNumber = num % 1 === 0 ? num.toString() : num.toFixed(1);
    return { formattedNumber, formatIndicator: 'k' };
  }
  return { formattedNumber: value.toString(), formatIndicator: '' };
}

// Format Arabic like ألف, مليون, etc.
function formatArabic(value: number): { formattedNumber: string; formatIndicator: string } {
  if (value >= 1_000_000) {
    const num = value / 1_000_000;
    const formattedNumber = convertToArabicDigits(num % 1 === 0 ? num.toString() : num.toFixed(1));
    return { formattedNumber, formatIndicator: ' مليون' };
  }
  if (value >= 1_000) {
    const num = value / 1_000;
    const formattedNumber = convertToArabicDigits(num % 1 === 0 ? num.toString() : num.toFixed(1));
    return { formattedNumber, formatIndicator: ' ألف' };
  }
  return { formattedNumber: convertToArabicDigits(value.toString()), formatIndicator: '' };
}

function convertToArabicDigits(num: string): string {
  return num.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
}
