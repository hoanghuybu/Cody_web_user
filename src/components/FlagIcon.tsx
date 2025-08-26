import React from 'react';

interface FlagIconProps {
  code: 'vn' | 'us' | 'uk';
  className?: string;
  rounded?: boolean;
}

// Lightweight SVG flags
export const FlagIcon: React.FC<FlagIconProps> = ({ code, className = 'w-6 h-4', rounded = true }) => {
  const common = `${className} ${rounded ? 'rounded-[2px]' : ''} overflow-hidden inline-block`;
  switch (code) {
    case 'vn':
      return (
        <svg aria-label="Vietnam" className={common} viewBox="0 0 60 40">
          <rect width="60" height="40" fill="#DA251D" />
          <polygon fill="#FFDC44" points="30,10 34,24 21,16 39,16 26,24" />
        </svg>
      );
    case 'uk':
      return (
        <svg aria-label="United Kingdom" className={common} viewBox="0 0 60 40">
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0 L60 40 M60 0 L0 40" stroke="#FFF" strokeWidth="8" />
            <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
            <rect x="24" width="12" height="40" fill="#FFF" />
            <rect y="14" width="60" height="12" fill="#FFF" />
            <rect x="26" width="8" height="40" fill="#C8102E" />
            <rect y="16" width="60" height="8" fill="#C8102E" />
        </svg>
      );
    case 'us':
    default:
      return (
        <svg aria-label="United States" className={common} viewBox="0 0 60 40">
          <rect width="60" height="40" fill="#B22234" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} y={(i * 2 + 1) * (40 / 13)} width="60" height={40 / 13} fill="#FFF" />
          ))}
          <rect width="27" height={40 * 7 / 13} fill="#3C3B6E" />
          {Array.from({ length: 9 }).map((_, row) => (
            Array.from({ length: row % 2 === 0 ? 6 : 5 }).map((__, col) => (
              <circle
                key={row + '-' + col}
                cx={4 + col * 4.2 + (row % 2 ? 2.1 : 0)}
                cy={3 + row * 3}
                r={0.6}
                fill="#FFF"
              />
            ))
          ))}
        </svg>
      );
  }
};

export const LanguageFlag: React.FC<{ lang: 'en' | 'vn'; className?: string }> = ({ lang, className }) => {
  if (lang === 'vn') return <FlagIcon code="vn" className={className} />;
  return <FlagIcon code="us" className={className} />;
};

export default FlagIcon;
