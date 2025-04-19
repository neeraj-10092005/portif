
import React, { useMemo } from 'react';
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

const Football = ({ skills }: { skills: any[] }) => {
  const radius = 2;
  
  // Create football geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(radius, 1);
    const positionAttribute = geo.attributes.position;
    const vertices = [];
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertices.push(new THREE.Vector3(
        positionAttribute.getX(i),
        positionAttribute.getY(i),
        positionAttribute.getZ(i)
      ));
    }
    
    vertices.forEach(vertex => {
      vertex.normalize().multiplyScalar(radius);
    });
    
    for (let i = 0; i < positionAttribute.count; i++) {
      positionAttribute.setXYZ(
        i,
        vertices[i].x,
        vertices[i].y,
        vertices[i].z
      );
    }
    
    return geo;
  }, []);
  
  // Create edges geometry for the lines
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  
  // Calculate skill positions on the football
  const skillPositions = useMemo(() => {
    const positions = [];
    const vertices = [];
    const posArray = geometry.attributes.position.array;
    
    for (let i = 0; i < posArray.length; i += 3) {
      vertices.push(new THREE.Vector3(
        posArray[i],
        posArray[i + 1],
        posArray[i + 2]
      ));
    }
    
    const indices = geometry.index?.array || [];
    for (let i = 0; i < indices.length; i += 3) {
      const va = vertices[indices[i]];
      const vb = vertices[indices[i + 1]];
      const vc = vertices[indices[i + 2]];
      
      const center = new THREE.Vector3()
        .add(va)
        .add(vb)
        .add(vc)
        .divideScalar(3);
      
      center.normalize().multiplyScalar(2.2);
      
      const faceType = i % 6 === 0 ? 'pentagon' : 'hexagon';
      
      positions.push({
        position: [center.x, center.y, center.z],
        faceType
      });
    }
    
    return positions.filter((pos, index) => {
      const isUnique = positions.findIndex((p) => {
        const distance = Math.sqrt(
          Math.pow(p.position[0] - pos.position[0], 2) +
          Math.pow(p.position[1] - pos.position[1], 2) +
          Math.pow(p.position[2] - pos.position[2], 2)
        );
        return distance < 0.5;
      }) === index;
    }).slice(0, 32);
  }, [geometry]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="white"
          metalness={0.2}
          roughness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial 
          color="#cccccc"
          transparent
          opacity={0.8}
        />
      </lineSegments>
      
      {skills.slice(0, skillPositions.length).map((skill, i) => (
        <SkillText
          key={i}
          position={skillPositions[i].position}
          text={skill.name}
          category={skill.category}
          color={skillPositions[i].faceType === 'pentagon' ? '#F97316' : '#ffffff'}
          fontSize={0.15}
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
        <Football skills={skills} />
      </Canvas>
    </div>
  );
};

export default FootballSkills;
