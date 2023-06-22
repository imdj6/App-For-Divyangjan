import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const UserBoxes = (props) => {
  const Icon = props.icon
  return (
    <TouchableOpacity className='bg-white p-4 border border-black rounded-xl mb-5' onPress={props.press}>
      <View className='flex-row items-center space-x-4' ><Icon size={20} color="black" /><Text className='text-2xl font-bold'>{props.buttonText}</Text></View>
    </TouchableOpacity>
  )
}

export default UserBoxes