import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { ListRenderItem } from 'react-native';
import { CAR_PARTS, CarPart } from './data';
import CarPartDetailScreen from './CarPartDetailScreen';

type CarPartListScreenProps = {
  onSelectPart: (part: CarPart) => void;
};

function PartVisual({ part }: { part: CarPart }) {
  return (
    <View style={[styles.cardVisual, { backgroundColor: part.accentColor }]}>
      <Text style={styles.cardVisualText}>{part.visualCode}</Text>
    </View>
  );
}

function CarPartListScreen({ onSelectPart }: CarPartListScreenProps) {
  const renderItem: ListRenderItem<CarPart> = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onSelectPart(item)}
    >
      <PartVisual part={item} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.utility}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Sports Car Anatomy</Text>
        <Text style={styles.subtitle}>
          Explore the components that make sports cars exceptional.
        </Text>
      </View>
      <FlatList
        data={CAR_PARTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default function App() {
  const [selectedPart, setSelectedPart] = useState<CarPart | null>(null);

  return (
    <View style={styles.appRoot}>
      {selectedPart ? (
        <CarPartDetailScreen part={selectedPart} onBack={() => setSelectedPart(null)} />
      ) : (
        <CarPartListScreen onSelectPart={setSelectedPart} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },
  screen: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    color: '#17212B',
    fontSize: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: '#4F5B67',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#17212B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  cardVisual: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 180,
  },
  cardVisualText: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 0,
  },
  cardTextContainer: {
    padding: 14,
  },
  cardTitle: {
    color: '#17212B',
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#5D6874',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
});
