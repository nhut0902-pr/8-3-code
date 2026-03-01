import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const HeartShape = React.forwardRef(({ position, rotation, scale, color }, ref) => {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(0, 0);
        s.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        s.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
        s.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
        s.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
        return s;
    }, []);

    const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 };

    return (
        <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </mesh>
    );
});

const FallingLeaves = ({ count = 40 }) => {
    const leaves = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                x: (Math.random() - 0.5) * 8,
                y: Math.random() * 10 + 2,
                z: (Math.random() - 0.5) * 8,
                speed: 0.02 + Math.random() * 0.03,
                rotationSpeed: [Math.random() * 0.02, Math.random() * 0.02, Math.random() * 0.02],
                scale: 0.05 + Math.random() * 0.08,
                color: ['#ff85a1', '#fbb1bd', '#ff99ac', '#fccad3'][Math.floor(Math.random() * 4)]
            });
        }
        return temp;
    }, [count]);

    const refs = useRef([]);

    useFrame(() => {
        refs.current.forEach((ref, i) => {
            if (ref) {
                ref.position.y -= leaves[i].speed;
                ref.rotation.x += leaves[i].rotationSpeed[0];
                ref.rotation.y += leaves[i].rotationSpeed[1];
                ref.rotation.z += leaves[i].rotationSpeed[2];

                if (ref.position.y < -3) {
                    ref.position.y = 7;
                }
            }
        });
    });

    return (
        <group>
            {leaves.map((leaf, i) => (
                <HeartShape
                    key={i}
                    ref={(el) => (refs.current[i] = el)}
                    position={[leaf.x, leaf.y, leaf.z]}
                    scale={leaf.scale}
                    color={leaf.color}
                />
            ))}
        </group>
    );
};

const Tree = ({ scale = 1 }) => {
    const leaves = useMemo(() => {
        const temp = [];
        const count = 280;

        for (let i = 0; i < count; i++) {
            const t = Math.random() * Math.PI * 2;
            const x = 1.3 * (16 * Math.pow(Math.sin(t), 3)) / 16;
            const y = 1.3 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;

            const r = Math.sqrt(Math.random());
            const px = x * r;
            const py = (y * r) + 1.8;
            const pz = (Math.random() - 0.5) * 1.2;

            temp.push({
                position: [px, py, pz],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
                scale: 0.07 + Math.random() * 0.1,
                color: ['#ff85a1', '#fbb1bd', '#ff99ac', '#fccad3', '#ff4d6d', '#ffb3c1', '#ffd6e0'][Math.floor(Math.random() * 7)]
            });
        }
        return temp;
    }, []);

    return (
        <group position={[0, -1, 0]} scale={scale}>
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.05, 0.1, 2.2, 12]} />
                <meshStandardMaterial color="#4d3424" />
            </mesh>

            {leaves.map((props, i) => (
                <HeartShape key={i} {...props} />
            ))}
        </group>
    );
};

export default function HeartTree() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 1.2, 7.5], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[5, 5, 5]} intensity={1.2} />
                <spotLight position={[-5, 5, 5]} angle={0.2} penumbra={1} />
                <React.Suspense fallback={null}>
                    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
                        <Tree scale={1.35} />
                    </Float>
                    <FallingLeaves />
                    <Environment preset="sunset" />
                </React.Suspense>
                <OrbitControls enableZoom={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.5} />
            </Canvas>
        </div>
    );
}
