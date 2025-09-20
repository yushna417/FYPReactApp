import React  from 'react';
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome, FontAwesome6, MaterialIcons, Fontisto, Octicons} from '@expo/vector-icons';
import { Switch } from '@/components/ui/switch';
import ImageSourceModal from '@/components/modules/imageSourceModal';



export default function settings() {
  const [showModal, setShowModal] = useState(false)
  return (
    <View className=' bg-slate-100 flex flex-col'>
      <View className='pt-24 h-80 w-full bg-MainTheme mx-auto'>
        <View className="h-52 w-52 relative mx-auto rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
          <Image
            source={{ uri: "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg" }} // random image
            className="h-full w-full absolute"
            resizeMode="cover"
          />
          <TouchableOpacity className='h-16 w-16 rounded-full bg-white/40 flex items-center justify-center' onPress={()=> setShowModal(true)}>
            <Octicons name="device-camera" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ImageSourceModal visible = {showModal} onClose={()=> setShowModal(false)}/>
        
       <View className='h-20 bg-white mx-5 rounded-2xl mt-6 mb-6 items-center justify-between flex flex-row px-5' style ={{
            boxShadow:  "5px 5px 10px #d1d5db",
          }}>
            <Text className=' text-2xl font-roboto font-semibold text-gray-800 '>Vendor Mode</Text>
            <Switch 
            size="lg"
            isDisabled={false}
            trackColor={{ false: '#A0AEC0', true: '#253a6c' }}
            thumbColor="#f1f5f9" 
            ios_backgroundColor="#A0AEC0"
          />
    </View>
      <Text className='font-semibold text-2xl p-6 text-gray-800 font-space-mono'>
        Account Settings
      </Text>

     <View className="flex flex-col justify-between rounded-2xl mx-5 gap-y-2">
      
      <View className="w-full h-20 gap-x-6 rounded-2xl flex flex-row px-6 items-center mt-2 bg-white "  style={{boxShadow:  "5px 5px 10px #d1d5db",}}>
        <MaterialCommunityIcons name="account-card" size={32} color="#253a6c" />  
        <View className='flex-1 flex-col items-start justify-center gap-y-0 h-12 leading-5'>
          <Text className='font-space-mono font-medium text-gray-800 text-lg '>Full Name</Text>
          <Text className='font-space-mono font-light text-gray-500 text-sm '>Personalize how your name appears.</Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" className='flex' size={24} color="#1f2937" />
      </View>

      <View className="w-full h-20 gap-x-6 rounded-2xl flex flex-row px-6 items-center mt-2 bg-white "  style={{boxShadow:  "5px 5px 10px #d1d5db",}}>
        <Fontisto name="locked" size={30} color="#253a6c" />
        <View className='flex-1 flex-col items-start justify-center gap-y-0 h-12 leading-5'>
          <Text className='font-space-mono font-medium text-gray-800 text-lg '>Password</Text>
          <Text className='font-space-mono font-light text-gray-500 text-sm '>Strengthen security with a new password.</Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" className='flex' size={24} color="#1f2937" />
      </View>

      <View className="w-full h-20 gap-x-6 rounded-2xl flex flex-row px-6 items-center mt-2 bg-white "  style={{boxShadow:  "5px 5px 10px #d1d5db",}}>
        <FontAwesome6 name="map-location-dot" size={30} color="#253a6c" />
        <View className='flex-1 flex-col items-start justify-center gap-y-0 h-12 leading-5'>
          <Text className='font-space-mono font-medium text-gray-800 text-lg '>Address</Text>
          <Text className='font-space-mono font-light text-gray-500 text-sm '>Keep your location details up to date.</Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" className='flex' size={24} color="#1f2937" />
      </View>

      <View className="w-full h-20 gap-x-6 rounded-2xl flex flex-row px-6 items-center mt-2 bg-white "  style={{boxShadow:  "5px 5px 10px #d1d5db",}}>
        <FontAwesome name="phone-square" size={32} color="#253a6c" />
        <View className='flex-1 flex-col items-start justify-center gap-y-0 h-12 leading-5'>
          <Text className='font-space-mono font-medium text-gray-800 text-lg '>Phone Number</Text>
          <Text className='font-space-mono font-light text-gray-500 text-sm '>Stay connected with your latest number.</Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" className='flex' size={24} color="#1f2937" />
      </View>

    </View>

   

    </View>
  )
}
