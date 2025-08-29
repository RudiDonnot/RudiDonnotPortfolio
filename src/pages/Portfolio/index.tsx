import React, { useEffect, useRef } from 'react';
import './style.sass';
import Footer from '../../components/Footer';

interface ImageData {
  src: string;
  alt: string;
}

// Import automatique de toutes les images .webp dans le dossier assets
const imagesModules = import.meta.glob('../../assets/ImagePortfolio/*.webp', {
  eager: true,
  import: 'default',
});

// Liste JSON avec les alt
const imageData: ImageData[] = [
  { src: 'image2.webp', alt: 'Projet 2' },
  { src: 'image3.webp', alt: 'Projet 3' },
  { src: 'image4.webp', alt: 'Projet 4' },
  { src: 'image5.webp', alt: 'Projet 5' },
  { src: 'image6.webp', alt: 'Projet 6' },
  { src: 'image7.webp', alt: 'Projet 7' },
  { src: 'image8.webp', alt: 'Projet 8' },
  { src: 'image9.webp', alt: 'Projet 9' },
  { src: 'image10.webp', alt: 'Projet 10' },
  { src: 'image11.webp', alt: 'Projet 11' },
];

// Transformation en tableau d'objets avec l'URL générée par Vite
const images: ImageData[] = imageData.map((item) => {
  const key = Object.keys(imagesModules).find((path) =>
    path.endsWith(item.src)
  );
  return {
    src: key ? (imagesModules[key] as string) : '', // fallback vide si pas trouvé
    alt: item.alt,
  };
});

const Portfolio: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const recalcSpans = () => {
    const grid = gridRef.current;
    if (!grid) return;

    const rowHeight = parseInt(
      getComputedStyle(grid).getPropertyValue('grid-auto-rows')
    );
    const gap = parseInt(getComputedStyle(grid).getPropertyValue('gap'));

    grid.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
      const item = img.parentElement as HTMLElement | null;
      if (!item) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const span = Math.ceil(
        (img.clientWidth * ratio + gap) / (rowHeight + gap)
      );
      item.style.gridRowEnd = `span ${span}`;
    });
  };

  useEffect(() => {
    const handleResize = () => recalcSpans();
    window.addEventListener('resize', handleResize);
    recalcSpans();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="portfolio-root">
        <header>
          <a>Retourner à l'écran d'accueil</a>
          <a>À propos</a>
        </header>
        <div className="grid" ref={gridRef}>
          {images.map((img, idx) => (
            <div className="grid-item" key={idx}>
              <img
                src={img.src}
                alt={img.alt}
                onLoad={recalcSpans}
                style={{ visibility: 'visible' }}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Portfolio;
