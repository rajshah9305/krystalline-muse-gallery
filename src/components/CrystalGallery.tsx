
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CrystalFacetProps {
  position: [number, number, number];
  rotation: [number, number, number];
  imageUrl: string;
  title: string;
  description: string;
  isHighlighted: boolean;
  onClick: () => void;
}

const CrystalFacet: React.FC<CrystalFacetProps> = ({ 
  position, 
  rotation, 
  imageUrl, 
  title, 
  description, 
  isHighlighted,
  onClick 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  
  useFrame((state) => {
    if (meshRef.current && isHighlighted) {
      meshRef.current.rotation.y += 0.01;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh 
        ref={meshRef} 
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial 
          map={texture}
          transparent
          opacity={0.9}
          emissive={isHighlighted ? new THREE.Color('#D4AF37') : new THREE.Color('#000000')}
          emissiveIntensity={isHighlighted ? 0.3 : 0}
        />
      </mesh>
      
      {isHighlighted && (
        <>
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.2}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            {title}
          </Text>
          <Text
            position={[0, -1.8, 0]}
            fontSize={0.12}
            color="#CCCCCC"
            anchorX="center"
            anchorY="middle"
            maxWidth={3}
            textAlign="center"
          >
            {description}
          </Text>
        </>
      )}
    </group>
  );
};

const Crystal: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [selectedFacet, setSelectedFacet] = useState<number | null>(null);
  
  // Sample gallery data - replace with actual Megan Fox images
  const galleryItems = [
    {
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616c19421d1?w=400&h=400&fit=crop&crop=face",
      title: "Portrait Study I",
      description: "Digital art piece capturing ethereal beauty"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
      title: "Cinematic Moment",
      description: "Inspired by iconic film scenes"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      title: "Golden Hour",
      description: "Warm lighting study with golden tones"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop&crop=face",
      title: "Portrait Study II",
      description: "Contemporary digital interpretation"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=400&fit=crop&crop=face",
      title: "Ethereal Glow",
      description: "Soft lighting and turquoise accents"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
      title: "Classic Beauty",
      description: "Timeless elegance captured"
    }
  ];

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation based on time
      groupRef.current.rotation.y += 0.002;
      
      // Subtle movement based on mouse position
      const targetX = (mousePosition.x - 0.5) * 0.1;
      const targetY = (mousePosition.y - 0.5) * 0.1;
      
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central crystal structure with facets */}
      {galleryItems.map((item, index) => {
        const angle = (index / galleryItems.length) * Math.PI * 2;
        const radius = 3;
        const height = (Math.sin(index * 0.5) * 2);
        
        return (
          <CrystalFacet
            key={index}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
            rotation={[0, -angle + Math.PI/2, 0]}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            isHighlighted={selectedFacet === index}
            onClick={() => setSelectedFacet(selectedFacet === index ? null : index)}
          />
        );
      })}
      
      {/* Central glow effect */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial 
          color="#D4AF37" 
          transparent 
          opacity={0.2} 
        />
      </mesh>
    </group>
  );
};

const CrystalScene: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.2} />
      <pointLight 
        position={[
          (mousePosition.x - 0.5) * 10, 
          (mousePosition.y - 0.5) * 10, 
          5
        ]} 
        intensity={1} 
        color="#FFFFFF" 
      />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#D4AF37" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#40E0D0" />
      
      {/* The main crystal */}
      <Crystal mousePosition={mousePosition} />
      
      {/* Camera controls */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        maxDistance={15} 
        minDistance={5}
        autoRotate={false}
      />
    </>
  );
};

const CrystalGallery: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="crystal-container spotlight-cursor">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ width: '100%', height: '100vh' }}
      >
        <CrystalScene mousePosition={mousePosition} />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="crystal-ui" 
           style={{
             '--mouse-x': `${mousePosition.x * 100}%`,
             '--mouse-y': `${mousePosition.y * 100}%`
           } as React.CSSProperties}>
        
        <div className="gallery-info">
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-liquid-gold to-ethereal-turquoise bg-clip-text text-transparent">
            The Krystalline Muse
          </h1>
          <p className="facet-text mb-4">
            A digital tribute celebrating the multifaceted artistry and timeless beauty of Megan Fox through interactive crystal facets.
          </p>
          <div className="facet-text text-xs opacity-70">
            Move your cursor to illuminate • Click facets to focus • Scroll to zoom
          </div>
        </div>

        <div className="crystal-controls">
          <div className="facet-text text-xs">
            <div>Interactive 3D Gallery</div>
            <div className="mt-1 opacity-70">Museum-Quality Digital Art</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrystalGallery;
