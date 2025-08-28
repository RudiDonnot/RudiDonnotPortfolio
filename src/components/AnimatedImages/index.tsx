import React from 'react';
import './style.sass';
import ClientLandingImageData from '../../assets/data/ClientLandingImageData';

type ImageSet = {
  a: string;
  b: string;
};

interface Props {
  scrollProgress: number;
}

type Position = {
  top: number;
  left: number;
};

const images: ImageSet[] = ClientLandingImageData;

const toPx = (v: number, unit = 'vh') => `calc(${v}${unit})`;

const AnimatedImages: React.FC<Props> = ({ scrollProgress }) => {
  const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

  const getStyle = (
    from: Position,
    to: Position,
    t: number,
    scale: number
  ) => ({
    top: toPx(lerp(from.top, to.top, t)),
    left: `${lerp(from.left, to.left, t)}vw`,
    transform: `scale(${scale})`,
    opacity: 1,
  });

  const appear = (from: number, to: number) =>
    scrollProgress >= from && scrollProgress <= to;

  const progress = (from: number, to: number) =>
    Math.min(1, Math.max(0, (scrollProgress - from) / (to - from)));

  return (
    <>
      {images.map((img, index) => {
        const startA = 0.6 + index * 0.01;
        const endA = startA + 0.07;
        const holdA = endA + 0.1;

        const startB = 0.77 + index * 0.01;
        const endB = startB + 0.07;

        const aVisible = scrollProgress >= startA && scrollProgress <= holdA;
        const bVisible = appear(startB, endB);

        const posA: Position[] = [
          { top: 50, left: 45 },
          { top: 45, left: index * 12.5 },
        ];

        const posB: Position[] = [
          { top: 45, left: index * 12.5 },
          { top: 50, left: 45 },
        ];

        const scale = progress(startA, startA + 0.03);

        return (
          <React.Fragment key={index}>
            {aVisible && (
              <img
                className="animated-image"
                src={img.a}
                alt={`a-${index}`}
                style={getStyle(
                  posA[0],
                  posA[1],
                  progress(startA, endA),
                  scale
                )}
              />
            )}
            {bVisible && (
              <img
                className="animated-image"
                src={img.b}
                alt={`b-${index}`}
                style={getStyle(
                  posB[0],
                  posB[1],
                  progress(startB, endB),
                  scale
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default AnimatedImages;
