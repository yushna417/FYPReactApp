import React from 'react';
import {Text, Image, SafeAreaView} from 'react-native';
import { Button, ButtonText } from "@/components/ui/button"
import { HStack } from '@/components/ui/hstack';
import { useNavigation } from '@react-navigation/native';

const OnBoardingPage = () => {
    const navigation = useNavigation<any>();

  return (
      <SafeAreaView className='flex flex-col items-center align-middle px-3 gap-y-6 py-28 bg-[#ffffff] h-full'>
        <Text className='text-[2.35rem] font-poppins text-center font-semibold tracking-wide'>Your Smart Local Vegetable Marketplace</Text>
        <Text className='text-[1.20rem] text-center text-[#7e848d] px-3 leading-8'>Bid your price, compare options, and get the best deals — all while supporting local vendors.</Text>
        <Image
          source={require('../../assets/images/FrontImage.png')}
          style={{width: '100%', height: 400}}
        />
        <HStack space='xl' className='flex justify-between w-full px-3'>
            <Button size="xl" className='flex-1 h-16 rounded-2xl bg-[#243c6b]' variant="solid" action="primary"
            onPress={()=> navigation.navigate('register')}>
                <ButtonText>Sign up</ButtonText>
            </Button>
            <Button size="xl" className='flex-1 h-16 rounded-2xl border-[#243c6b] border-2 text-[#243c6b]' variant="outline" action="primary"
            onPress={()=> navigation.navigate('login')}>
                <ButtonText>Log in</ButtonText>
            </Button>
        </HStack>
        
      </SafeAreaView>
      
  );
};

export default OnBoardingPage;