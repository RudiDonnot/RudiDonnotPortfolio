// Loader.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import './style.sass';

type Status = 'hidden' | 'visible' | 'fading';

// Paramètres UX
const SHOW_DELAY = 200; // ne montre loader qu'après 200ms
const MIN_DISPLAY = 750; // affiche loader au minimum 750ms
const FADE_DURATION = 1000; // correspond à ton animation SASS

const LightbulbLoader: React.FC = () => {
  const { progress } = useProgress();
  const [status, setStatus] = useState<Status>('hidden');
  const timerShow = useRef<number | undefined>(undefined);
  const timerMin = useRef<number | undefined>(undefined);
  const timerFade = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (progress < 100) {
      timerShow.current = window.setTimeout(() => {
        setStatus('visible');
        timerMin.current = window.setTimeout(() => {}, MIN_DISPLAY);
      }, SHOW_DELAY);
    } else {
      clearTimeout(timerShow.current);
      setStatus((prev) => (prev === 'visible' ? 'fading' : 'fading'));
    }
  }, [progress]);

  // passer à hidden après l'animation
  useEffect(() => {
    if (status === 'fading') {
      timerFade.current = window.setTimeout(
        () => setStatus('hidden'),
        FADE_DURATION
      );
    }
  }, [status]);

  useEffect(
    () => () => {
      clearTimeout(timerShow.current);
      clearTimeout(timerMin.current);
      clearTimeout(timerFade.current);
    },
    []
  );

  if (status === 'hidden') return null;

  return (
    <div
      className={`lightbulb-loader${status === 'fading' ? ' fade-out' : ''}`}
    >
      <div className="loader"></div>
    </div>
  );
};

export default LightbulbLoader;
