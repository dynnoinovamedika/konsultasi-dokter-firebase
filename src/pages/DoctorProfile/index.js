import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Gap, Header, Profile, ProfileItem } from '../../components'
import { colors } from '../../utils'

const DoctorProfile = ({navigation, route}) => {
  const dataDoctor = route.params;


  return (
    <View style={styles.page}>
    <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
    <Profile name={dataDoctor.fullname} desc={dataDoctor.category} photoDocter={dataDoctor.photo}/>
    <Gap height={10} />
    <ProfileItem label="ALumnus" value={dataDoctor.university}/>
    <ProfileItem label="Tempat Praktir" value={dataDoctor.hospital_address}/>
    <ProfileItem label="No. STR" value={dataDoctor.str_number}/>
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
  