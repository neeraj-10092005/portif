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
  
  // Create a ref for the text to keep it facing the camera
  const textRef = useRef<any>(null);
  
  useFrame(({ camera }) => {
    if (textRef.current) {
      // Make text always face the camera
      textRef.current.lookAt(camera.position);
    }
  });
  
  return (
    <Text
      ref={textRef}
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
  const edgesRef = useRef<THREE.LineSegments>(null);
  const { size } = useThree();
  
  // Create the football geometry
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 1); // Using icosahedron as base for football
  }, []);
  
  // Create edges geometry for the football structure
  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry);
  }, [geometry]);
  
  // Calculate positions for skills based on the geometry
  const skillPositions = useMemo(() => {
    const positions: { position: [number, number, number]; faceType: FaceType }[] = [];
    
    // Extract faces from geometry
    const faces = [];
    
    // For an icosahedron with subdivision level 1, we'll have a mix of pentagons and hexagons
    const posArray = geometry.attributes.position.array;
    const indices = geometry.index?.array || [];
    
    // Create an array of faces by extracting triangles
    for (let i = 0; i < indices.length; i += 3) {
      const a = indices[i];
      const b = indices[i + 1];
      const c = indices[i + 2];
      
      // Calculate face centroid
      const ax = posArray[a * 3];
      const ay = posArray[a * 3 + 1];
      const az = posArray[a * 3 + 2];
      
      const bx = posArray[b * 3];
      const by = posArray[b * 3 + 1];
      const bz = posArray[b * 3 + 2];
      
      const cx = posArray[c * 3];
      const cy = posArray[c * 3 + 1];
      const cz = posArray[c * 3 + 2];
      
      const centroidX = (ax + bx + cx) / 3;
      const centroidY = (ay + by + cy) / 3;
      const centroidZ = (az + bz + cz) / 3;
      
      // Normalize to get point on sphere
      const length = Math.sqrt(centroidX**2 + centroidY**2 + centroidZ**2);
      
      faces.push({
        position: [
          centroidX / length * 2.05, 
          centroidY / length * 2.05, 
          centroidZ / length * 2.05
        ] as [number, number, number],
        faceType: i % 5 === 0 ? 'pentagon' : 'hexagon' // Alternating types for visual variety
      });
    }
    
    // Select unique positions by checking distance between points
    const uniqueFaces = [];
    const minDistance = 0.5; // Minimum distance between centers
    
    for (const face of faces) {
      let isUnique = true;
      
      for (const uniqueFace of uniqueFaces) {
        const dx = face.position[0] - uniqueFace.position[0];
        const dy = face.position[1] - uniqueFace.position[1];
        const dz = face.position[2] - uniqueFace.position[2];
        const distance = Math.sqrt(dx**2 + dy**2 + dz**2);
        
        if (distance < minDistance) {
          isUnique = false;
          break;
        }
      }
      
      if (isUnique) {
        uniqueFaces.push(face);
      }
    }
    
    // Limit to the number of skills we have
    return uniqueFaces.slice(0, Math.min(uniqueFaces.length, skills.length));
  }, [geometry, skills]);
  
  // Auto-rotation animation
  useFrame((state, delta) => {
    if (footballRef.current) {
      footballRef.current.rotation.y += delta * 0.2; // Rotate around Y axis
      footballRef.current.rotation.x += delta * 0.05; // Slight tilt on X axis
    }
    
    // Keep edges synced with the football
    if (edgesRef.current && footballRef.current) {
      edgesRef.current.rotation.copy(footballRef.current.rotation);
    }
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Main football mesh */}
      <mesh ref={footballRef} geometry={geometry}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.2}
          roughness={0.8}
          polygonOffset
          polygonOffsetFactor={1}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Add wireframe edges to show football structure */}
      <lineSegments ref={edgesRef}>
        <edgesGeometry attach="geometry" args={[geometry]} />
        <lineBasicMaterial 
          attach="material" 
          color="#cccccc" 
          linewidth={1}
          opacity={0.6}
          transparent
        />
      </lineSegments>
      
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
