import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, ButtonText } from "@/components/ui/button"
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"
import { Input, InputField, InputSlot} from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import React from 'react';
import { HStack } from '@/components/ui/hstack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Radio,
  RadioGroup,
} from "@/components/ui/radio"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const YourApp = () => {
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("12345")
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState("Customer");
  const navigation = useNavigation<any>();

  const handleSubmit = () => {
    if (inputValue.length < 12) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }
  return (
    
    <SafeAreaView className='flex-col py-36 px-8 gap-y-8 font-poppins'>
        <MaterialIcons name="arrow-circle-left" size={50} color="#253a6c" className='-ms-2'
        onPress={()=> navigation.navigate('SecondPage')} />
        <Text className='text-4xl font-poppins font-extrabold text-[#253a6c]'>Login</Text>
      <VStack className="w-full rounded-md ">
        <FormControl
          isInvalid={isInvalid}
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
        
        >
          {/* Role Selection */}
          <FormControlLabel className='mt-2 font-poppins'>
            <FormControlLabelText>Sign in as....</FormControlLabelText>
          </FormControlLabel>
              <RadioGroup
                value={selectedRole}
                onChange={(val) => setSelectedRole(val)}
                className='border border-[#d5d4d4] h-14 rounded-xl flex items-center flex-row w-full mt-1'
              >
                <HStack >
                  {/* Vendor Radio */}
                  <Radio
                    value="Vendor"
                    className={`h-14 w-[50%] rounded-xl flex justify-center items-center ${
                      selectedRole === "Vendor" ? "bg-[#253a6c]" : ""
                    }`}
                  >
                    <Text
                      className={`text-lg font-poppins ${
                        selectedRole === "Vendor" ? "text-white" : "text-black"
                      }`}
                    >
                      Vendor
                  </Text>
                  </Radio>

                  {/* Customer Radio */}
                  <Radio
                    value="Customer"
                    className={`h-14 w-1/2 rounded-xl flex justify-center items-center ${
                      selectedRole === "Customer" ? "bg-[#253a6c]" : ""
                    }`}
                  >
                    <Text
                      className={`text-lg font-poppins ${
                        selectedRole === "Customer" ? "text-white" : "text-black"
                      }`}
                    >
                      Customer
                    </Text>
                  </Radio>
                </HStack>
              </RadioGroup>


          {/* Username */}
          <FormControlLabel className='mt-6 font-poppins'>
            <FormControlLabelText>Phone Number</FormControlLabelText>
          </FormControlLabel>
          <Input className="rounded-xl px-4 mt-1 h-14" >
            <FontAwesome5 name="user-alt" size={18} color="#2b2b2c" />  
            <InputField placeholder="98********"            
              className="text-md ml-2"
            />
          </Input>
          
          {/* Password */}
          <FormControlLabel className='mt-6 font-poppins'>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className=" rounded-xl px-4 mt-1 h-14">
            <FontAwesome5 name="lock" size={18} color="black" />
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              // value={password}
              // onChangeText={(text) => setPassword(text)}
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

        <Button className="w-full self-end mt-10 rounded-lg h-16 bg-[#243c6b]" size="md" onPress={handleSubmit}>
          <ButtonText className='text-lg'>Login</ButtonText>
        </Button>

        <Text className='mt-4 font-poppins text-gray-400'>I am a new user. <Text className='text-[#253a6c]'
        onPress={()=> navigation.navigate('register')}>Register</Text>
        </Text>
      </VStack>
    </SafeAreaView>
  );
};

export default YourApp;
