import React, { useEffect, useRef } from 'react';
import './style.sass';
import Footer from '../../components/Footer';

// Liste des images à afficher (à adapter selon ta source de données)
const images = [
  'image2.webp',
  'image3.webp',
  'image4.webp',
  'image5.webp',
  'image6.webp',

  'image7.webp',
  'image1.jpg',
  'image8.webp',
  'image9.webp',
  'image10.webp',
  'image11.webp',
];

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
          <a>Retourner à l'écran d'acceuil</a>
          <a>À propos</a>
        </header>
        <div className="grid" ref={gridRef}>
          {images.map((img, idx) => (
            <div className="grid-item" key={idx}>
              <img
                src={`/ezgif-split/${img}`}
                alt=""
                onLoad={recalcSpans}
                style={{ visibility: 'visible' }}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Portfolio;
