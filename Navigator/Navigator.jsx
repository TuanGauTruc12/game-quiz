import SplashScreen from '../screens/SplashScreen/SplashScreen';
import QuestionScreen from '../screens/Question/QuestionScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

          <Stack.Screen
            name="Home"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Question"
            component={QuestionScreen}
            options={{headerShown: false}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
