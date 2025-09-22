import 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider,  } from '@react-navigation/native';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css"
import { AuthProvider } from '@/context/AuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PottaOne: require('../assets/fonts/PottaOne-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return ( 
    <GestureHandlerRootView style={{flex:1}}>
       <GluestackUIProvider mode="light"><ThemeProvider value={DefaultTheme}>
          <AuthProvider>
           <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
            <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
          </Stack>       
        <StatusBar style="auto" />
      </AuthProvider>
      
      </ThemeProvider>
      </GluestackUIProvider>  
    </GestureHandlerRootView>
           
  );
}
