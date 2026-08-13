export type SiteImage = {
  src: string;
  alt: { ja: string; en: string };
  credit: string;
  source: string;
  isMock: boolean;
};

function abstractSupportGraphic(accent: string, secondary: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f7f3f4"/>
          <stop offset="1" stop-color="#eef2f5"/>
        </linearGradient>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${accent}" stop-opacity="0.94"/>
          <stop offset="1" stop-color="${secondary}" stop-opacity="0.72"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#bg)"/>
      <circle cx="1320" cy="150" r="330" fill="${accent}" opacity="0.08"/>
      <circle cx="220" cy="760" r="290" fill="${secondary}" opacity="0.10"/>
      <path d="M160 610 C360 390 560 380 760 500 S1160 690 1440 360" fill="none" stroke="url(#accent)" stroke-width="54" stroke-linecap="round" opacity="0.72"/>
      <rect x="250" y="215" width="420" height="270" rx="34" fill="#ffffff" opacity="0.88"/>
      <rect x="930" y="420" width="390" height="250" rx="34" fill="#ffffff" opacity="0.88"/>
      <circle cx="380" cy="335" r="52" fill="${accent}" opacity="0.72"/>
      <rect x="460" y="292" width="150" height="24" rx="12" fill="#243247" opacity="0.72"/>
      <rect x="460" y="338" width="118" height="18" rx="9" fill="#667085" opacity="0.55"/>
      <circle cx="1050" cy="535" r="46" fill="${secondary}" opacity="0.72"/>
      <rect x="1120" y="500" width="130" height="22" rx="11" fill="#243247" opacity="0.72"/>
      <rect x="1120" y="542" width="102" height="18" rx="9" fill="#667085" opacity="0.55"/>
    </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * V1 uses repository-owned abstract support graphics instead of third-party
 * photography. This removes external licensing/approval risk while keeping
 * the visual hierarchy intact. Future institutional photography may replace
 * these assets only after explicit usage approval.
 */
export const siteImages = {
  home: {
    src: abstractSupportGraphic('#8f1737', '#344b6d'),
    alt: {
      ja: '国際受入支援と関係者の連携を表す抽象ビジュアル',
      en: 'Abstract visual representing coordinated international visitor support',
    },
    credit: 'OneStop repository-owned visual',
    source: '',
    isMock: false,
  },
  services: {
    src: abstractSupportGraphic('#8f1737', '#596f8d'),
    alt: {
      ja: '複数の支援サービスをひとつの窓口でつなぐ抽象ビジュアル',
      en: 'Abstract visual representing multiple support services coordinated through one contact point',
    },
    credit: 'OneStop repository-owned visual',
    source: '',
    isMock: false,
  },
  accommodation: {
    src: abstractSupportGraphic('#7b3047', '#9b7b5b'),
    alt: {
      ja: '宿泊・住居支援を表す抽象ビジュアル',
      en: 'Abstract visual representing accommodation and housing support',
    },
    credit: 'OneStop repository-owned visual',
    source: '',
    isMock: false,
  },
  visitors: {
    src: abstractSupportGraphic('#8f1737', '#3d6472'),
    alt: {
      ja: '来日前準備から到着後支援までの流れを表す抽象ビジュアル',
      en: 'Abstract visual representing the journey from pre-arrival preparation to settling-in support',
    },
    credit: 'OneStop repository-owned visual',
    source: '',
    isMock: false,
  },
  contact: {
    src: abstractSupportGraphic('#8f1737', '#475b78'),
    alt: {
      ja: '相談内容を整理し担当者につなぐ流れを表す抽象ビジュアル',
      en: 'Abstract visual representing an enquiry being organised and routed to the appropriate support contact',
    },
    credit: 'OneStop repository-owned visual',
    source: '',
    isMock: false,
  },
} satisfies Record<string, SiteImage>;

export const mockImageLabel = {
  ja: 'UI確認用サンプル画像',
  en: 'Design sample image',
} as const;
