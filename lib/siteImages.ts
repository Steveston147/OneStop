export type SiteImage = {
  src: string;
  alt: { ja: string; en: string };
  credit: string;
  source: string;
  isMock: boolean;
};

/**
 * Temporary Pexels images for design review only.
 * Replace each src with an approved Ritsumeikan/Creotech asset before public launch.
 */
export const siteImages = {
  home: {
    src: 'https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: {
      ja: '大学の受入担当者が打ち合わせをしているイメージ',
      en: 'University support staff discussing an international hosting case',
    },
    credit: 'Mizuno K / Pexels',
    source: 'https://www.pexels.com/photo/12903168/',
    isMock: true,
  },
  services: {
    src: 'https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: {
      ja: '支援内容を確認するスタッフのイメージ',
      en: 'Staff reviewing support arrangements',
    },
    credit: 'Mizuno K / Pexels',
    source: 'https://www.pexels.com/photo/12903168/',
    isMock: true,
  },
  accommodation: {
    src: 'https://images.pexels.com/photos/28011238/pexels-photo-28011238.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: {
      ja: '宿泊施設の客室イメージ。実際の掲載施設の写真ではありません',
      en: 'Sample accommodation room; not a photo of the listed property',
    },
    credit: 'Pham Ngoc Anh / Pexels',
    source: 'https://www.pexels.com/photo/28011238/',
    isMock: true,
  },
  visitors: {
    src: 'https://images.pexels.com/photos/30052431/pexels-photo-30052431.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: {
      ja: '大学キャンパスを歩く来訪者のイメージ',
      en: 'Visitors walking through a university campus',
    },
    credit: 'Lobiya / Pexels',
    source: 'https://www.pexels.com/photo/30052431/',
    isMock: true,
  },
  contact: {
    src: 'https://images.pexels.com/photos/34159023/pexels-photo-34159023.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      ja: '担当者が相談内容を一緒に確認しているイメージ',
      en: 'Support staff reviewing an enquiry with a visitor',
    },
    credit: 'Anhelina Vasylyk / Pexels',
    source: 'https://www.pexels.com/photo/34159023/',
    isMock: true,
  },
} satisfies Record<string, SiteImage>;

export const mockImageLabel = {
  ja: 'UI確認用サンプル画像',
  en: 'Design sample image',
} as const;
