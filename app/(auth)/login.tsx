import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import {
  Radio,
  RadioGroup,
} from "@/components/ui/radio";
import { ILoginPayload } from '@/types/loginPayloadInterface';
import { Role } from '@/types/userInterface';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Toast from 'react-native-simple-toast'
import { useAuth } from "@/context/useAuth";
import { Alert } from "react-native";



const login = () => {
  const [loginData, setLoginData] = useState<ILoginPayload> ({
    phone: '',
    password: '',
    role:'customer'
  })
  const [showPassword, setShowPassword] = React.useState(false);
  const navigation = useNavigation<any>();
  const [isLoading, setIsloading] = useState(false);
  const {login} = useAuth()
  


  const handleSubmit = async() => {
    const { phone, password, role } = loginData;

    if (!phone || phone.length < 9 || !password) {
       Toast.show('Phone number must be at least 10 digits.', Toast.LONG, {
          backgroundColor: '#253a6c',
        });
      return;
    }
    
    setIsloading(true)
    try{
      const loginPayload: ILoginPayload = {
      phone: phone,
      password: password,
      role: role
    };

    await login(loginPayload);
    } catch (error:any) {
      Alert.alert('Login Failed', 'Invalid credentials');
    } finally {
      setIsloading(false);
    }
  };

  return (
    
    <View className='flex-col py-36 px-8 gap-y-8 font-poppins'>
        <Text className='text-4xl font-poppins font-extrabold text-[#253a6c]'>Login</Text>
      <View className="w-full rounded-md flex flex-col">
        <FormControl
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
        
        >
          {/* Role Selection */}
          <FormControlLabel className='mt-2 font-poppins'>
            <FormControlLabelText >Sign in as....</FormControlLabelText>
          </FormControlLabel>
              <RadioGroup
                value={loginData.role}
                onChange={(val) => setLoginData({ ...loginData, role:val as Role })}
                className='border border-[#d5d4d4] h-14 rounded-xl flex items-center flex-row w-full mt-3'
              >
                <View className="flex flex-row" >
                  {/* Vendor Radio */}
                  <Radio
                    value="vendor"
                    className={`h-16 w-[50%] rounded-xl flex justify-center items-center ${
                      loginData.role === "vendor" ? "bg-[#253a6c]" : ""
                    }`}
                  >
                    <Text
                      className={`text-lg font-poppins ${
                        loginData.role === "vendor" ? "text-white" : "text-black"
                      }`}
                    >
                      Vendor
                  </Text>
                  </Radio>

                  {/* Customer Radio */}
                  <Radio
                    value="customer"
                    className={`h-16 w-1/2 rounded-xl flex justify-center items-center ${
                      loginData.role === "customer" ? "bg-[#253a6c]" : ""
                    }`}
                  >
                    <Text
                      className={`text-lg font-poppins ${
                        loginData.role === "customer" ? "text-white" : "text-black"
                      }`}
                    >
                      Customer
                    </Text>
                  </Radio>
                </View>
              </RadioGroup>


          <FormControlLabel className='mt-7 font-poppins'>
            <FormControlLabelText >Phone Number</FormControlLabelText>
          </FormControlLabel>
          <Input className="rounded-xl px-4 mt-3 h-14" >
            <FontAwesome5 name="user-alt" size={18} color="#2b2b2c" />  
            <InputField placeholder="98********" keyboardType="numeric"      
              className="text-md ml-2"
              value={loginData.phone}
              onChangeText={(text) => setLoginData({ ...loginData, phone: text })}

            />
          </Input>
          
          {/* Password */}
          <FormControlLabel className='mt-7 font-poppins'>
            <FormControlLabelText >Password</FormControlLabelText>
          </FormControlLabel>
          <Input className=" rounded-xl px-4 mt-3 h-14">
            <FontAwesome5 name="lock" size={18} color="black" />
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={loginData.password}
              onChangeText={(text) => setLoginData({ ...loginData, password: text })}
              className="text-md ml-2"
            />
            <InputSlot onPress={() => setShowPassword(!showPassword)} className='mr-1' >
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="gray" />
            </InputSlot>
          </Input>       

          
        </FormControl>

          <TouchableOpacity className="self-end mt-2">
            <Text className="text-sm text-[#253a6c] font-poppins">Forgot Password?</Text>
          </TouchableOpacity>

               
     
    

        <TouchableOpacity  className="w-full justify-center flex flex-row items-center mt-10 rounded-lg h-16 bg-[#243c6b]"  onPress={handleSubmit}>
          <Text className='text-xl text-white font-bold '
          onPress={handleSubmit}
          disabled={isLoading}>
           {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <Text className='mt-4 font-poppins text-gray-400'>I am a new user. <Text className='text-[#253a6c]'
        onPress={()=> navigation.navigate('register')}>Register</Text>
        </Text>
      </View>
    </View>
  );
};

export default login;
