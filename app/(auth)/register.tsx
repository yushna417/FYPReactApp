import { IUser } from '@/types/userInterface';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Stepper from 'react-native-stepper-ui';
import Step1 from '../registrationSteps/step1';
import Step2 from '../registrationSteps/step2';
import Step3 from '../registrationSteps/step3';
import Step4 from '../registrationSteps/step4';
import { useAuth } from '@/context/useAuth';
import { Alert } from 'react-native';
// import { HStack } from '@/components/ui/hstack';

const Register = () => {
  const [active, setActive] = useState(0);
  const navigation = useNavigation<any>();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registerData, setRegisterData] = useState<IUser>({
    full_name :'',
    phone:'',
    role:"customer",
    profile_image: "",
    city:'',
    password:'',
  })
  const { register } = useAuth();

  const stepRefs = [useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null)];
  
  const content = [
    <Step1 key="1" ref={stepRefs[0]} data={registerData} setData={setRegisterData} />,
    <Step2 key="2" ref={stepRefs[1]} data={registerData} setData={setRegisterData} />,
    <Step3 key="3" ref={stepRefs[2]} data={registerData} setData={setRegisterData} />,
    <Step4 key="4" ref={stepRefs[3]} data={registerData} setData={setRegisterData} />,
  ]

  
  const handleNext = async () => {
    const isValid = await stepRefs[active].current?.validate();
    if (isValid) {
      setActive((prev) => prev + 1);
    }
  };

const handleRegister = async () => {
  const isValid = await stepRefs[3].current?.validate();
  if (!isValid) return;

  if (isSubmitting) return;
  setIsSubmitting(true);

  try {
    const { profile_image, ...safeData } = registerData;
    const finalData = profile_image ? { ...registerData } : safeData;

    await register(finalData); 

    Alert.alert(
      'Registration Successful',
      `Your details:\n\nFull Name: ${registerData.full_name}\nPhone: ${registerData.phone}\nRole: ${registerData.role}\nCity: ${registerData.city}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('login'),
        },
      ]
    );
  } catch (error: any) {
    console.error('Registration failed:', error?.response?.data || error.message);

    Alert.alert(
      'Registration Failed',
      `Something went wrong.\n\n📦 Sent Data:\nFull Name: ${registerData.full_name}\nPhone: ${registerData.phone}\nRole: ${registerData.role}\nCity: ${registerData.city}\nPassword: ${registerData.password}\nProfile Image: ${registerData.profile_image ?? 'null'}\n\n❌ Error: ${JSON.stringify(error?.response?.data || error.message)}`
    );
  } finally {
    setIsSubmitting(false)
  }
};


  return (
    <View className='my-32 mx-6 flex-1 flex-col gap-y-5'>
      
      <View className='flex flex-row justify-between items-center h-28'>
            <Image source={require('../../assets/images/projectImages/voting_3160315.png' )}
                  style={{ height: '100%', width: '30%', resizeMode: 'contain' }} className=''/>
            <View className='w-72 flex justify-end gap-2'>
                <Text className='text-4xl font-poppins font-extrabold text-[#253a6c] text-right' >Register</Text>
                <Text className='text-right font-poppins text-sm leading-4'>"Fill out a few quick details across the next steps to create your account."</Text>
            </View>
    
      </View>

      <Stepper
        active={active}
        content={content}
        onBack={() => setActive((p) => p - 1)}
        onFinish={handleRegister}

        onNext={handleNext}

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
          paddingHorizontal:30,
          paddingVertical:12, // blue buttons
          borderRadius: 8,
          marginRight: 10,
        }}
        buttonTextStyle={{
          color: '#fff', // button text color
          fontWeight: '600',
          fontSize:20
        }}
        wrapperStyle={{
          paddingVertical: 10,
          borderRadius: 10,
          borderColor:'black',
          paddingHorizontal: 10,
        }}
      />

      <Text className='mt-4 font-poppins text-gray-400 text-center'>Already have an account.<Text className='text-[#253a6c]'
        onPress={()=> navigation.navigate('login')}>Login</Text>
        </Text>

    </View>
  );
};

export default Register;