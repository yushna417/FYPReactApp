import React from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const OnBoardingPage = () => {
    const navigation = useNavigation<any>();

  return (
      <View className='flex flex-col items-center align-middle px-3 gap-y-6 py-28 bg-[#ffffff] h-full'>
        <Text className='text-[2.35rem] font-poppins text-center font-semibold tracking-wide'>Your Smart Local Vegetable Marketplace</Text>
        <Text className='text-[1.20rem] text-center text-[#7e848d] px-3 leading-8 '>Biding your price, compare options, and get the best deals — all while supporting local vendors.</Text>
        <Image
          source={require('../../assets/images/projectImages/FrontImage.png')}
          style={{width: '100%', height: 400}}
        />
        <View className='flex flex-row w-full px-3 gap-x-5'>
            <TouchableOpacity  className='flex-1 h-16 flex items-center justify-center rounded-2xl bg-[#243c6b]' 
            onPress={()=> navigation.navigate('register')}>
                <Text className='text-white font-bold text-2xl '>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity  className='flex-1 py-2 h-16 flex items-center justify-center rounded-2xl border-[#243c6b] border-2 text-[#243c6b]' 
            onPress={()=> navigation.navigate('login')}>
                <Text className='text-MainTheme font-bold text-2xl '>Log in</Text>
            </TouchableOpacity>
        </View>
        
      </View>
      
  );
};

export default OnBoardingPage;