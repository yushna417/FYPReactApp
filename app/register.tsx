import React, { useState } from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Stepper from 'react-native-stepper-ui';
import Step1 from './registrationSteps/step1';
import Step2 from './registrationSteps/step2';
import Step3 from './registrationSteps/step3';
import Step4 from './registrationSteps/step4';


const content = [
  <Step1 key="1" />,
  <Step2 key="2" />,
  <Step3 key="3" />,
  <Step4 key="4" />,
];

const App = () => {
  const [active, setActive] = useState(0);
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className='my-[5rem] mx-6 flex-1 flex-col gap-y-8'>
      <MaterialIcons name="arrow-circle-left" size={50} color="#253a6c" className='-ms-2'
        onPress={()=> navigation.navigate('SecondPage')} />
        <View className='flex flex-row justify-between items-center  h-32'>
            <Image source={require('../assets/images/voting_3160315.png' )}
                  style={{ height: '100%', width: '35%', resizeMode: 'contain' }} className=''/>
            <View className='w-72 flex justify-end gap-2'>
                <Text className='text-4xl font-poppins font-extrabold text-[#253a6c] text-right' >Register</Text>
                <Text className='text-right font-poppins text-sm leading-4'>"Fill out a few quick details across the next steps to create your account.</Text>
            </View>
      </View>

      <Stepper
        active={active}
        content={content}
        onBack={() => setActive((p) => p - 1)}
        onFinish={() => alert('Finish')}
        onNext={() => setActive((p) => p + 1)}

        // ✅ Add your custom styles here
        stepStyle={{
          backgroundColor: 'white', // green step circle
          width: 35,
          height: 35,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor:'#253a6c',
          borderWidth:2
        }}
        stepTextStyle={{
          color: '#253a6c', // step number color
          fontWeight: '900',
          fontSize:14,
        }}
        buttonStyle={{
          backgroundColor: '#253a6c',
          paddingBlock:12,
          paddingInline:40, // blue buttons
          borderRadius: 8,
          marginRight: 10,
        }}
        buttonTextStyle={{
          color: '#fff', // button text color
          fontWeight: '600',
          fontSize:18
        }}
        wrapperStyle={{
          paddingVertical: 10,
          borderRadius: 10,
          borderColor:'black',
          paddingBlock: 10,
        }}
      />

      <Text className='mt-4 font-poppins text-gray-400 text-center'>Already have an account.<Text className='text-[#253a6c]'
        onPress={()=> navigation.navigate('login')}>Login</Text>
        </Text>

    </SafeAreaView>
  );
};

export default App;