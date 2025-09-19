import { View, Text, Image} from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(()=>{
      router.replace('/(auth)/onBoardingPage');
    }, 3000);

    return () => clearTimeout(timer)
  }, []);

  return (
    <View className="flex-1 flex-row justify-center items-center bg-white gap-2">
      <View className="h-36 w-[100px] ml-2 border-l-4 border-[#13244c] justify-center items-center">
        <Image
          source={require('../assets/images/projectImages/favicon.png')}
          style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
        />
      </View>
      <View className='w-1/2'>
        <Text className="text-5xl font-black flex-wrap font-potta text-[#253a6c]">TARKARI </Text>
        <Text className="text-5xl font-black flex-wrap font-potta text-[#253a6c] mt-2">DEAL</Text>
      </View>
      
    </View>
  );
};

export default index;
