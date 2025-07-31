import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button, ButtonText } from "@/components/ui/button"
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { AlertCircleIcon } from '@/components/ui/icon';


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
    
    <View className='flex-col py-20 justify-center px-8 gap-y-8 font-poppins'>
        <MaterialIcons name="arrow-circle-left" size={50} color="#253a6c" className='-ms-2'
        onPress={()=> navigation.navigate('SecondPage')} />
        <Text className='text-4xl font-poppins font-extrabold text-[#253a6c]'>Register</Text>
      <VStack className="w-full rounded-md ">
        <FormControl
          isInvalid={isInvalid}
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
        
        >
          <View>
            <FormControlLabel className='mt-6 '>
              <FormControlLabelText className='text-md font-poppins'>Full Name</FormControlLabelText>
            </FormControlLabel>
            <Input className="rounded-xl px-4 h-14 -mt-1" >
              <FontAwesome5 name="user-alt" size={18} color="#2b2b2c" />  
              <InputField placeholder="Ravi Paudel"            
                className="text-md ml-2"
              />
            </Input>
          </View>

          <View>
            <FormControlLabel className='mt-6 '>
              <FormControlLabelText className='text-md font-poppins'>Phone Number</FormControlLabelText>
            </FormControlLabel>
            <Input className="rounded-xl px-4 h-14 -mt-1" >
              <Feather name="phone" size={20} color="black" />
              <InputField placeholder="98*****"            
                className="text-md ml-2"
              />
            </Input>
          </View>

          <View>
            <FormControlLabel className='mt-6 '>
              <FormControlLabelText className='text-md font-poppins'>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className="rounded-xl px-4 h-14 -mt-1" >
              <MaterialCommunityIcons name="email-variant" size={24} color="black" />
              <InputField placeholder="ravi@example.com"            
                className="text-md ml-2"
              />
            </Input>
          </View>

          

          <View>
            <FormControlLabel className='mt-6 '>
              <FormControlLabelText className='text-md font-poppins'>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className=" rounded-xl px-4 -mt-1 h-14 ">
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

            <FormControlHelper>
              <FormControlHelperText>
                Must be atleast 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </View>
          
                 

          
        </FormControl>

          

        <Button className="w-full self-end mt-10 rounded-lg h-16 bg-[#243c6b]" size="md" onPress={handleSubmit}>
          <ButtonText className='text-lg'>Register</ButtonText>
        </Button>

        <Text className='mt-4 font-poppins text-gray-400 text-center'>Already have an account.<Text className='text-[#253a6c]'
        onPress={()=> navigation.navigate('login')}>Login</Text>
        </Text>
      </VStack>
    </View>
  );
};

export default YourApp;
