import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DummyHospital1, DummyHospital2, ILHospitalBG} from '../../assets';
import {colors, fonts} from '../../utils';
import { ListHospital } from '../../components';

const Hospitals = () => {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospital type="Rumah Sakit Anak" name="Citra Bunga Utama"address="Jln. Jupiter 20" pic={DummyHospital1}/>
        <ListHospital type="Rumah Sakit Umum" name="Prof. DR. W. Z. Johannes Kupang"address="Kota Kupang" pic={DummyHospital2}/>
        <ListHospital type="Klinik" name="Klinik Utama"address="Jln. Sakti 20" pic={DummyHospital1}/>
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  background: {height: 240, paddingTop: 30},
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14
  },
});
