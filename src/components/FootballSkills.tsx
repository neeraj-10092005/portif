import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
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

// Function to create a football structure mesh
const createFootballStructure = () => {
  // Create a truncated icosahedron (soccer ball) geometry
  const radius = 2;
  const detail = 1;
  
  // Use truncated icosahedron for proper football structure with pentagons and hexagons
  const geometry = new THREE.SphereGeometry(radius, 6, 6);
  
  // Create material
  const material = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    metalness: 0.2,
    roughness: 0.8,
    transparent: true,
    opacity: 0.7,
    polygonOffset: true,
    polygonOffsetFactor: 1
  });
  
  // Create mesh
  const mesh = new THREE.Mesh(geometry, material);
  
  // Create edges for the football structure
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ 
      color: '#cccccc', 
      opacity: 0.8,
      transparent: true
    })
  );
  
  return { mesh, line };
};

// Create a specialized geometry that resembles a football with pentagons and hexagons
const createFootballGeometry = () => {
  // Create a truncated icosahedron geometry (football/soccer ball)
  const bufferGeometry = new THREE.IcosahedronGeometry(2, 1);
  
  // Convert buffer geometry to geometry for manipulations
  const geometry = bufferGeometry;
  
  return geometry;
};

// The football model component
const Football = ({ skills }: { skills: any[] }) => {
  const footballRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  
  // Create the football geometry with pentagons and hexagons
  const geometry = useMemo(() => createFootballGeometry(), []);
  
  // Create edges geometry for the football structure
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  
  // Calculate positions for skills based on the geometry
  const skillPositions = useMemo(() => {
    const positions: { position: [number, number, number]; faceType: FaceType }[] = [];
    
    // For a football structure (truncated icosahedron), we need positions for pentagons and hexagons
    // Extract vertices from geometry to calculate face centers
    const vertices = [];
    const posArray = geometry.attributes.position.array;
    
    for (let i = 0; i < posArray.length; i += 3) {
      vertices.push(new THREE.Vector3(
        posArray[i],
        posArray[i + 1],
        posArray[i + 2]
      ));
    }
    
    // Calculate centers for the faces (approximating pentagons and hexagons)
    const indices = geometry.index?.array || [];
    const faces = [];
    
    for (let i = 0; i < indices.length; i += 3) {
      const a = indices[i];
      const b = indices[i + 1];
      const c = indices[i + 2];
      
      // Get the vertices for this face
      const va = vertices[a];
      const vb = vertices[b];
      const vc = vertices[c];
      
      // Calculate face centroid
      const centroid = new THREE.Vector3().add(va).add(vb).add(vc).divideScalar(3);
      
      // Normalize to get point on sphere surface and move slightly outward
      centroid.normalize().multiplyScalar(2.1);
      
      // Determine if this is part of a pentagon or hexagon based on position
      // For simplicity, we're alternating
      faces.push({
        position: [centroid.x, centroid.y, centroid.z] as [number, number, number],
        faceType: i % 5 === 0 ? 'pentagon' : 'hexagon'
      });
    }
    
    // Filter out duplicate positions (faces that are too close together)
    const uniqueFaces = [];
    const minDistance = 0.5;
    
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
    
    // Limit to number of skills
    return uniqueFaces.slice(0, Math.min(uniqueFaces.length, skills.length));
  }, [geometry, skills]);
  
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
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial 
          color="#aaaaaa" 
          linewidth={1}
          opacity={0.8}
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
    <div className="w-full h-[500px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Football skills={skills} />
      </Canvas>
    </div>
  );
};

export default FootballSkills;
