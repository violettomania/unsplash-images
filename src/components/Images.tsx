import Image from './Image';

interface ImagesProps {
  children: Img[];
  lastImageElementRef: (node: HTMLDivElement) => void;
}

export default function Images({ children, lastImageElementRef }: ImagesProps) {
  return (
    <section className='image-container'>
      {children.length === 0 ? (
        <h4>no results found</h4>
      ) : (
        children.map((image, index) => {
          if (children.length === index + 1) {
            return (
              <div ref={lastImageElementRef} key={image.id}>
                <Image
                  key={image.id}
                  src={image.urls.full}
                  alt={image.alt_description}
                />
              </div>
            );
          } else {
            return (
              <Image
                key={image.id}
                src={image.urls.full}
                alt={image.alt_description}
              />
            );
          }
        })
      )}
    </section>
  );
}
