import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const UserBoxes = (props) => {
  const Icon = props.icon
  return (
    <TouchableOpacity className='bg-blue-500  p-4 border border-black rounded-xl mb-5' onPress={props.press}>
      <View className='flex-row items-center space-x-4' ><Icon size={20} color="white" /><Text className='text-2xl text-white font-bold'>{props.buttonText}</Text></View>
    </TouchableOpacity>
  )
}

export default UserBoxes