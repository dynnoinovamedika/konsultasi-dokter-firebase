import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DummyDoctor1, DummyDoctor2, DummyDoctor3 } from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import { colors, fonts } from '../../utils';

const Doctor = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [doctorCategory, setDoctorcategory] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'news/');

    const fetchData = () => {
      const newsArray = [];
      onValue(
        dbRef,
        snapshot => {
          snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            newsArray.push(childData);
          });
          setNews(newsArray);
        },
        {
          onlyOnce: true,
        },
      );
    };

    fetchData();

    // Data dokter
    const dbDoctor = ref(db, 'doctor-category/');

    const fetchDataCategoryDoctor = () => {
      const newsArray = [];
      onValue(
        dbDoctor,
        snapshot => {
          snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            newsArray.push(childData);
          });
          setDoctorcategory(newsArray);
        },
        {
          onlyOnce: true,
        },
      );
    };
    fetchDataCategoryDoctor();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {doctorCategory.map(item => {
                  return (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor')}
                  />
                  )
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionlabel}>Top Rated Doctors</Text>
            <RatedDoctor
              name="Alexa Rachel"
              desc="Pediatrician"
              avatar={DummyDoctor1}
              onPress={() => navigation.navigate('DoctorProfile')}
            />
            <RatedDoctor
              name="Sunny Frank"
              desc="Dentist"
              avatar={DummyDoctor2}
              onPress={() => navigation.navigate('DoctorProfile')}
            />
            <RatedDoctor
              name="Bagus"
              desc="Pediatrician"
              avatar={DummyDoctor3}
              onPress={() => navigation.navigate('DoctorProfile')}
            />

            <Text style={styles.sectionlabel}>Good News</Text>
          </View>
          {news.map(item => {
            return (
              <NewsItem
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}

          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {paddingHorizontal: 16},
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
    marginBottom: 10,
    maxWidth: 289,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionlabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
