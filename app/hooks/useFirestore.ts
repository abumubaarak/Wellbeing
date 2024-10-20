import firestore, {
  addDoc,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useState} from 'react';
import {APPOINTMENTS, USERS} from '../services';
import {useUser} from './useUser';

export const useFirestore = () => {
  const {uid} = useUser();
  const [data, setData] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);

  const [isLoading, setLoading] = useState<boolean>(false);

  const recommendedDoctors = async () => {
    setLoading(true);
    try {
      //true :just for testing
      const collection = await firestore()
        .collection(USERS)
        .where('userType', '==', 'doctor')
        .where('verified', '==', false)
        .limit(5)
        .get();

      const newData = collection.docs.map(doc => ({...doc.data()}));
      setData(newData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const specialistDoctors = async (area: string) => {
    setLoading(true);
    try {
      //true :just for testing

      const collection = await firestore()
        .collection(USERS)
        .where('userType', '==', 'doctor')
        .where('verified', '==', false)
        .where('specialty', '==', area)
        .get();
      const newData = collection.docs.map(doc => ({...doc.data()}));
      setData(newData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const bookAppointment = async (
    doctorID: string,
    appointmentDate: any,
    appointmentTime: any,
  ) => {
    try {
      setLoading(true);
      const docRef = await addDoc(firestore().collection(APPOINTMENTS), {
        patientID: uid,
        doctorID,
        bookingDate: new Date(),
        appointmentDate,
        appointmentTime,
      });
      if (docRef.id) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    recommendedDoctors,
    isLoading,
    data,
    specialistDoctors,
    bookAppointment,
  };
};
