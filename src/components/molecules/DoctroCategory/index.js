import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ILCatObat, ILCatPsikiater, ILCatUmum } from '../../../assets'
import { colors, fonts } from '../../../utils'

const DoctorCategory = ({category, onPress}) => {

  const Icon = () => {
    if(category === 'Dokter Umum'){
      return <Image source={ILCatUmum} style={styles.ilustration}/>
    }
    if(category === 'Psikiater'){
      return <Image source={ILCatPsikiater} style={styles.ilustration}/>
    }

    if(category === 'Dokter Obat'){
      return <Image source={ILCatObat} style={styles.ilustration}/>
    }

    return <Image source={ILCatUmum} style={styles.ilustration}/>
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon/>
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
  )
}

export default DoctorCategory

const styles = StyleSheet.create({
  container: {
    padding: 12, backgroundColor: colors.cardLight, alignSelf: 'flex-start', borderRadius: 10, marginRight: 10, width: 110, height: 140
  }, ilustration: {
    marginBottom: 28
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary
  },
  category: {
    fontSize: 12, fontFamily: fonts.primary[600], color: colors.text.primary
  }
})