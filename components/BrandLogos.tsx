import Image from 'next/image';

export function CreotechLogo({ className = 'h-12 w-32' }: { className?: string }) {
  return (
    <span className={`relative block ${className}`}>
      <Image
        src="/brand/creotech-logo.png"
        alt="Creotech International Support"
        fill
        sizes="160px"
        className="object-contain object-left"
        priority
      />
    </span>
  );
}

export function RitsumeikanLogo({ className = 'h-12 w-40' }: { className?: string }) {
  return (
    <span className={`relative block ${className}`}>
      <Image
        src="/brand/ritsumeikan-logo.jpg"
        alt="Ritsumeikan University"
        fill
        sizes="180px"
        className="object-contain object-left"
      />
    </span>
  );
}
