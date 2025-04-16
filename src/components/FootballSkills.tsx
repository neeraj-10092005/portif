
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Define the properties that will be passed to our Skill Text component
interface SkillTextProps {
  position: [number, number, number];
  text: string;
  icon: React.ReactNode;
  category: string;
  fontSize?: number;
  color?: string;
}

// Football face types
type FaceType = 'pentagon' | 'hexagon';

// Component to render text on the football faces
const SkillText: React.FC<SkillTextProps> = ({ position, text, fontSize = 0.15, color = 'white' }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <Text
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.01}
      outlineColor="#000000"
      scale={hover ? 1.2 : 1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {text}
    </Text>
  );
};

// The football model component
const Football = ({ skills }: { skills: any[] }) => {
  const footballRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  
  // Create the football geometry
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 1); // Using icosahedron as base for football
  }, []);
  
  // Calculate positions for skills based on the geometry
  const skillPositions = useMemo(() => {
    const positions: { position: [number, number, number]; faceType: FaceType }[] = [];
    const vertices = geometry.attributes.position.array;
    
    // Map some vertices to create positions for skills
    // For a proper football, we'd need to calculate exact positions based on the geometry
    for (let i = 0; i < skills.length && i < vertices.length/3; i++) {
      const idx = i * 3;
      const x = vertices[idx] as number;
      const y = vertices[idx + 1] as number;
      const z = vertices[idx + 2] as number;
      
      // Push point slightly outside the sphere surface
      const length = Math.sqrt(x*x + y*y + z*z);
      const normalized: [number, number, number] = [
        x / length * 2.1, 
        y / length * 2.1, 
        z / length * 2.1
      ];
      
      positions.push({ 
        position: normalized, 
        faceType: i % 3 === 0 ? 'pentagon' : 'hexagon'
      });
    }
    
    return positions;
  }, [geometry, skills]);
  
  // Auto-rotation animation
  useFrame((state, delta) => {
    if (footballRef.current) {
      footballRef.current.rotation.y += delta * 0.2; // Rotate around Y axis
      footballRef.current.rotation.x += delta * 0.05; // Slight tilt on X axis
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh ref={footballRef} geometry={geometry}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.2}
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={1}
        />
        <meshStandardMaterial
          wireframe
          color="#1A1F2C"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Render skills on the football */}
      {skills.slice(0, skillPositions.length).map((skill, i) => (
        <SkillText
          key={i}
          position={skillPositions[i].position}
          text={skill.name}
          icon={skill.icon}
          category={skill.category}
          color={skillPositions[i].faceType === 'pentagon' ? '#F97316' : '#ffffff'}
          fontSize={0.15}
        />
      ))}
    </>
  );
};

// Main component that will be exported
const FootballSkills = ({ skills }: { skills: any[] }) => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={false} // User can manually rotate, the ball already rotates
        />
        <Football skills={skills} />
      </Canvas>
    </div>
  );
};

export default FootballSkills;
