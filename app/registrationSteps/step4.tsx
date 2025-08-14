import { View, SafeAreaView, Alert } from 'react-native';
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
import React, { forwardRef, useImperativeHandle } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AlertCircleIcon } from '@/components/ui/icon';
import { IUser } from '@/types/userInterface';
import Toast from 'react-native-simple-toast'

interface StepProps {
  data: IUser;
  setData: React.Dispatch<React.SetStateAction<IUser>>;
}

const Step4 = forwardRef(({ data, setData }: StepProps, ref) => {
  const [isInvalid, setIsInvalid] = React.useState(false)
  const [checkPassword, setCheckPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = React.useState(false)

   useImperativeHandle(ref, () => ({
      validate: () => {
        if (!data.password || data.password.length < 8) {
          // setIsInvalid(true);
          Toast.show('Password must be at least 8 characters.', Toast.LONG, {
          backgroundColor: '#253a6c',
        });
          // Alert.alert("");
          return false;
        }

        if (!checkPassword || data.password !== checkPassword) {
          // setIsPasswordInvalid(true);
          Toast.show('Passwords do not match. Please try again.', Toast.LONG, {
          backgroundColor: '#253a6c',
        });
          // Alert.alert("");
          return false;
        }

        return true;
      },
    }));

  // React.useEffect(() => {

  //   if (data.password.length < 8) {
  //     setIsInvalid(true);
  //   } else {
  //     setIsInvalid(false);
  //   }


  //   if (checkPassword && data.password !== checkPassword) {
  //     setIsPasswordInvalid(true);
  //   } else {
  //     setIsPasswordInvalid(false);
  //   }
  // }, [data.password, checkPassword]);


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
                value={data.password}
                onChangeText={(val) => setData({...data, password:val})}
                className="text-md ml-2"
              />
              <InputSlot onPress={() => setShowPassword(!showPassword)} className='mr-1' >
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="gray" />
              </InputSlot>
            </Input>

            {!isInvalid && (
              <FormControlHelper accessible>
              <FormControlHelperText>
                Minimum 8 characters recommended for strong protection.
              </FormControlHelperText>
            </FormControlHelper>
            )}
            
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 8 or more characters are required.
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
            

          
        </FormControl>

      </VStack>
    </SafeAreaView>
  );
});

export default Step4;
