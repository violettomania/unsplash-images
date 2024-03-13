import { useState, useRef, useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

interface ImageProps {
  src: string;
  alt: string;
}

export default function Image({ src, alt }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleLoad();
    }
  }, []);

  return (
    <>
      {isLoading && (
        <BeatLoader
          color={'#123abc'}
          loading={isLoading}
          size={15}
          style={{ margin: '0 auto' }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`img ${isLoading ? 'img-loading' : ''}`}
        onLoad={handleLoad}
      />
    </>
  );
}
