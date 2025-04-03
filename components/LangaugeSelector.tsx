import React from 'react';
import { SupportedLanguage } from '@/types';
import { supportedLanguages } from '@/lib/langaugeDetection';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
  autoDetect: boolean;
  onAutoDetectChange: (autoDetect: boolean) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  autoDetect,
  onAutoDetectChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-4 p-2 bg-primary-50 rounded-lg">
      <div className="flex items-center">
        <input
          id="auto-detect"
          type="checkbox"
          checked={autoDetect}
          onChange={(e) => onAutoDetectChange(e.target.checked)}
          className="mr-2 h-4 w-4"
        />
        <label htmlFor="auto-detect" className="text-sm">
          Auto-detect language
        </label>
      </div>
      
      <div className={`flex-1 ${autoDetect ? 'opacity-50' : ''}`}>
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          disabled={autoDetect}
          className="w-full p-2 border rounded-md bg-white"
        >
          {supportedLanguages.map((lang: SupportedLanguage) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;