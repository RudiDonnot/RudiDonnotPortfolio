import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/models/model.glb');
  return <primitive object={scene} scale={30} />;
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
      {/* Lumière externe */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Lumière interne */}
      <pointLight position={[0, 0.2, 0]} intensity={50} color="#ffffee" />

      {/* Modèle */}
      <Model />

      {/* Contrôle souris */}
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
};

export default Scene;
