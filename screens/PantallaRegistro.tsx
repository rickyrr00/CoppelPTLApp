import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PantallaRegistro = () => {
  const navigation = useNavigation<any>();

  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [errores, setErrores] = useState({
    nombre: '',
    username: '',
    correo: '',
    contrasena: '',
    confirmar: '',
    terminos: '',
  });

  const validarCorreo = (correo: string) => /\S+@\S+\.\S+/.test(correo);

  const handleRegistro = async () => {
    let erroresTemp = {
      nombre: '',
      username: '',
      correo: '',
      contrasena: '',
      confirmar: '',
      terminos: '',
    };

    if (!nombre.trim()) erroresTemp.nombre = 'El nombre es obligatorio';
    if (!username.trim()) erroresTemp.username = 'El nombre de usuario es obligatorio';
    if (!correo.trim() || !validarCorreo(correo)) erroresTemp.correo = 'Correo inválido';
    if (!contrasena.trim()) erroresTemp.contrasena = 'La contraseña es obligatoria';
    if (contrasena !== confirmarContrasena) erroresTemp.confirmar = 'Las contraseñas no coinciden';
    if (!aceptaTerminos) erroresTemp.terminos = 'Debes aceptar los términos';

    setErrores(erroresTemp);
    const hayErrores = Object.values(erroresTemp).some((e) => e !== '');
    if (hayErrores) return;

    const nuevoUsuario = {
      nombre,
      username,
      correo,
      contrasena,
    };

    await AsyncStorage.setItem(`usuario_${correo.toLowerCase()}`, JSON.stringify(nuevoUsuario));
    await AsyncStorage.setItem(`usuario_${username.toLowerCase()}`, JSON.stringify(nuevoUsuario));

    Alert.alert('¡Registro exitoso!', 'Ahora puedes iniciar sesión.');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoRegresar}>←</Text>
        </TouchableOpacity>
  
        <Text style={styles.titulo}>Crear cuenta</Text>
  
        <TextInput style={styles.input} placeholder="Nombre completo" value={nombre} onChangeText={setNombre} />
        {errores.nombre ? <Text style={styles.error}>{errores.nombre}</Text> : null}
  
        <TextInput style={styles.input} placeholder="Nombre de usuario" value={username} onChangeText={setUsername} />
        {errores.username ? <Text style={styles.error}>{errores.username}</Text> : null}
  
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />
        {errores.correo ? <Text style={styles.error}>{errores.correo}</Text> : null}
  
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />
        {errores.contrasena ? <Text style={styles.error}>{errores.contrasena}</Text> : null}
  
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmarContrasena}
          onChangeText={setConfirmarContrasena}
        />
        {errores.confirmar ? <Text style={styles.error}>{errores.confirmar}</Text> : null}
  
        <TouchableOpacity style={styles.terminosContainer} onPress={() => setAceptaTerminos(!aceptaTerminos)}>
          <Ionicons
            name={aceptaTerminos ? 'checkbox-outline' : 'square-outline'}
            size={24}
            color="#0071ce"
          />
          <Text style={styles.terminosTexto}>
            Acepto los{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Terminos')}>
              términos y condiciones
            </Text>
          </Text>
        </TouchableOpacity>
        {errores.terminos ? <Text style={styles.error}>{errores.terminos}</Text> : null}
  
        <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
          <Text style={styles.botonTexto}>Registrarme</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );  
};

export default PantallaRegistro;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#0071ce',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    marginTop: 20,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 13,
  },
  terminosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  terminosTexto: {
    marginLeft: 8,
    fontSize: 14,
  },
  link: {
    color: '#0071ce',
    textDecorationLine: 'underline',
  },
  botonRegresar: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },
  textoRegresar: {
    fontSize: 24,
    color: '#0071ce',
    fontWeight: 'bold',
  },
});

