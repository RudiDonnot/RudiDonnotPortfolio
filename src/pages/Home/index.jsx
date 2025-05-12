import React, { useState, useEffect } from 'react';
import './App.sass';
import Lightbulb from "../Home/img1.png";
import Letter from "../Home/img2.jpg";
import Colis from "../Home/img3.png"

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // ANCIENNES VALEURS (pour référence)
  // const animationStartScroll = 50;
  // const animationEndScroll = window.innerHeight * 0.6;

  // NOUVELLES VALEURS pour que l'animation commence PLUS BAS et soit PLUS RAPIDE

  // 1. Faire commencer l'animation PLUS BAS :
  //    Augmentez la valeur à partir de laquelle l'animation commence.
  //    Par exemple, commençons après que l'utilisateur ait scrollé 40% de la hauteur de la fenêtre.
  //    Vous pouvez aussi utiliser une valeur fixe en pixels si vous préférez (ex: 300).
  const startScrollOffset = window.innerHeight * 0.4; // Démarre après avoir scrollé 40% de la hauteur de la vue

  // 2. Rendre l'animation PLUS RAPIDE :
  //    Réduisez la distance de scroll sur laquelle l'animation se déroule.
  //    Par exemple, l'animation complète se fera sur 30% de la hauteur de la fenêtre.
  //    Une valeur plus petite ici rendra l'animation plus "nerveuse" ou rapide.
  const animationDurationScroll = window.innerHeight * 0.25; // L'animation dure 25% de la hauteur de la vue

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
  }, [animationStartScroll, animationEndScroll]); // Ces dépendances sont importantes

  const imageContainerStyle = {
    '--scroll-progress': scrollProgress,
  };

  return (
    <main>
      <span className="loaderscreen"></span>
      <section className="part-1">
        <h2>Complétez votre entreprise par un site internet</h2>
        <h3>Une idée ?</h3>
        <p>(scroll pour voir l'effet progressif)</p>
        <span className="loader"></span>

        <div
          className="image-transition-container"
          style={imageContainerStyle}
        >
          <img src={Lightbulb} alt="Idée lumineuse" className="transition-img lightbulb-img"/>
          <img src={Letter} alt="Lettre d'ambitions" className="transition-img letter-img"/>
          <img src={Colis} alt="Colis" className="transition-img colis-img"/>
        </div>
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