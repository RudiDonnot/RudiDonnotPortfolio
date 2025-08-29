import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeDModelProps {
  scrollProgress: number;
}

// Hook pour précharger et partager le GLTF
let sharedGLTF: THREE.Group | null = null;
const useSharedGLTF = (url: string) => {
  const { scene } = useGLTF(url);
  if (!sharedGLTF && scene) {
    sharedGLTF = scene;
  }
  return sharedGLTF;
};

const AnimatedGLTFModel: React.FC<ThreeDModelProps> = React.memo(
  ({ scrollProgress }) => {
    const groupRef = useRef<THREE.Group>(null);
    const gltfScene = useSharedGLTF('/models/model.glb');

    // Clonage et configuration des matériaux
    const clonedScene = useMemo(() => {
      if (!gltfScene) return null;

      const scene = gltfScene.clone(true);
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mesh = child;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            const mat = mesh.material;
            mat.metalness = 0.6;
            mat.roughness = 1;
            mat.emissive.setHex(0x000000);
            mat.transparent = mat.transparent ?? false;
            mat.opacity = mat.opacity ?? 1;
            mat.side = THREE.DoubleSide;
          }
        }
      });

      return scene;
    }, [gltfScene]);

    // Calcul du scale initial et position verticale
    const { initialScale, positionY } = useMemo(() => {
      if (!clonedScene) return { initialScale: 1, positionY: -0.6 };
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = box.getSize(new THREE.Vector3());
      const scale = 4 / Math.max(size.x, size.y, size.z);
      return { initialScale: scale, positionY: -0.6 };
    }, [clonedScene]);

    // State pour détecter la largeur de l'écran (mobile-first)
    const [isLargeScreen, setIsLargeScreen] = useState(
      typeof window !== 'undefined' ? window.innerWidth > 430 : false
    );

    useEffect(() => {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 430);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lumière interne
    const internalLight = useMemo(() => {
      const light = new THREE.PointLight(0xffffee, 1000, 5);
      light.position.set(0, 0.05, 0);
      light.castShadow = false;
      return light;
    }, []);

    // Animation frame
    useFrame(() => {
      if (!groupRef.current) return;

      // ❌ Rotation supprimée
      // groupRef.current.rotation.y = scrollProgress * Math.PI * 2;

      // ✅ Seulement translation verticale
      groupRef.current.position.y = positionY + scrollProgress * 2;

      // On applique uniquement le scale de base
      let newScale = initialScale;

      if (isLargeScreen) newScale *= 0.5;

      groupRef.current.scale.setScalar(newScale);
    });

    if (!clonedScene) return null;

    return (
      <>
        <group ref={groupRef}>
          <primitive object={clonedScene} />
          <primitive object={internalLight} />
        </group>
        <OrbitControls enableZoom={false} enablePan={false} />
      </>
    );
  }
);

export default AnimatedGLTFModel;
