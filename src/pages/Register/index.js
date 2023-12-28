import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Gap, Header, Input, Loading } from '../../components';
import { Fire_Auth } from '../../config/Fire';
import { colors, getData, storeData, useForm } from '../../utils';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import { showMessage } from 'react-native-flash-message';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const auth = Fire_Auth;

  const [loading, setLoading] = useState(false);


  const onContinue = async () => {
    console.log(form);

    setLoading(true);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        setLoading(false);
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: userCredential.user.uid
        };

        const db = getDatabase();
        set(ref(db, 'users/' + userCredential.user.uid + '/'), data);
        storeData("User", data)
        navigation.navigate('UploadPhoto', data)
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  // onPress={() => }

  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={value => setForm('profession', value)}
            />
            <Gap height={24} />
            <Input
              label="Email Address"
              value={form.email}
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry={true}
            />
            <Gap height={40} />
            <Button title="Continue" onPress={onContinue} />
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
