import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

function ActionButton({ label, onPress, variant = 'primary' }: ActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.buttonText, variant === 'secondary' && styles.secondaryButtonText]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function App() {
  const [drivingNote, setDrivingNote] = useState('');
  const [favoriteCar, setFavoriteCar] = useState('');
  const [insightStatus, setInsightStatus] = useState('Ready to capture your next observation.');
  const [garageStatus, setGarageStatus] = useState('Your shortlist is waiting.');

  function saveDrivingNote() {
    const note = drivingNote.trim();
    setInsightStatus(
      note.length > 0
        ? 'Insight saved for your performance profile.'
        : 'Add a short note before saving your insight.',
    );
  }

  function saveFavoriteCar() {
    const car = favoriteCar.trim();
    setGarageStatus(
      car.length > 0 ? `${car} has been added to your shortlist.` : 'Enter a model before saving.',
    );
  }

  function resetGarage() {
    setDrivingNote('');
    setFavoriteCar('');
    setInsightStatus('Ready to capture your next observation.');
    setGarageStatus('Your shortlist is waiting.');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.kicker}>Performance Journal</Text>
            <Text style={styles.title}>Sports Car Notes</Text>
            <Text style={styles.subtitle}>
              Record what you admire most about exceptional cars, from precision handling to
              timeless design.
            </Text>
          </View>

          <View style={styles.summaryPanel}>
            <View>
              <Text style={styles.summaryLabel}>Current Focus</Text>
              <Text style={styles.summaryValue}>Design, speed, and control</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Curated</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>What stands out to you?</Text>
            <Text style={styles.sectionText}>
              Add a concise thought about the experience, engineering, or style that makes a
              sports car feel special.
            </Text>
            <TextInput
              multiline
              onChangeText={setDrivingNote}
              placeholder="Example: precise steering, strong brakes, or a confident stance"
              placeholderTextColor="#7A8693"
              style={[styles.input, styles.textArea]}
              value={drivingNote}
            />
            <Text style={styles.statusText}>{insightStatus}</Text>
            <ActionButton label="Save Insight" onPress={saveDrivingNote} />
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Favorite model</Text>
            <Text style={styles.sectionText}>
              Keep track of the sports car you would most like to research, compare, or test drive.
            </Text>
            <TextInput
              onChangeText={setFavoriteCar}
              placeholder="Example: Porsche 911 GT3"
              placeholderTextColor="#7A8693"
              style={styles.input}
              value={favoriteCar}
            />
            <Text style={styles.statusText}>{garageStatus}</Text>
            <ActionButton label="Add to Shortlist" onPress={saveFavoriteCar} />
          </View>

          <View style={styles.actionsRow}>
            <ActionButton label="Reset Notes" onPress={resetGarage} variant="secondary" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 28,
  },
  header: {
    marginBottom: 24,
  },
  kicker: {
    color: '#A2632C',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#17212B',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 40,
  },
  subtitle: {
    color: '#4F5B67',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  summaryPanel: {
    alignItems: 'center',
    backgroundColor: '#17212B',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 18,
  },
  summaryLabel: {
    color: '#B8C4CC',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#E8F3EF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: '#1F6F68',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9E2DE',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    padding: 18,
    shadowColor: '#17212B',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  sectionTitle: {
    color: '#17212B',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  sectionText: {
    color: '#5D6874',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#F8FAF9',
    borderColor: '#CBD6D1',
    borderRadius: 8,
    borderWidth: 1,
    color: '#17212B',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 16,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 108,
    textAlignVertical: 'top',
  },
  statusText: {
    color: '#52606D',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1F6F68',
    borderRadius: 8,
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#B7C3BE',
    borderWidth: 1,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#17212B',
  },
  actionsRow: {
    marginTop: 2,
  },
});
