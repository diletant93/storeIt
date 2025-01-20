import { cn, getFileIcon } from "@/lib/utils";
import { ThumbnailProps } from "@/types/props";
import Image from "next/image";

export default function Thumbnail({ type, extension, imageClassName, className, url = '' }: ThumbnailProps) {
  const isImage = type === 'image' && extension !== 'svg'

  return (
    <figure className={cn('thumbnail',className)}>
      <Image src={isImage ? url : getFileIcon(extension, type)}
        alt="thunbail"
        width={100}
        height={100}
        className={cn('size-8 object-contain', imageClassName, isImage && 'thumbnail-image')} />
    </figure>
  );
}
