import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header, Link} from '../../components';
import {
  ILNullPhoto,
  IcAddPhoto,
  IconAddPhoto,
  IconRemovePhoto,
} from '../../assets';
import {colors, fonts, storeData} from '../../utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {getDatabase, ref, set, update} from 'firebase/database';

const UploadPhoto = ({navigation, route}) => {
  const {fullName, profession, uid} = route.params;
  const [photoForDb, setPhotoForDb] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
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
          setHasPhoto(true);
          console.log('Response get image', callback);
        }
      },
    );
  };

  const uploadAndContinue = () => {
    const db = getDatabase();
    update(ref(db, 'users/' + uid + '/'), {photo: photoForDb});
    const data = route.params;
    data.photo = photoForDb;
    storeData('user', data);
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && (
              <Image source={IconRemovePhoto} style={styles.IcAddPhoto} />
            )}
            {!hasPhoto && (
              <Image source={IconAddPhoto} style={styles.IcAddPhoto} />
            )}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button
            title="Upload and Continue"
            onPress={uploadAndContinue}
            disable={!hasPhoto}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
          <Gap height={40} />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IcAddPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
