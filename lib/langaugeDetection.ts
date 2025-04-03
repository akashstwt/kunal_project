import { SupportedLanguage } from '@/types';

export const supportedLanguages: SupportedLanguage[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
];

// Basic language detection using common patterns and words
// For production, you'd want to use a library or API
export function detectLanguage(text: string): string {
  const lowercaseText = text.toLowerCase();
  
  // Simple pattern matching
  // Spanish
  if (/¿|está|cómo|hola|gracias|buenos días|adiós/.test(lowercaseText)) {
    return 'es';
  }
  // French
  if (/bonjour|merci|comment|ça va|au revoir|s'il vous plaît/.test(lowercaseText)) {
    return 'fr';
  }
  // German
  if (/guten tag|danke|wie geht|auf wiedersehen|bitte/.test(lowercaseText)) {
    return 'de';
  }
  // Italian
  if (/ciao|grazie|come stai|buongiorno|arrivederci|per favore/.test(lowercaseText)) {
    return 'it';
  }
  // Portuguese
  if (/olá|obrigado|como está|bom dia|adeus|por favor/.test(lowercaseText)) {
    return 'pt';
  }
  // Russian (simple transliteration patterns)
  if (/привет|спасибо|как дела|доброе утро|до свидания|пожалуйста/.test(lowercaseText)) {
    return 'ru';
  }
  // Chinese (simple pattern)
  if (/你好|谢谢|再见|请/.test(lowercaseText)) {
    return 'zh';
  }
  // Japanese (simple pattern)
  if (/こんにちは|ありがとう|さようなら|お願いします/.test(lowercaseText)) {
    return 'ja';
  }
  // Korean (simple pattern)
  if (/안녕하세요|감사합니다|안녕히 가세요|부탁합니다/.test(lowercaseText)) {
    return 'ko';
  }
  // Arabic (simple pattern)
  if (/مرحبا|شكرا|كيف حالك|صباح الخير|وداعا|من فضلك/.test(lowercaseText)) {
    return 'ar';
  }
  // Hindi (simple pattern)
  if (/नमस्ते|धन्यवाद|कैसे हो|शुभ प्रभात|अलविदा|कृपया/.test(lowercaseText)) {
    return 'hi';
  }

  // Default to English
  return 'en';
}

export function getLanguageName(code: string): string {
  const language = supportedLanguages.find(lang => lang.code === code);
  return language ? language.name : 'Unknown';
}