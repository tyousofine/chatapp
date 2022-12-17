import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

  export default function App() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#1DA1F2'
              },
             }}>
            <Stack.Screen name="Tina's Simple Chat App" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}