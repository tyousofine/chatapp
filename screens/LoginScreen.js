import React, { useEffect, useState }from 'react'
import { View, Alert, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const signIn = () => {
        if (email.length === 0) {
            Alert.alert('Please enter your email');
            return;
          } else if (email.length < 4) {
            Alert.alert('Please enter a valid email')
          }

          if (password.length === 0) {
            Alert.alert('Please enter your password.');
            return;
          }


        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
         const user = userCredential.user;
        // ...
        })
        .catch((error) => {
       
         const errorMessage = error.message;
         if (errorMessage === 'auth/wrong-password') {
            alert('Incorrect password. Please try again')
         }
         else if (errorMessage === 'auth/user-not-found') {
            alert("No Account with provided email. Please register if you don't have an account" )
         }
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Chat');
                // User is signed in, see docs for a list of available  properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                     // ...
                }  else {
                    // User is signed out
                     // ...
                 }
             });
             return unsubscribe
    }, []);


    return (
        <View style={styles.container}>
            <Image style={styles.img} 
            source={require("../cover.jpg")}></Image>
            
        <View style={{ flex: 3 }}>
            <View style={styles.inputsContainer}>
                <Text style={{ fontWeight: 'bold', color: '#4e4e4e'}}>EMAIL</Text>
                    <View style={styles.txtBox}>
                    <TextInput 
                    placeholder='Enter your email' 
                    value={email} 
                    onChangeText={text => setEmail(text)} />
                    </View>

                <Text style={{ fontWeight: 'bold', color: '#4e4e4e'}}>PASSWORD</Text>
                    <View style={styles.txtBox}>
                    <TextInput 
                    placeholder='Enter your password' 
                    secureTextEntry={true}
                    value={password} 
                    autoCapitalize="none"
                    onChangeText={text=> setPassword(text)}/>
                </View>
            </View>
            
            <View >
                <TouchableOpacity style={styles.btn} 
                    onPress={signIn}>
                    <Text style={styles.btnTxt}>SIGN IN</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btn} 
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.btnTxt}>REGISTER</Text></TouchableOpacity>
            </View>
        </View>
    </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },

    inputsContainer: {
        marginTop: 10,
        marginBottom: 30
    },

    txtBox: {
        
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        width: '100%'
    },

    // btnContainer: {
    // },

    btn: { 
        backgroundColor: '#1DA1F2',
        width: 275,
        height: 35,
        margin: 5,
        justifyContent: 'center',
        borderRadius: 7,
    },

    btnTxt: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },

    img: {
        flex: 2,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        marginBottom: 20
    }
})


