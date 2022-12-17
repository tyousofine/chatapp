import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Icon } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';


export default RegisterScreen = () => {

        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [image, setImage] = useState(null);
        
        
        const register = () => {
            if (name.length === 0) {
                Alert.alert("Please enter your name or a user name.")
                return;
            }
            if (email.length < 4) {
                Alert.alert('Please enter a valid email address.');
                return;
              }

              if (password.length < 8) {
                Alert.alert('Invalid password. Please create a password with 8 characters or more.');
                return;
              }

              if (password !== confirmPassword) {
                Alert.alert('Passwords not matching. Please re-enter.');
                return;
              }
           
            // const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            Alert.alert('User Created!')

            updateProfile(user, {
                displayName: name, photoURL: image? image: "https://www.pngitem.com/pimgs/m/576-5768680_avatar-png-icon-person-icon-png-free-transparent.png"
            }).then(() => {
                    //Profile update!
                }).catch((error) => {
                    // an error has occured
                })
            
             })
            .catch((error) => {
            
            const errorMessage = error.code;
            if (errorMessage == 'auth/invalid-email') {
                Alert.alert('Please enter a valid email.')

            } else if (errorMessage === "auth/email-already-in-use") {
                Alert.alert('An account with this email already exists.')
            } 
            
            else {
                Alert.alert(errorMessage);
            }
            // ..
        })
       
    };

    const pickImage = async () => {
        // No permission request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4 ,3],
            quality: 1,
        })

        //console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }

        //console.log(image)
    }
  
    return (
    
    <View style={styles.container}>
        <Image style={styles.img} source={require("../cover.jpg")} />
        <ScrollView>
            <Text>ENTER YOUR NAME</Text>
                <View style={styles.txtBox}>
                    <TextInput 
                    placeholder='name' 
                    value={name} 
                    onChangeText={(text) => setName(text)}></TextInput>
                </View>
            <Text>ENTER YOUR EMAIL</Text>
                <View style={styles.txtBox}>
                    <TextInput 
                    placeholder='email' 
                    value={email} 
                    onChangeText={(text) => setEmail(text)}></TextInput>
                </View>
            <Text>ENTER YOUR PASSWORD</Text>
                <View style={styles.txtBox}>
                    <TextInput 
                    secureTextEntry={true}
                    autoCapitalize='none'
                    placeholder='password' 
                    value={password} 
                    onChangeText={(text) => setPassword(text)}></TextInput>
                </View>
            <Text>CONFIRM YOUR PASSWORD</Text>
                <View style={styles.txtBox}>
                    <TextInput
                    secureTextEntry={true}
                    autoCapitalize='none' 
                    placeholder='password' 
                    value={confirmPassword} 
                    onChangeText={(text) => setConfirmPassword(text)}></TextInput>
                </View>


            <Text>AVATAR (optional)</Text>
                <View>
                    <View style={styles.txtBox}>
                        <TextInput
                        placeholder='paste url or use gallery'
                        value={image}
                        onChangeText={(text) => setImage(text)}></TextInput>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={{ margin: 5}}
                            onPress={pickImage}>
                            <Icon name='image'></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
            
                <View>
                    <TouchableOpacity style={styles.btn}
                    onPress={register}><Text style={styles.btnTxt}>REGISTER</Text></TouchableOpacity>
                </View>
        </ScrollView>

       
    </View>
)}

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

