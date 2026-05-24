import { useState, type ImgHTMLAttributes } from 'react';
import styles from './SkeletonImage.module.css';

interface SkeletonImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  /** true (default) = wrapper fills parent via width/height 100% */
  fill?: boolean;
}

export default function SkeletonImage({
  wrapperClassName = '',
  className = '',
  fill = true,
  onLoad,
  ...rest
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`${styles.wrap} ${loaded ? '' : styles.shimmer} ${wrapperClassName}`}
      style={fill ? { width: '100%', height: '100%' } : undefined}
    >
      <img
        {...rest}
        className={className}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.35s ease' }}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </div>
  );
}
