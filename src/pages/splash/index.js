import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ILLogo } from '../../assets'
import { Fire_Auth, auth } from '../../config/Fire'
import { colors, fonts } from '../../utils'
import { onAuthStateChanged } from 'firebase/auth'

const Spalsh = ({navigation}) => {
  useEffect(() =>{
    setTimeout(() => {  
      const auth = Fire_Auth
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          navigation.replace("MainApp")
        } else {
          navigation.replace("GetStarted")
        }
      }); 
    }, 3000)
  }, [])
  return  ( 
    <View style={styles.page}>
    <Image source={ILLogo}/>
    <Text style={styles.title}>My Doctor</Text>
  </View>
  )
}

export default Spalsh

const styles = StyleSheet.create({
    page: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white
    },
    title: {
        fontSize: 20, fontFamily: fonts.primary[600], color: colors.text.primary, marginTop: 20
    }
})