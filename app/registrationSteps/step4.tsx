import { View} from 'react-native';
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"
import { Input, InputField, InputSlot} from "@/components/ui/input"
// import { VStack } from "@/components/ui/vstack"
import React, { forwardRef, useImperativeHandle } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AlertCircleIcon } from '@/components/ui/icon';
import { IUser } from '@/types/userInterface';
import Toast from 'react-native-simple-toast'
import { useState } from 'react';


interface StepProps {
  data: IUser;
  setData: React.Dispatch<React.SetStateAction<IUser>>;
}

const Step4 = forwardRef(({ data, setData }: StepProps, ref) => {
  const [isInvalid, setIsInvalid] = useState(false)
  const [checkPassword, setCheckPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false)
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)

   useImperativeHandle(ref, () => ({
      validate: () => {
        if (!data.password || data.password.length < 8) {
          Toast.show('Password must be at least 8 characters.', Toast.LONG, {
          backgroundColor: '#253a6c',
        });
          return false;
        }

        if (!checkPassword || data.password !== checkPassword) {
          Toast.show('Passwords do not match. Please try again.', Toast.LONG, {
          backgroundColor: '#253a6c',
        });
          return false;
        }

        return true;
      },
    }));

  


  return (
    
    <View className='flex-col py-8 justify-center gap-y-8 font-poppins'>
      <View  className="w-full rounded-md flex flex-col gap-y-10">
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
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="gray" />
              </InputSlot>
            </Input>

              <FormControlHelper accessible>
              <FormControlHelperText className='text-sm'>
                Minimum 8 characters recommended for strong protection.
              </FormControlHelperText>
            </FormControlHelper>
            
            
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
            <FormControlLabel >
              <FormControlLabelText className='text-md font-poppins'> Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input className=" rounded-xl px-4 h-14 ">
              <FontAwesome5 name="lock" size={18} color="black" />
              <InputField
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={checkPassword}
                onChangeText={(text) => setCheckPassword(text)}
                className="text-md ml-2"
              />
              <InputSlot onPress={() => setShowConfirm(!showConfirm)} className='mr-1' >
                <Ionicons name={showConfirm ? 'eye-outline' : 'eye-off-outline'} size={20} color="gray" />
              </InputSlot>
            </Input>

              <FormControlHelper>
              <FormControlHelperText className='sm'>
                Re-enter your password to confirm.
              </FormControlHelperText>
            </FormControlHelper>
            
          
          </View>
            

          
        </FormControl>

      </View>
    </View>
  );
});

export default Step4;
