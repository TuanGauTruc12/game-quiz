import SplashStyle from './SplashStyle';
import SplashImage from '../../assets/splash.png';
import Logo from '../../assets/splash1.png';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import Question from '../../Object/Question';
import Answer from '../../Object/Answer';
import {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

export default function SplashScreen(props) {
  const {navigation} = props;
  const [questions, setQuestions] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await axios
          .get('https://the-trivia-api.com/v2/questions')
          .then(response => response.data);

        function shuffleArray(array) {
          const copy = [...array];
          for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
          }
          return copy;
        }

        const questionArr = data.map(item => {
          const answer1 = new Answer(item.incorrectAnswers[0], false);
          const answer2 = new Answer(item.incorrectAnswers[1], false);
          const answer3 = new Answer(item.incorrectAnswers[2], false);
          const answer4 = new Answer(item.correctAnswer, true);

          const arrayAnswer = shuffleArray([
            answer1,
            answer2,
            answer3,
            answer4,
          ]);

          return new Question(
            item.question.text,
            undefined,
            [...arrayAnswer].reverse(),
          );
        });
        setQuestions(questionArr);
      };

      fetchData();
    }, []),
  );
  //Khi thời gian về 0 báo hết thời gian và không được trả lời nữa

  return (
    <View style={SplashStyle.container}>
      <Image style={SplashStyle.image} source={SplashImage} />
      <View style={SplashStyle.wrapper}>
        <Image style={SplashStyle.logo} source={Logo} />
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => navigation.navigate('Question', {questions})}>
          <Text style={SplashStyle.text}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
