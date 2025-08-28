import { useMemo } from 'react';

// Prépare la liste des frames de l'explosion
const frames = Array.from(
  { length: 141 },
  (_, i) => `/ezgif-split/frame(${i + 1}).gif`
);

export default function Explosion({ scrollProgress = 0 }) {
  // Normalise le scroll pour l'animation (0 = début explosion, 1 = fin)
  const t = Math.max(0, Math.min(1, (scrollProgress - 0.91) / 0.04));
  // Calcule l'index de la frame à afficher
  const frameIndex = useMemo(() => Math.floor(t * (frames.length - 1)), [t]);

  if (t <= 0) return null; // Pas d'explosion avant le seuil
  if (t >= 0.98) {
    // Affiche l'image finale
    return (
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '32%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
        }}
      >
        <img
          src={'/ezgif-split/projet9.webp'}
          alt="Projet 9"
          width={600}
          style={{ pointerEvents: 'none', position: 'absolute' }}
        />
      </div>
    );
  }

  // Affiche la frame courante de l'explosion
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
      }}
    >
      <img
        src={frames[frameIndex]}
        alt={`Explosion frame ${frameIndex + 1}`}
        width={600}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
