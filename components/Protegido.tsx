import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const Protegido = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!loading && !session) {
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  }, [loading, session, navigation]);

  if (loading) return <ActivityIndicator size="large" color="#0071ce" />;
  if (!session) return null;

  return <>{children}</>;
};

export default Protegido;