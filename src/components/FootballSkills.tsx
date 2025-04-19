
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface SkillTextProps {
  position: [number, number, number];
  text: string;
  category: string;
  fontSize?: number;
  color?: string;
}

const SkillText = ({ position, text, fontSize = 0.15, color = 'white' }: SkillTextProps) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Text
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.01}
      outlineColor="#000000"
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {text}
    </Text>
  );
};

const SimpleBall = ({ skills }: { skills: any[] }) => {
  // Create a simpler ball with predefined positions
  const radius = 2;
  const positions = React.useMemo(() => {
    const positions = [];
    
    // Generate positions on a sphere
    for (let i = 0; i < Math.min(skills.length, 32); i++) {
      const phi = Math.acos(-1 + (2 * i) / Math.min(skills.length, 32));
      const theta = Math.sqrt(Math.min(skills.length, 32) * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      const isPentagon = i % 2 === 0;
      
      positions.push({
        position: [x, y, z] as [number, number, number],
        isPentagon
      });
    }
    
    return positions;
  }, [skills.length]);
  
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Simplified ball */}
      <mesh>
        <icosahedronGeometry args={[radius, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Skill labels */}
      {skills.slice(0, positions.length).map((skill, i) => (
        <SkillText
          key={i}
          position={positions[i].position}
          text={skill.name}
          category={skill.category}
          color={positions[i].isPentagon ? '#F97316' : '#ffffff'}
        />
      ))}
    </>
  );
};

const FootballSkills = ({ skills }: { skills: any[] }) => {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
        <SimpleBall skills={skills} />
      </Canvas>
    </div>
  );
};

export default FootballSkills;
