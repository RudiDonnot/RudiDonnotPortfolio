import React from 'react';
import type { FC } from 'react';

interface ScrollTextProps {
  text: string;
  left?: number;
  top?: number;
  startingscroll: number;
  scrollProgress: number;
}

const ScrollText: FC<ScrollTextProps> = ({
  text,
  left,
  top,
  startingscroll,
  scrollProgress,
}) => {
  const raw = (scrollProgress - startingscroll) / 0.1;
  const progress = Math.min(Math.max(raw, 0), 1);
  const charCount = Math.floor(text.length * progress);

  const containerStyle: React.CSSProperties = {
    width: '40dvw',
    position: left !== undefined || top !== undefined ? 'absolute' : undefined,
    left: left !== undefined ? `${left}dvw` : undefined,
    top: top !== undefined ? `${top}dvw` : undefined,
    overflow: 'hidden',
  };

  const textStyle: React.CSSProperties = {
    width: `${charCount}ch`,
    display: 'inline-block',
    overflow: 'hidden',
  };

  return (
    <div className="scroll-text" style={containerStyle}>
      <span className="animated-text" style={textStyle}>
        {text}
      </span>
    </div>
  );
};

export default ScrollText;
