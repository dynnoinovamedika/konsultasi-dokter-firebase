import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, getData, storeData} from '../../utils';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {Fire_Auth} from '../../config/Fire';
import {getDatabase, ref, child, push, update, set} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import { ILNullPhoto } from '../../assets';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });

  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto)
  const [photoForDb, setPhotoForDb] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
      console.log('Data', data);
    });
  }, []);

  const update = () => {
    console.log('update profile', profile);
    const data = profile;
    data.photo = photoForDb
    const db = getDatabase();
    set(ref(db, `users/${profile.uid}/`), profile)
      .then(res => {
        console.log('success', res);
        storeData('user', data)
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  const changeText = (key, value) => {
    setProfile({...profile, [key]: value});
  };

  const getImage = () => {
    launchImageLibrary(
      {quality: 0.3, maxWidth: 200, maxHeight: 200, includeBase64: true},
      callback => {
        console.log(callback);
        if (callback.didCancel || callback.error) {
          showMessage({
            message: 'Oop, sepertinya anda tidak memilih fotonya',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          setPhotoForDb(
            `data:${callback.assets[0].type};base64, ${callback.assets[0].base64}`,
          );
          const source = {uri: callback.assets[0].uri};
          setPhoto(source);
          console.log('Response get image', callback);
        }
      },
    );
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" disable value={profile.email} />
          <Gap height={24} />
          <Input label="Password" value={password} />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {padding: 40, paddingTop: 0},
});
