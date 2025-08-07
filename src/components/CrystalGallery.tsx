
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Import local portrait images
import portrait1 from '@/assets/portrait-1.jpg';
import portrait2 from '@/assets/portrait-2.jpg';
import portrait3 from '@/assets/portrait-3.jpg';
import portrait4 from '@/assets/portrait-4.jpg';
import portrait5 from '@/assets/portrait-5.jpg';
import portrait6 from '@/assets/portrait-6.jpg';
import portrait7 from '@/assets/portrait-7.jpg';
import portrait8 from '@/assets/portrait-8.jpg';
import portrait9 from '@/assets/portrait-9.jpg';
import portrait10 from '@/assets/portrait-10.jpg';
import portrait11 from '@/assets/portrait-11.jpg';
import portrait12 from '@/assets/portrait-12.jpg';

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
  const [hovered, setHovered] = useState(false);
  
  // Enhanced animation with multiple parameters
  useFrame((state) => {
    if (meshRef.current) {
      if (isHighlighted) {
        meshRef.current.rotation.y += 0.015;
        meshRef.current.rotation.x += 0.005;
        const scale = 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
        meshRef.current.scale.setScalar(scale);
      } else if (hovered) {
        const hoverScale = 1.1 + Math.sin(state.clock.elapsedTime * 4) * 0.03;
        meshRef.current.scale.setScalar(hoverScale);
        meshRef.current.rotation.y += 0.008;
      } else {
        // Gentle ambient movement
        meshRef.current.rotation.y += 0.002;
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh 
        ref={meshRef} 
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[2.2, 2.2]} />
        <meshStandardMaterial 
          map={texture}
          transparent
          opacity={isHighlighted ? 0.95 : hovered ? 0.9 : 0.85}
          emissive={
            isHighlighted 
              ? new THREE.Color('#D4AF37') 
              : hovered 
                ? new THREE.Color('#40E0D0') 
                : new THREE.Color('#000000')
          }
          emissiveIntensity={isHighlighted ? 0.4 : hovered ? 0.2 : 0}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Enhanced particle effect for highlighted facets */}
      {isHighlighted && (
        <mesh>
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshBasicMaterial 
            color="#D4AF37" 
            transparent 
            opacity={0.1} 
            wireframe
          />
        </mesh>
      )}
      
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
  
  // Gallery data with local images
  const galleryItems = [
    {
      imageUrl: portrait1,
      title: "Portrait Study I",
      description: "Digital art piece capturing ethereal beauty"
    },
    {
      imageUrl: portrait2,
      title: "Cinematic Moment",
      description: "Inspired by iconic film scenes"
    },
    {
      imageUrl: portrait3,
      title: "Golden Hour",
      description: "Warm lighting study with golden tones"
    },
    {
      imageUrl: portrait4,
      title: "Portrait Study II",
      description: "Contemporary digital interpretation"
    },
    {
      imageUrl: portrait5,
      title: "Ethereal Glow",
      description: "Soft lighting and turquoise accents"
    },
    {
      imageUrl: portrait6,
      title: "Classic Beauty",
      description: "Timeless elegance captured"
    },
    {
      imageUrl: portrait7,
      title: "Dramatic Luminance",
      description: "Professional cinematic lighting study"
    },
    {
      imageUrl: portrait8,
      title: "Artistic Vision",
      description: "Moody atmospheric composition"
    },
    {
      imageUrl: portrait9,
      title: "Ethereal Dreams",
      description: "Soft focus with golden bokeh"
    },
    {
      imageUrl: portrait10,
      title: "High Fashion",
      description: "Studio lighting with dramatic contrast"
    },
    {
      imageUrl: portrait11,
      title: "Dynamic Grace",
      description: "Hair in motion with turquoise accents"
    },
    {
      imageUrl: portrait12,
      title: "Natural Elegance",
      description: "Contemporary beauty with gentle warmth"
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
        const innerRadius = 2.5;
        const outerRadius = 4;
        const radius = index % 2 === 0 ? innerRadius : outerRadius;
        const height = (Math.sin(index * 0.8) * 3) + (Math.cos(index * 1.2) * 1.5);
        
        return (
          <CrystalFacet
            key={index}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
            rotation={[
              Math.sin(index * 0.3) * 0.2,
              -angle + Math.PI/2,
              Math.cos(index * 0.4) * 0.1
            ]}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            isHighlighted={selectedFacet === index}
            onClick={() => setSelectedFacet(selectedFacet === index ? null : index)}
          />
        );
      })}
      
      
      {/* Enhanced central glow with multiple layers */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial 
          color="#D4AF37" 
          transparent 
          opacity={0.15} 
        />
      </mesh>
      
      {/* Outer energy field */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial 
          color="#40E0D0" 
          transparent 
          opacity={0.08}
          wireframe
        />
      </mesh>
      
      {/* Floating light particles */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 6 + Math.sin(i * 0.5) * 2;
        const height = Math.cos(i * 0.3) * 4;
        
        return (
          <mesh 
            key={i} 
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial 
              color={i % 2 === 0 ? "#D4AF37" : "#40E0D0"}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const CrystalScene: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const { camera } = useThree();
  
  // Enhanced camera animation
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x += (Math.sin(time * 0.1) * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (Math.cos(time * 0.15) * 0.3 - camera.position.y) * 0.02;
  });

  return (
    <>
      {/* Advanced lighting setup */}
      <ambientLight intensity={0.15} color="#1a1a2e" />
      
      {/* Dynamic mouse-controlled spotlight */}
      <spotLight 
        position={[
          (mousePosition.x - 0.5) * 15, 
          (mousePosition.y - 0.5) * 15 + 5, 
          8
        ]} 
        intensity={2.5}
        angle={Math.PI / 6}
        penumbra={0.5}
        color="#FFFFFF" 
        castShadow
      />
      
      {/* Accent lights for atmosphere */}
      <pointLight position={[8, 8, 8]} intensity={0.8} color="#D4AF37" />
      <pointLight position={[-8, -8, 8]} intensity={0.8} color="#40E0D0" />
      <pointLight position={[0, 10, -5]} intensity={0.4} color="#FFFFFF" />
      
      {/* Rim lighting */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.3} 
        color="#D4AF37"
      />
      <directionalLight 
        position={[-10, -10, 5]} 
        intensity={0.3} 
        color="#40E0D0"
      />
      
      {/* The main crystal */}
      <Crystal mousePosition={mousePosition} />
      
      {/* Camera controls with enhanced settings */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        maxDistance={20} 
        minDistance={4}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </>
  );
};

const CrystalGallery: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Gallery data for UI reference
  const galleryItems = [
    { title: "Portrait Study I" },
    { title: "Cinematic Moment" },
    { title: "Golden Hour" },
    { title: "Portrait Study II" },
    { title: "Ethereal Glow" },
    { title: "Classic Beauty" },
    { title: "Dramatic Luminance" },
    { title: "Artistic Vision" },
    { title: "Ethereal Dreams" },
    { title: "High Fashion" },
    { title: "Dynamic Grace" },
    { title: "Natural Elegance" }
  ];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    // Simulate loading for smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 1000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`crystal-container spotlight-cursor transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 65 }}
        style={{ width: '100%', height: '100vh' }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <CrystalScene mousePosition={mousePosition} />
      </Canvas>
      
      {/* Enhanced UI Overlay with sophisticated animations */}
      <div className="crystal-ui animate-fade-in" 
           style={{
             '--mouse-x': `${mousePosition.x * 100}%`,
             '--mouse-y': `${mousePosition.y * 100}%`
           } as React.CSSProperties}>
        
        <div className="gallery-info backdrop-blur-sm bg-obsidian/20 rounded-lg p-6 border border-liquid-gold/20">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-liquid-gold via-ethereal-turquoise to-liquid-gold bg-clip-text text-transparent animate-pulse">
            The Krystalline Muse
          </h1>
          <p className="facet-text mb-4 leading-relaxed">
            An immersive digital tribute celebrating multifaceted artistry through interactive crystal facets. 
            Experience the convergence of technology and beauty in this museum-quality installation.
          </p>
          <div className="facet-text text-xs opacity-70 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-liquid-gold rounded-full animate-pulse"></span>
              Move cursor to illuminate facets
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-ethereal-turquoise rounded-full animate-pulse"></span>
              Click to focus • Scroll to zoom • Drag to rotate
            </div>
          </div>
        </div>

        <div className="crystal-controls backdrop-blur-sm bg-obsidian/20 rounded-lg p-4 border border-ethereal-turquoise/20">
          <div className="facet-text text-sm">
            <div className="font-semibold text-ethereal-turquoise">Interactive 3D Gallery</div>
            <div className="mt-1 opacity-70 text-xs">Museum-Quality Digital Art</div>
            <div className="mt-2 text-xs opacity-50">
              {galleryItems.length} Curated Pieces
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrystalGallery;
