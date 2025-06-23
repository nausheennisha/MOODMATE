import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const moods = [
  { emoji: '😄', label: 'Happy', color: '#FFFACD' },
  { emoji: '😊', label: 'Calm', color: '#E0FFFF' },
  { emoji: '😐', label: 'Okay', color: '#F0E68C' },
  { emoji: '😢', label: 'Sad', color: '#FFDAB9' },
  { emoji: '😱', label: 'Stressed', color: '#E6E6FA' },
];

const quotes = {
  Happy: [
    "Happiness is contagious, keep spreading it.",
    "Keep smiling, life is good!",
  ],
  Calm: [
    "Peace comes from within.",
    "Breathe in calm, breathe out stress.",
  ],
  Okay: [
    "You're doing fine. Keep going.",
    "Even 'okay' is a good place to start from.",
  ],
  Sad: [
    "It's okay to feel sad. Brighter days are ahead.",
    "Let the tears flow, and then let joy in.",
  ],
  Stressed: [
    "Pause. Breathe. Reset.",
    "You are not alone in this storm.",
  ],
};

const activities = {
  Happy: [
    "Share your joy with someone 🎉",
    "Take a fun selfie 📸",
  ],
  Calm: [
    "Meditate for 5 mins 🧘‍♀️",
    "Enjoy a cup of tea 🍵",
  ],
  Okay: [
    "Watch a short funny video 😂",
    "Do light stretching 💪",
  ],
  Sad: [
    "Write your feelings in a journal 📓",
    "Listen to comforting music 🎧",
  ],
  Stressed: [
    "Do a 2-minute breathing exercise 🌬️",
    "Take a short nature walk 🌿",
  ],
};

export default function MoodMate() {
  const [selectedMoodIndex, setSelectedMoodIndex] = useState<number | null>(null);
  const [quote, setQuote] = useState('');
  const [activity, setActivity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMoodPress = (index: number) => {
    setSelectedMoodIndex(index);
    setQuote('');
    setActivity('');
    setLoading(true);

    setTimeout(() => {
      const moodLabel = moods[index].label;
      const moodQuotes = quotes[moodLabel];
      const moodActivities = activities[moodLabel];

      const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
      const randomActivity = moodActivities[Math.floor(Math.random() * moodActivities.length)];

      setQuote(randomQuote);
      setActivity(randomActivity);
      setLoading(false);
    }, 1000);
  };

  const currentMood = selectedMoodIndex !== null ? moods[selectedMoodIndex] : null;
  const backgroundColor = currentMood?.color || '#E0F7FA';

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>🌈 MoodMate</Text>
      <Text style={styles.subtitle}>How are you feeling?</Text>

      <View style={styles.moodRow}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMoodPress(index)}
            style={[
              styles.moodButton,
              selectedMoodIndex === index && styles.activeMoodButton,
            ]}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentMood && (
        <Text style={styles.moodText}>
          You feel <Text style={{ fontWeight: 'bold' }}>{currentMood.label}</Text> {currentMood.emoji}
        </Text>
      )}

      <View style={styles.resultCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#555" />
        ) : (
          <>
            <Text style={styles.sectionTitle}>💬 Quote</Text>
            <Text style={styles.resultText}>{quote || 'Tap a mood to get inspired.'}</Text>

            <Text style={styles.sectionTitle}>🎲 Suggested Activity</Text>
            <Text style={styles.resultText}>{activity || 'You’ll see a self-care suggestion here.'}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#555',
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  moodButton: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 40,
    margin: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  activeMoodButton: {
    borderColor: '#000',
  },
  emoji: {
    fontSize: 28,
  },
  moodText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#444',
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
    elevation: 3,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
});
