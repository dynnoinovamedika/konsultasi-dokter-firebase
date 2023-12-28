import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, Header, List, Profile} from '../../components';
import { getData } from '../../utils';
import { ILNullPhoto } from '../../assets';
import { getAuth, signOut } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';

const UserProfile = ({navigation}) => {
  const [profile, setprofile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto
  });

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setprofile(res);
      console.log('Data', data);
    });
  }, []);

  const logout = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      console.log("Logout success")
      navigation.replace("GetStarted")
    }).catch((error) => {
      showMessage({
        message: error.message,
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white,
      });
    });
  }

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile name={profile.fullName} desc={profile.profession} photo={profile.photo}/>
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Last Update Yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        desc="Last Update Yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Logout"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={logout}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
});
