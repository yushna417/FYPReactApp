import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import {
  FormControl,  
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"
import { VStack } from "@/components/ui/vstack"
import React from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';

const Step2 = () => {
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [isInvalid, setIsInvalid] = React.useState(false);

  const handleRoleSelect = (role:any) => {
    setSelectedRole(role);
    setIsInvalid(false);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      setIsInvalid(true);
      return;
    }
    // Proceed with selected role
    console.log('Selected role:', selectedRole);
  };

  return (
    <SafeAreaView className='flex-1 pt-14 pb-3'>
      <VStack className="flex-1 ">
        <FormControl isInvalid={isInvalid} isRequired ={true}>
          <View className='mb-8'>
            <FormControlLabel>
              <FormControlLabelText className='text-2xl font-poppins-bold text-gray-900'>
                What brings you here?
              </FormControlLabelText>
            </FormControlLabel>
            <Text className='text-gray-500 font-poppins mt-2'>
              Select your role to continue
            </Text>
          </View>

          <HStack className='justify-between mb-8'>
            <TouchableOpacity 
              onPress={() => handleRoleSelect('customer')}
              className={`items-center px-2 w-[45%] rounded-md pb-3 ${
                selectedRole === 'customer' 
                  ? 'shadow-xl bg-MainTheme' 
                  : 'shadow-md shadow-gray-400/30 border border-dashed border-gray-400 '
              }`}
            >
              <Box className="h-[9.5rem] w-28 ">
                <Image 
                  source={require('../../assets/images/Customer.png')} 
                  className='w-full h-full'
                  resizeMode='contain'
                />
              </Box>
              <Text className={`font-poppins font-semibold text-xl ${selectedRole=== 'customer'?'text-white':'text-gray-900'}`}>Customer</Text>
              
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleRoleSelect('vendor')}
              className={`items-center px-1 w-[45%]  rounded-md pb-3 ${
                selectedRole === 'vendor' 
                  // ? 'shadow-xl shadow-gray-600 bg-[#eaecf0] border-2 border-gray-500' 
                  ? 'shadow-xl bg-MainTheme ' 

                  : 'shadow-md shadow-gray-400/30 border border-dashed border-gray-400 '
              }`}
            >
              <Box className="h-[9.5rem] w-28  ">
                <Image 
                  source={require('../../assets/images/Vendor.png')} 
                  className='w-full h-full'
                  resizeMode='contain'
                />
              </Box>
              <Text className={`font-poppins font-semibold text-xl ${selectedRole=== 'vendor'?'text-white':'text-gray-900'}`}>Vendor</Text>
              
            </TouchableOpacity>
          </HStack>

        </FormControl>

      </VStack>
    </SafeAreaView>
  );
};

export default Step2;