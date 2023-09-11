import SplashStyle from './SplashStyle';
import SplashImage from '../../assets/splash.png';
import Logo from '../../assets/splash1.png';
import {View, Image, TouchableOpacity, Text} from 'react-native';

export default function SplashScreen(props) {
  const {navigation} = props;
  return (
    <View style={SplashStyle.container}>
      <Image style={SplashStyle.image} source={SplashImage} />
      <View style={SplashStyle.wrapper}>
        <Image style={SplashStyle.logo} source={Logo} />
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate('Question')}>
          <Text style={SplashStyle.text}>Chơi ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
