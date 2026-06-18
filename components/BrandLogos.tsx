'use client';

import { useState } from 'react';

export function CreotechLogo({ className = 'h-12 w-28' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 112" role="img" aria-label="Creotech logo" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M96 8c-46 0-84 32-84 72 0 24 14 45 36 58l89-31H89c-18 0-33-12-33-28s15-29 34-29c14 0 25 6 31 16V18C113 12 105 8 96 8Z"
        fill="#2B5EA8"
      />
      <path d="M118 58h23v11c6-8 14-13 25-13 22 0 38 17 38 42h-24c0-13-7-21-18-21-12 0-20 9-20 22v9h-24V58Z" fill="#C02659" />
      <path d="M145 108h83l-95 25 12-25Z" fill="#2B5EA8" opacity=".95" />
      <text x="82" y="102" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="58" fill="#C02659">
        reo
      </text>
    </svg>
  );
}

export function OptionalRitsumeikanLogo({ label }: { label: string }) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <div className="flex min-h-10 items-center gap-3 rounded-2xl border border-rits/20 bg-white px-3 py-2 text-sm font-extrabold text-navy">
      {hasImage ? (
        <img
          src="/brand/ritsumeikan-logo.svg"
          alt="Ritsumeikan logo"
          className="max-h-8 max-w-44 object-contain"
          onError={() => setHasImage(false)}
        />
      ) : (
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rits" aria-hidden="true" />
          {label}
        </span>
      )}
    </div>
  );
}
