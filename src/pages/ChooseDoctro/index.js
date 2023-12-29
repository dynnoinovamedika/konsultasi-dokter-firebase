import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header, List} from '../../components'
import { DummyDoctor1 } from '../../assets'
import { colors } from '../../utils'
import { equalTo, getDatabase, limitToLast, onValue, orderByChild, ref, once } from 'firebase/database';

const ChooseDoctor = ({navigation, route}) => {
  const itemcategory = route.params
  const [choose, setChoose] = useState([])

  const db = getDatabase();

  useEffect(() => {
    callDoctorByCategory(itemcategory.category)
  }, [itemcategory.category])

  const callDoctorByCategory = (category) => {
    const dbDoctor = ref(db, 'docters/', orderByChild('category'),equalTo(category))
    const fetchDataCategoryDoctor = () => {
      const newsArray = [];
      onValue(
        dbDoctor,
        snapshot => {
          snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            console.log('Chooce Dokter', childData)
            newsArray.push(childData);
          });
          setChoose(newsArray);
        },
        {
          onlyOnce: true,
        },
      );
    };
    fetchDataCategoryDoctor(itemcategory.category);
  }

  return (
    <View style={styles.page}>
      <Header title={`Pilih ${itemcategory.category}`} type="dark" onPress={() => navigation.goBack()}/>
      <List tipe="next" profile={DummyDoctor1} name="Alexander Janie" desc="Wanita" onPress={() => navigation.navigate('Chatting')}/>
      <List tipe="next" profile={DummyDoctor1} name="Alexander Janie" desc="Wanita"/>
      <List tipe="next" profile={DummyDoctor1} name="Alexander Janie" desc="Wanita"/>
      <List tipe="next" profile={DummyDoctor1} name="Alexander Janie" desc="Wanita"/>
      <List tipe="next" profile={DummyDoctor1} name="Alexander Janie" desc="Wanita"/>
    </View>
  )
}

export default ChooseDoctor

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white, flex: 1
  }
})