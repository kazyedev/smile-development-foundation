// utils/formatArabicDuration.ts

export function formatArabicDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
  
    const hourStr = formatArabicHours(hours);
    const minuteStr = formatArabicMinutes(mins);
  
    if (hourStr && minuteStr) return `${hourStr} و${minuteStr}`;
    return hourStr || minuteStr || '٠ دقيقة';
  }
  
  function formatArabicHours(hours: number): string {
    if (hours === 0) return '';
    if (hours === 1) return 'ساعة';
    if (hours === 2) return 'ساعتان';
    if (hours >= 3 && hours <= 10) return `${convertToArabicNumberWord(hours)} ساعات`;
    return `${convertToArabicDigits(hours)} ساعة`;
  }
  
  function formatArabicMinutes(minutes: number): string {
    if (minutes === 0) return '';
    if (minutes === 1) return 'دقيقة';
    if (minutes === 2) return 'دقيقتان';
    if (minutes >= 3 && minutes <= 10) return `${convertToArabicNumberWord(minutes)} دقائق`;
    return `${convertToArabicDigits(minutes)} دقيقة`;
  }
  
  function convertToArabicDigits(num: number): string {
    return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
  }
  
  function convertToArabicNumberWord(n: number): string {
    const words: Record<number, string> = {
      3: 'ثلاث',
      4: 'أربع',
      5: 'خمس',
      6: 'ست',
      7: 'سبع',
      8: 'ثمان',
      9: 'تسع',
      10: 'عشر',
    };
    return words[n] ?? convertToArabicDigits(n);
  }
  