import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { takePhoto, pickFromGallery } from '@/hooks/useImagePick';
// import { HStack } from '../ui/hstack';


const ImageSourceModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-10">
        
        <View className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
          
          <View className="p-4 border-b border-gray-200">
            <MaterialCommunityIcons name="window-close" size={24} color="black" className='self-end' onPress={onClose} />
            <Text className="text-2xl font-bold text-MainTheme text-center">
              Select Image Source
            </Text>
            <Text className="text-base text-gray-600 text-center mt-2">
              Choose how you want to select your image
            </Text>
          </View>
          
          <View className="px-5 py-3 flex flex-row justify-end gap-x-5">
            <TouchableOpacity onPress={()=>takePhoto()}
              className="bg-[#A0AEC0] rounded-lg flex-1 py-3  items-center"
              activeOpacity={0.7}
            >
              <Text className="text-white font-semibold text-lg">Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> pickFromGallery()}
              className="bg-MainTheme rounded-lg flex-1 py-3  items-center"
              activeOpacity={0.7}
            >
              <Text className="text-white font-semibold text-lg">Gallery</Text>
            </TouchableOpacity>
          </View>
         
        </View>
      </View>
    </Modal>
  );
};

export default ImageSourceModal;