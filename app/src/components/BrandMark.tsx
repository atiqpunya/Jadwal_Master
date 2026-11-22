import React from 'react';

interface BrandMarkProps {
  variant?: 'light' | 'dark';
  showIcon?: boolean;
  size?: 'md' | 'sm';
}

export function BrandMark({
  variant = 'light',
  showIcon = true,
  size = 'md',
}: BrandMarkProps) {
  const isDark = variant === 'dark';
  const textSize =
    size === 'sm' ? 'text-xl' : 'text-2xl sm:text-3xl';

  return (
    <div className="flex items-center gap-2">
      {showIcon && (
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={`brandTileGrad-${variant}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
            <rect
              x="4"
              y="4"
              width="24"
              height="24"
              rx="6"
              fill={`url(#brandTileGrad-${variant})`}
            />
            <rect x="8" y="8" width="7" height="7" rx="2" fill="#FFFFFF" opacity="0.92" />
            <rect x="17" y="8" width="7" height="7" rx="2" fill="#FFFFFF" opacity="0.58" />
            <rect x="8" y="17" width="7" height="7" rx="2" fill="#FFFFFF" opacity="0.58" />
            <rect x="17" y="17" width="7" height="7" rx="2" fill="#FFFFFF" opacity="0.92" />
          </svg>
        </div>
      )}
      <div
        className={`inline-block ${textSize}`}
        style={{ paddingRight: size === 'sm' ? '1.05em' : '0.7em' }}
      >
        <span className="relative inline-flex items-baseline">
          <span
            className={`font-light italic tracking-tight ${
              isDark ? 'text-white' : 'text-[#4F46E5]'
            }`}
          >
            timetable
          </span>
          <span
            className={`font-extrabold italic tracking-tight ${
              isDark ? 'text-white' : 'text-[#4F46E5]'
            }`}
          >
            master
          </span>
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 flex"
            style={{
              transform:
                size === 'sm'
                  ? 'translate(calc(100% + 0.36em), 0.28em)'
                  : 'translate(calc(100% + 0.24em), 0.28em)',
            }}
          >
            <span
              className={`inline-flex items-center justify-center rounded-full font-bold not-italic ${
                isDark
                  ? 'bg-white text-[#111214]'
                  : 'bg-[#4F46E5] text-white'
              }`}
              style={{
                fontSize: size === 'sm' ? '0.288em' : '0.192em',
                lineHeight: 1,
                width: '2.05em',
                height: '2.05em',
                letterSpacing: '-0.02em',
              }}
            >
              TM
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}
