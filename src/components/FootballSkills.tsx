
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

interface SkillTextProps {
  position: [number, number, number];
  text: string;
  category: string;
  fontSize?: number;
  color?: string;
}

const SkillText = ({ position, text, fontSize = 0.15, color = 'white' }: SkillTextProps) => {
  const [hovered, setHovered] = React.useState(false);
  
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

interface SimpleBallProps {
  skills: Array<{name: string; category: string}>;
}

const SimpleBall = ({ skills = [] }: SimpleBallProps) => {
  const radius = 2;
  
  // Generate positions on a sphere for the skills
  const positions = React.useMemo(() => {
    const positions = [];
    const totalSkills = Math.min(skills.length, 32);
    
    if (totalSkills === 0) return [];
    
    for (let i = 0; i < totalSkills; i++) {
      const phi = Math.acos(-1 + (2 * i) / totalSkills);
      const theta = Math.sqrt(totalSkills * Math.PI) * phi;
      
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
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Ball geometry */}
      <mesh>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial color="#ffffff" wireframe={true} />
      </mesh>
      
      {/* Skill labels */}
      {positions.length > 0 && skills.slice(0, positions.length).map((skill, i) => (
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

interface FootballSkillsProps {
  skills?: Array<{name: string; category: string}>;
}

const FootballSkills = ({ skills = [] }: FootballSkillsProps) => {
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
