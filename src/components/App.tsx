import { useCallback, useEffect, useRef, useState } from 'react';
import Search from './Search';
import ColorThemeToggle from './ColorThemeToggle';
import Images from './Images';

const clientID = `?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
const maxImagesPerPage = 10;
const searchUrl = `https://api.unsplash.com/search/photos/`;

export default function App() {
  const [images, setImages] = useState<Img[]>([]);
  const [query, setQuery] = useState('cat');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageElementRef = useRef<HTMLElement | null>(null);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  const handleColorToggle = (isDark: boolean) => {
    setIsDarkTheme(isDark);
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setPage((prevPage) => prevPage + 1);
  }, [isLoading]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (lastImageElementRef.current)
      observer.current.observe(lastImageElementRef.current);
  }, [loadMore]);

  const setLastImageRef = useCallback((node: HTMLElement | null) => {
    lastImageElementRef.current = node;
    if (node && observer.current) observer.current.observe(node);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);

    fetch(
      `${searchUrl}${clientID}&query=${query}&per_page=${maxImagesPerPage}&page=${page}`,
      { signal }
    )
      .then((response) => response.json())
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data.results]);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error:', error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [query, page]);

  return (
    <main>
      <ColorThemeToggle
        onToggle={handleColorToggle}
        isDarkTheme={isDarkTheme}
      />
      <Search onSearch={handleSearch} />
      <Images lastImageElementRef={setLastImageRef}>{images}</Images>
    </main>
  );
}
