import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ChatItem, Header, InputChat} from '../../components';
import {colors, fonts} from '../../utils';

const Chatting = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header type="dark-profile" title="Nairobi Putri Hayza" onPress={()=> navigation.goBack()}/>
      <Text style={styles.chatDate}>Rabu, 20 Maret 2023</Text>
      <View style={styles.content}>
        <ChatItem isMe/>
        <ChatItem />
        <ChatItem isMe/>
      </View>
      <InputChat />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {flex: 1},
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
