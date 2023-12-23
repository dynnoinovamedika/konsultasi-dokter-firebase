import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Gap, Header, Profile, ProfileItem } from '../../components'
import { colors } from '../../utils'

const DoctorProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
    <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
    <Profile name="Nairobi Putri Hayza" desc="Dokter Anak"/>
    <Gap height={10} />
    <ProfileItem label="ALumnus" value="Stikom Uyelindo, 2022"/>
    <ProfileItem label="Tempat Praktir" value="Bandung"/>
    <ProfileItem label="No. STR" value="039849385"/>
    <Gap height={23}/>
    <View style={styles.action}>
      <Button
        title="Start Consultation"
        onPress={() => navigation.navigate('Chatting')}
      />
    </View>
  </View>
  )
}

export default DoctorProfile

const styles = StyleSheet.create({
    page: {backgroundColor: colors.white, flex: 1},
    action: {paddingHorizontal: 40, paddingTop: 23},
  });
  