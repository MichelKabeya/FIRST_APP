import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { Group } from 'three';
import { CarPart } from './data';

type CarPartDetailScreenProps = {
  part: CarPart;
  onBack: () => void;
};

function EngineModel({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.75, 0.72, 0.95]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.1, 0.38, 0.72]} />
        <meshStandardMaterial color="#D7DEE3" metalness={0.75} roughness={0.22} />
      </mesh>
      <mesh position={[-0.68, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 1.25, 32]} />
        <meshStandardMaterial color="#26313B" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.68, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 1.25, 32]} />
        <meshStandardMaterial color="#26313B" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.02, 0.58]}>
        <boxGeometry args={[1.42, 0.18, 0.16]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.35} roughness={0.38} />
      </mesh>
    </group>
  );
}

function CaliperModel({ color }: { color: string }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.96, 0.96, 0.16, 64]} />
        <meshStandardMaterial color="#D7DEE3" metalness={0.85} roughness={0.24} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.07, 18, 72]} />
        <meshStandardMaterial color="#8D99A6" metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[0.64, 0.05, 0.2]} rotation={[0.15, 0, -0.22]}>
        <boxGeometry args={[0.42, 1.32, 0.35]} />
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.24, 40]} />
        <meshStandardMaterial color="#26313B" metalness={0.65} roughness={0.3} />
      </mesh>
    </group>
  );
}

function SpoilerModel({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.45, 0]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[2.25, 0.18, 0.58]} />
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.3} />
      </mesh>
      <mesh position={[-0.72, -0.12, 0]}>
        <boxGeometry args={[0.15, 0.95, 0.18]} />
        <meshStandardMaterial color="#26313B" metalness={0.65} roughness={0.28} />
      </mesh>
      <mesh position={[0.72, -0.12, 0]}>
        <boxGeometry args={[0.15, 0.95, 0.18]} />
        <meshStandardMaterial color="#26313B" metalness={0.65} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <boxGeometry args={[1.7, 0.16, 0.34]} />
        <meshStandardMaterial color="#D7DEE3" metalness={0.55} roughness={0.34} />
      </mesh>
    </group>
  );
}

function RotatingPartModel({ part }: { part: CarPart }) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsedTime * 0.55;
    groupRef.current.rotation.x = Math.sin(elapsedTime * 0.7) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {part.modelKind === 'engine' && <EngineModel color={part.accentColor} />}
      {part.modelKind === 'caliper' && <CaliperModel color={part.accentColor} />}
      {part.modelKind === 'spoiler' && <SpoilerModel color={part.accentColor} />}
    </group>
  );
}

export default function CarPartDetailScreen({ part, onBack }: CarPartDetailScreenProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Text style={styles.backButtonText}>Back to Parts</Text>
        </Pressable>
        <Text style={styles.title}>{part.name}</Text>
      </View>

      <View style={styles.canvasStage}>
        <Canvas camera={{ position: [0, 0.15, 4.2], fov: 28 }}>
          <color attach="background" args={['#17212B']} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 5]} intensity={2.8} />
          <pointLight position={[-3, -2, 3]} intensity={1.2} color={part.accentColor} />
          <RotatingPartModel part={part} />
          <gridHelper args={[4.2, 8, '#52606D', '#33404B']} position={[0, -1.08, 0]} />
        </Canvas>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.utilityCard}>
          <Text style={styles.utilityLabel}>Utility</Text>
          <Text style={styles.utilityText}>{part.utility}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F4F7F5',
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  backButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderColor: '#B7C3BE',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#17212B',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  title: {
    color: '#17212B',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 16,
  },
  canvasStage: {
    backgroundColor: '#17212B',
    height: 340,
    width: '100%',
  },
  bottomContainer: {
    padding: 16,
  },
  utilityCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9E2DE',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
    shadowColor: '#17212B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  utilityLabel: {
    color: '#A2632C',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  utilityText: {
    color: '#4F5B67',
    fontSize: 16,
    lineHeight: 24,
  },
});
