import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { generateStorySegment } from '../utils/storyGenerator';

export default function InteractiveStoryScreen({ route, navigation }) {
  const { universe, character, age } = route.params;
  const [storySegment, setStorySegment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const loadStorySegment = async (context = '') => {
    setLoading(true);
    const segment = await generateStorySegment({ universe, character, age }, context);
    setLoading(false);
    setStorySegment(segment);
  };

  useEffect(() => {
    loadStorySegment();
  }, []);

  const handleChoice = async (nextPrompt: string) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();

    await loadStorySegment(nextPrompt);
  };

  const handleQuizAnswer = (selectedAnswer: number) => {
    if (storySegment?.quiz) {
      if (selectedAnswer === storySegment.quiz.correctAnswer) {
        toast.success('Bonne réponse ! 🎉');
      } else {
        toast.error('Essaie encore ! 💪');
      }
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#4ECDC4" />
        <Text style={styles.loadingText}>Création de ton histoire...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={{ uri: `https://api.a0.dev/assets/image?text=${universe}%20story%20scene%20for%20kids&aspect=16:9` }}
        style={styles.backgroundImage}
      />
      
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <ScrollView contentContainerStyle={styles.narrationContainer}>
          <Text style={styles.narrationText}>{storySegment?.content}</Text>
        </ScrollView>

        {!showQuiz && storySegment?.choices && (
          <View style={styles.choicesContainer}>
            {storySegment.choices.map((choice, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.choiceButton}
                onPress={() => handleChoice(choice.nextPrompt)}>
                <Text style={styles.choiceText}>{choice.text}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
              </TouchableOpacity>
            ))}
            {storySegment.quiz && (
              <TouchableOpacity 
                style={styles.quizButton}
                onPress={() => setShowQuiz(true)}>
                <MaterialCommunityIcons name="brain" size={24} color="white" />
                <Text style={styles.quizButtonText}>Répondre au quiz</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {showQuiz && storySegment?.quiz && (
          <View style={styles.quizContainer}>
            <Text style={styles.quizQuestion}>{storySegment.quiz.question}</Text>
            {storySegment.quiz.options.map((option, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.quizOption}
                onPress={() => handleQuizAnswer(index)}>
                <Text style={styles.quizOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.backToStoryButton}
              onPress={() => setShowQuiz(false)}>
              <Text style={styles.backToStoryText}>Retour à l'histoire</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#4ECDC4',
    fontSize: 18,
    marginTop: 10,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    padding: 20,
  },
  narrationContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  narrationText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 30,
  },
  choicesContainer: {
    marginBottom: 30,
  },
  choiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
  choiceText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
  },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD93D',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
  quizButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  quizContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  quizQuestion: {
    fontSize: 20,
    color: '#2C3E50',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  quizOption: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  quizOptionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  backToStoryButton: {
    marginTop: 15,
    padding: 10,
  },
  backToStoryText: {
    color: '#4ECDC4',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});