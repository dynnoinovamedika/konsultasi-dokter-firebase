import React, { useState } from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {colors, useForm} from '../../utils';
import { Fire_Auth } from '../../config/Fire';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage, hideMessage } from "react-native-flash-message";


const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const auth = Fire_Auth

  const [loading, setLoading] = useState(false)

  const onContinue = async () => {
    console.log(form);
    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(auth, form.email, form.password)
      setLoading(false)
      setForm('reset')
      console.log('Register sukses', response)
    } catch (error) {
      console.log(error)
      setLoading(false)
      const errorMessage = error.message
      showMessage({
        message: errorMessage,
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white
      })
    }
  }

  // onPress={() => navigation.navigate('UploadPhoto')}

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
    {loading && <Loading/>}
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
