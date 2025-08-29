import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeDScene from './../../components/ThreeDModel';
import ClientLandingTextData from '../../assets/data/ClientLandingTextData.json';
import ScrollText from '../../components/Scrolltext';
import AnimatedImages from '../../components/AnimatedImages';
import Explosion from '../../components/Explosion';
import './style.sass';

import LightbulbLoader from '../../components/Loader';

const ClientLanding: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    const updateScrollProgress = () => {
      const progress =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress(); // initial
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div
        className="ClientLandingMain"
        style={{ '--scroll-progress': scrollProgress } as React.CSSProperties}
      >
        <LightbulbLoader />
        <section className="part-1">
          <h1>Une idée&nbsp;?</h1>
          <h2>Complétez vos projets par un site internet</h2>
          <p>scroll</p>
          <div className="lightbulb">
            <Canvas
              dpr={[1, 2]}
              shadows
              frameloop="demand" // optimise le rendu pour les scènes statiques :contentReference[oaicite:5]{index=5}
              camera={{ position: [0, 0, 5], fov: 75 }}
            >
              <Suspense fallback={null}>
                <ThreeDScene scrollProgress={scrollProgress} />
              </Suspense>
            </Canvas>
          </div>
          <div className="triangle-wrapper1">
            <div className="triangle1"></div>
          </div>
        </section>
        <section className="part-2">
          <div className={`square`}>
            <div className="triangle-wrapper2">
              <div className="triangle2"></div>
            </div>
          </div>
          <h2>Faites moi part de vos ambitions</h2>
          {ClientLandingTextData.map((item, idx) => (
            <ScrollText
              key={idx}
              text={item.text}
              left={parseFloat(item.left)}
              top={parseFloat(item.top)}
              startingscroll={parseFloat(item.startingscroll)}
              scrollProgress={scrollProgress}
            />
          ))}
        </section>
        <section className="part-3">
          <div className="scene">
            <div className="cube">
              <div className="face front" />
              <div className="face back" />
              <div className="face right" />
              <div className="face left" />
              <div className="face bottom" />
            </div>
          </div>
          <AnimatedImages scrollProgress={scrollProgress} />
          <h2>Et en seulement trois journées...</h2>
        </section>
        <section className="part-4">
          <Explosion scrollProgress={scrollProgress} />
          <h2>Votre site web est prêt !</h2>
        </section>
      </div>
    </>
  );
};

export default ClientLanding;
