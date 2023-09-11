import SplashStyle from './SplashStyle';
import SplashImage from '../../assets/splash.png';
import Logo from '../../assets/splash1.png';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import Question from '../../Object/Question';
import {questions as questionArray} from '../../data.js';
import Answer from '../../Object/Answer';
import {useState, useEffect} from 'react';

export default function SplashScreen(props) {
  const {navigation} = props;
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const array = questionArray.map(questionData => {
        const answersArray = questionData.answers.map(answerData => {
          return new Answer(answerData.title, answerData.isCorrect);
        });

        return new Question(
          questionData.title,
          questionData.image,
          answersArray,
        );
      });
      setQuestions(array);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <View style={SplashStyle.container}>
      <Image style={SplashStyle.image} source={SplashImage} />
      <View style={SplashStyle.wrapper}>
        <Image style={SplashStyle.logo} source={Logo} />
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => navigation.navigate('Question', {questions})}>
          <Text style={SplashStyle.text}>Chơi ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
