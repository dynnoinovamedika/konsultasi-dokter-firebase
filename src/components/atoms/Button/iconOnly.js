import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { IconBackDark, IconBackLight } from '../../../assets'

const IconOnly = ({onPress, icon}) => {
    const Icon = () => {
        if(icon === 'back-dark'){
            return <Image source={IconBackDark}/>
        }
        if(icon === 'back-light'){
            return <Image source={IconBackLight}/>
        }

        return <Image source={IconBackDark}/>
    }
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon/>
    </TouchableOpacity>
  )
}

export default IconOnly