import {View, Text, Image, Alert} from 'react-native';
import questionStyle from './QuestionStyle';
import SplashImage from '../../assets/image.png';
import HappyImage from '../../assets/happy.png';
import {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';

export default function QuestionScreen(props) {
  const route = useRoute();
  const {navigation} = props;
  const {questions} = route.params;

  const [timer, setTimer] = useState(30);
  const [quantityQuestion, setQuantityQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState();
  const [isPlaying, setIsPlaying] = useState(true);

  const initialScreen = () => {
    setTimer(30);
    setIsPlaying(true);
    setSelectedAnswerIndex(null);
    setIsCorrect();
  };

  useEffect(() => {
    if (isPlaying) {
      let interval = setInterval(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(interval);
        setIsPlaying(false);
        Alert.alert('Game over', 'Time to answer questions is over!', [
          {
            text: 'Return to home page',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      }

      return () => clearInterval(interval);
    }
  }, [timer, isPlaying]);

  useEffect(() => {
    let timeOutId;
    if (selectedAnswerIndex !== null) {
      timeOutId = setTimeout(() => {
        setIsPlaying(false);
        if (
          questions[quantityQuestion].answers[selectedAnswerIndex].isCorrect
        ) {
          setIsCorrect(true);
        } else {
          setIsCorrect(false);
        }
      }, 3000);

      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    if (isCorrect) {
      let timeoutIdQuantity = setTimeout(() => {
        setQuantityQuestion(prevQuantity => {
          prevQuantity++;
          if (prevQuantity === questions.length) {
            Alert.alert(
              'Congratulations',
              'Congratulations on completing all questions!',
              [
                {
                  text: 'Return to home page',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
            );
            return prevQuantity--;
          } else {
            initialScreen();
          }
          return prevQuantity;
        });
      }, 1000);
      return () => {
        clearTimeout(timeoutIdQuantity);
      };
    } else if (isCorrect === false && typeof isCorrect === 'boolean') {
      let timeOutCorrect = setTimeout(() => {
        Alert.alert('Wrong', 'You answered wrong!', [
          {
            text: 'Quay về trang chủ',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      }, 1000);
      return () => clearTimeout(timeOutCorrect);
    }
  }, [isCorrect]);

  return (
    <View style={questionStyle.container}>
      <Image style={questionStyle.image} source={SplashImage} />
      {questions[quantityQuestion] && (
        <View style={questionStyle.wrapper}>
          <View style={questionStyle.question}>
            <View style={questionStyle.timer}>
              <Text style={questionStyle.timerText}>{timer}</Text>
            </View>
            {questions[quantityQuestion] &&
              questions[quantityQuestion].image && (
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    marginBottom: 20,
                    borderRadius: 20,
                  }}
                  source={{uri: questions[quantityQuestion].image}}
                />
              )}
            <Text>{questions[quantityQuestion].title}</Text>
          </View>
          <View style={questionStyle.option}>
            {questions[quantityQuestion].answers.map((answer, index) => {
              let style = [questionStyle.text];
              let background;

              if (selectedAnswerIndex === index) {
                if (
                  typeof isCorrect === 'undefined' &&
                  isCorrect === undefined
                ) {
                  background = 'orange';
                } else if (isCorrect === true) {
                  background = 'green';
                } else {
                  background = 'red';
                }
              } else if (isCorrect === false) {
                if (
                  questions[quantityQuestion].answers.findIndex(
                    answer => answer.isCorrect,
                  ) === index
                ) {
                  background = 'green';
                } else {
                  background = 'rgba(0, 0, 0, 0.2)';
                }
              } else {
                background = 'rgba(0, 0, 0, 0.2)';
              }

              style.push({backgroundColor: background});
              return (
                <TouchableOpacity
                  disabled={!isPlaying}
                  key={index}
                  style={{position: 'relative'}}
                  onPress={() => {
                    setSelectedAnswerIndex(index);
                  }}>
                  {selectedAnswerIndex === index && isCorrect === true && (
                    <Image
                      source={HappyImage}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 5,
                        objectFit: 'cover',
                      }}
                    />
                  )}
                  <Text style={style}>{answer.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}
