import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {Button, Gap, Header, Link} from '../../components';
import {ILNullPhoto, IcAddPhoto, IconAddPhoto, IconRemovePhoto} from '../../assets';
import {colors, fonts} from '../../utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadPhoto = ({navigation}) => {
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photo, setPhoto] = useState(ILNullPhoto)

  const getImage = () => {
    launchImageLibrary({}, callback => {
      console.log(callback);
      const source = {uri: callback.assets[0].uri}
      setPhoto(source)
      setHasPhoto(true)
    });
  }
 
   return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()}/>
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto &&  <Image source={IconRemovePhoto} style={styles.IcAddPhoto}/>}
            {!hasPhoto && <Image source={IconAddPhoto} style={styles.IcAddPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>Dynno Yohanis Ottu</Text>
          <Text style={styles.profession}>Mobile Programmer</Text>
        </View>
        <View>
          <Button title="Upload and Continue" onPress={() => navigation.replace('MainApp')} disable={!hasPhoto}/>
          <Gap height={30}/>
          <Link title="Skip for this" align="center" size={16} onPress={() => navigation.replace('MainApp')}/>
          <Gap height={40}/>
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
    paddingBottom: 40
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110/2
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
    justifyContent: 'center'
  }
});
