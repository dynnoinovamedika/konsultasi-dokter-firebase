import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconDoctor, IconDoctorActive, IconHospitals, IconHospitalsActive, IconMessages, IconMessagesActive } from '../../../assets'
import { colors, fonts } from '../../../utils'

const TabItem = ({title, active, onPress, onLongPress}) => {
    const Icon = () => {
        if(title === 'Doctor'){
            return active ? <Image source={IconDoctorActive}/> : <Image source={IconDoctor}/>
        }

        if(title === 'Messages'){
            return active ? <Image source={IconMessagesActive}/> : <Image source={IconMessages}/>
        }

        if(title === 'Hospitals'){
            return active ? <Image source={IconHospitalsActive}/> : <Image source={IconHospitals}/>
        }
        return <Image source={IconDoctor}/>
    }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
        <Icon/>
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: (active) => (
        {
            fontSize: 10,
            color: active ? colors.text.menuActive : colors.text.menuInactive, fontFamily: fonts.primary[600], marginTop: 4
        }
    )
})