import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDACv_bhiLwKatC9zijRaj4RNRBKzQ5_CE',
  authDomain: 'konsultasi-dokter-5e63a.firebaseapp.com',
  projectId: 'konsultasi-dokter-5e63a',
  storageBucket: 'konsultasi-dokter-5e63a.appspot.com',
  messagingSenderId: '854976333763',
  appId: '1:854976333763:web:4a50de293b61943deadf76',
  databaseURL: "https://konsultasi-dokter-5e63a-default-rtdb.asia-southeast1.firebasedatabase.app",
};


export const Fire = initializeApp(firebaseConfig)
export const Fire_Auth = getAuth(Fire)
export const Fire_DB = getFirestore(Fire)
