import Image from "next/image";

// Screenshots are 1206×2622 iPhone captures, exported at 720px wide.
const W = 720;
const H = 1565;

export default function Phone({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 320px, 70vw",
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`phone ${className}`}>
      <Image src={src} alt={alt} width={W} height={H} sizes={sizes} priority={priority} />
    </div>
  );
}
