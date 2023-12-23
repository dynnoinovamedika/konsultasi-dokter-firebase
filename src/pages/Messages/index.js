import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DummyDoctor1, DummyDoctor2, DummyDoctor3 } from '../../assets';
import { List } from '../../components';
import { colors, fonts } from '../../utils';

const Messages = ({navigation}) => {
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        <List profile={DummyDoctor1} name="Alexa" desc="Selamat datang, ada yang bisa..." onPress={() => navigation.navigate('Chatting')}/>
        <List profile={DummyDoctor2} name="Bagus" desc="Baik, terima kasih untuk wak..." onPress={() => navigation.navigate('Chatting')}/>
        <List profile={DummyDoctor3} name="Rani" desc="Segera konsultasi ke dokter..." onPress={() => navigation.navigate('Chatting')}/>
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  content: {backgroundColor: colors.white, flex: 1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20},
  title: {fontSize: 20, fontFamily: fonts.primary[600], color: colors.text.primary, marginTop: 30, marginLeft: 16}
});
