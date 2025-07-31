import {View, Alert, TouchableOpacity, SafeAreaView, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import {
  FormControl,  
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"
import { Input, InputField} from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { Button, ButtonText } from "@/components/ui/button"
import { HStack } from '@/components/ui/hstack';


const Step1 = forwardRef((props, ref) => {
  const [name, setName] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!cameraPermission.granted || !mediaPermission.granted) {
      Alert.alert('Permission Required', 'Camera and Media permissions are required to upload images.');
      return false;
    }
    return true;
  };

  const pickFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };
  
  return (
    
    <SafeAreaView className='flex-col py-8 justify-center gap-y-8 font-poppins'>
      <VStack className="w-full rounded-md ">
        <FormControl
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={true}
        
        >
          <View>
            <FormControlLabel className='mt-6 '>
              <FormControlLabelText className='text-md font-poppins'>Profile</FormControlLabelText>
            </FormControlLabel>
            <HStack className='flex justify-between'>

            <TouchableOpacity onPress={pickFromGallery}
              className='w-[48%] h-14 border flex flex-row items-center justify-center border-dashed rounded-xl gap-5'>
              <Entypo name="image-inverted" size={28} color="black"/>
              <Text className='text-[1.07rem] font-semibold'>Gallery</Text>
            </TouchableOpacity>

            <Button size="md" variant="solid" action="primary" onPress={takePhoto}
            className='w-[48%] h-14 border rounded-xl gap-5 bg-MainTheme'>
              <FontAwesome5 name="camera-retro" size={24} color="white" />
              <ButtonText className='text-[1.07rem] font-semibold'>Camera</ButtonText>
            </Button>
            </HStack>
            

          </View>

          <View>
            <FormControlLabel className='mt-6 '>
              <FormControlLabelText className='text-md font-poppins'>Full Name</FormControlLabelText>
            </FormControlLabel>
            <Input className="rounded-xl px-4 h-14 " >
              <FontAwesome5 name="user-alt" size={18} color="#2b2b2c" />  
              <InputField placeholder="Ravi Paudel"            
                className="text-md ml-2"
                value={name}
              />
            </Input>
          </View>

          <View>
            <FormControlLabel className='mt-6 '>
              <FormControlLabelText className='text-md font-poppins'>Phone Number</FormControlLabelText>
            </FormControlLabel>
            <Input className="rounded-xl px-4 h-14 " >
              <Feather name="phone" size={20} color="black" />
              <InputField placeholder="98*****"            
                className="text-md ml-2"
              />
            </Input>
          </View>

               
          
        </FormControl>

        
      </VStack>
    </SafeAreaView>
  );
});

export default Step1;
