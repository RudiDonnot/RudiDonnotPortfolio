import React, { useState, useEffect } from 'react';
import './App.sass';
import Lightbulb from "../Home/lightbulb.png";
import Letter from "../Home/img2.jpg";
import Colis from "../Home/img3.png"

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const startScrollOffset = window.innerHeight * 0.4; 

  const animationDurationScroll = window.innerHeight * 0.25;

  const animationStartScroll = startScrollOffset;
  const animationEndScroll = startScrollOffset + animationDurationScroll;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      let progress = 0;
        progress = (currentScroll - animationStartScroll) / (animationEndScroll - animationStartScroll);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationStartScroll, animationEndScroll]);

  const imageContainerStyle = {
    '--scroll-progress': scrollProgress,
  };

  return (
    <main style={imageContainerStyle}>
      <span className="loaderscreen"></span>
      <span className="loader"></span>
      <img src={Lightbulb} alt="Idée lumineuse" className="transition-img lightbulb-img"/>
      <img src={Letter} alt="Lettre d'ambitions" className="transition-img letter-img"/>
      <img src={Colis} alt="Colis" className="transition-img colis-img"/>
      <section className="part-1">
        <h3>It work2&nbsp;?</h3>
        <h2>Complétez votre entreprise par un site internet</h2>
        <p>scroll</p>
      </section>
      <section className="part-2">
        <h2>Faites moi part de vos ambitions</h2>
        <span id="img2"></span>
      </section>
      <section className="part-3">
        <h2>Et en seulement trois jours...</h2>
        <span id="img3"></span>
      </section>
      <section className="part-4">…</section>
    </main>
  );
}

export default App;