import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';



const App = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostFrequent, setMostFrequent] = useState(null);

  


  const handlePrediction = (type) => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      setPredictions((prev) => {
        const newPredictions = [type, ...prev].slice(0, 8);
        calculateMostFrequent(newPredictions);
        return newPredictions;
      });
      setLoading(false);
    }, 2000);
  };

  const calculateMostFrequent = (arr) => {
    const count = arr.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    const max = Math.max(...Object.values(count));
    const mostFrequentItem = Object.keys(count).find((key) => count[key] === max);
    setMostFrequent(mostFrequentItem);
  };

  const resetGame = () => {
    setPredictions([]);
    setMostFrequent(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.predictionsWrapper}>
          {predictions.map((prediction, index) => (
            <View
              key={index}
              style={[
                styles.predictionCircle,
                prediction === 'PLAYER'
                  ? styles.playerCircle
                  : prediction === 'TIE'
                  ? styles.tieCircle
                  : styles.bankerCircle,
              ]}
            >
              <Text style={styles.predictionText}>
                {prediction === 'PLAYER' ? 'P' : prediction === 'TIE' ? 'T' : 'B'}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Image source={require('./assets/joker-logo.png')} style={styles.logo} />

      {/* Joker Images */}
      <Image source={require('./assets/jokerblue.png')} style={styles.jokerBlue} />
      <Image source={require('./assets/Jokerred.png')} style={styles.jokerRed} />

      <View style={styles.backgroundContainer}>
        <Image source={require('./assets/player-tie-banker.png')} style={styles.backgroundLayer} />

        <Image source={require('./assets/buttons.png')} style={styles.buttonsImage} />

        {mostFrequent && (
          <Image
            source={require('./assets/chip.png')}
            style={[styles.chip, styles[`${mostFrequent.toLowerCase()}Chip`]]}
          />
        )}

        {/* Görünmez butonlar */}
        <TouchableOpacity
          style={[styles.invisibleButton, styles.playerArea]}
          onPress={() => handlePrediction('PLAYER')}
        />
        <TouchableOpacity
          style={[styles.invisibleButton, styles.tieArea]}
          onPress={() => handlePrediction('TIE')}
        />
        <TouchableOpacity
          style={[styles.invisibleButton, styles.bankerArea]}
          onPress={() => handlePrediction('BANKER')}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#ffffff" style={styles.customLoader} />}

      <View style={styles.controlButtonsContainer}>
        <TouchableOpacity style={[styles.controlButton, styles.startButton]} onPress={() => {}}>
          <Text style={styles.controlButtonText}>START</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetGame}>
          <Text style={styles.controlButtonText}>RESET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  topContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  predictionsWrapper: {
    flexDirection: 'row-reverse',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 2,
    justifyContent: 'flex-start',
    width: '80%',
    height: 50,
  },
  predictionCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  playerCircle: {
    backgroundColor: '#3962d6',
  },
  tieCircle: {
    backgroundColor: 'green',
  },
  bankerCircle: {
    backgroundColor: '#ee301f',
  },
  predictionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 250,
    height: 300,
    top: '5%',
    left: '-8%',
  },
  backgroundContainer: {
    position: 'relative',
    width: '90%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundLayer: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  buttonsImage: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
    position: 'absolute',
    top: '78%',
  },
  chip: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: '35%',
    left: '47%',
  },
  playerChip: {
    top: '43%',
    left: '12%',
  },
  tieChip: {
    top: '43%',
    left: '44%',
  },
  bankerChip: {
    top: '43%',
    left: '76%',
  },
  invisibleButton: {
    position: 'absolute',
  },
  playerArea: {
    top: '82%',
    left: '5%',
    width: '30%',
    height: '15%',
  },
  tieArea: {
    top: '82%',
    left: '35%',
    width: '30%',
    height: '15%',
  },
  bankerArea: {
    top: '82%',
    left: '65%',
    width: '30%',
    height: '15%',
  },
  jokerBlue: {
    position: 'absolute',
    width: 40,
    height: 225,
    top: '12%',
    left: '1%',
    resizeMode: 'contain',
  },
  jokerRed: {
    position: 'absolute',
    width: 40,
    height: 225,
    top: '70%',
    right: '-2%',
    resizeMode: 'contain',
  },
  customLoader: {
    position: 'absolute',
    top: '15%',
    right: '10%',
  },
  controlButtonsContainer: {
    position: 'absolute',
    top: '30%',
    right: '2%',
    alignItems: 'center',
    marginRight: 2,
  },
  controlButton: {
    backgroundColor: '#1c5dbe',
    padding: 6,
    borderRadius: 5,
    marginVertical: 10,
    width: 100,
    alignItems: 'center',
  },
  startButton: {
    marginBottom: 3,
  },
  resetButton: {
    marginTop: 10,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
