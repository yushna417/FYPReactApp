import { View, SafeAreaView } from 'react-native';
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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AlertCircleIcon } from '@/components/ui/icon';
import { Button, ButtonText } from "@/components/ui/button"


const Step3 = () => {
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [checkPassword, setCheckPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = React.useState(false)
  const navigation = useNavigation<any>();

  const handleSubmit = () => {
    if (inputValue.length < 12) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }

  const confirmPassword = () => {
    if (checkPassword == inputValue) {
      setIsPasswordInvalid(false)
    } else {
      setIsPasswordInvalid (true)
    }
  }

  const handlePress = () => {
    confirmPassword();
    handleSubmit()
  }

  return (
    
    <SafeAreaView className='flex-col py-8 justify-center gap-y-8 font-poppins'>
      <VStack className="w-full rounded-md ">
        <FormControl
          isInvalid={isInvalid}
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={true}
        
        >

          <View>
            <FormControlLabel className='mt-6 '>
              <FormControlLabelText className='text-md font-poppins'>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className=" rounded-xl px-4 h-14 ">
              <FontAwesome5 name="lock" size={18} color="black" />
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                className="text-md ml-2"
              />
              <InputSlot onPress={() => setShowPassword(!showPassword)} className='mr-1' >
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="gray" />
              </InputSlot>
            </Input>

            {!isInvalid && (
              <FormControlHelper accessible>
              <FormControlHelperText>
                Minimum 12 characters recommended for strong protection.
              </FormControlHelperText>
            </FormControlHelper>
            )}
            
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 12 or more characters are required.
              </FormControlErrorText>
            </FormControlError>
          </View>          
        </FormControl>

        <FormControl
          isInvalid={isPasswordInvalid}
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
        
        >

          
          <View>
            <FormControlLabel className='mt-6 '>
              <FormControlLabelText className='text-md font-poppins'> Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input className=" rounded-xl px-4 h-14 ">
              <FontAwesome5 name="lock" size={18} color="black" />
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={checkPassword}
                onChangeText={(text) => setCheckPassword(text)}
                className="text-md ml-2"
              />
              <InputSlot onPress={() => setShowPassword(!showPassword)} className='mr-1' >
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="gray" />
              </InputSlot>
            </Input>

            {!isPasswordInvalid && (
              <FormControlHelper>
              <FormControlHelperText>
                Re-enter your password to confirm.
              </FormControlHelperText>
            </FormControlHelper>
            )}
            
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
               Passwords do not match. Please try again.
              </FormControlErrorText>
            </FormControlError>
          </View>
            
          <Button className="w-fit self-end mt-4" size="sm" onPress={handlePress}>
            <ButtonText>Submit</ButtonText>
          </Button>

          
        </FormControl>

      </VStack>
    </SafeAreaView>
  );
};

export default Step3;
