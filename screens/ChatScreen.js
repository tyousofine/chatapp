import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Button, Alert} from 'react-native';
import { auth, db } from '../firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, query, orderBy, onSnapshot, } from 'firebase/firestore';
import { Icon } from '@rneui/themed'


const ChatScreen = ({navigation}) => {

    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const chatDB = collection(db, 'chats');
        const q = query(chatDB, orderBy('createdAt', 'desc'));

        const messagesListener = onSnapshot(q, (snapShot) => {
            setMessages(
                snapShot.docs.map((doc) => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        );
        })
        return messagesListener;
    }, []);


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
        _id, createdAt, text, user
    }=messages[0]
    addDoc(collection(db, 'chats'), {
        _id, createdAt, text, user
    })
    
  }, [])


    useLayoutEffect(() => { 
        navigation.setOptions({
            
            headerRight: () => (
                <TouchableOpacity 
                onPress={logOut}
                style={{marginRight: 10,}}><Icon name='logout'></Icon></TouchableOpacity>
               
            )
        })
    }, [])


    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        navigation.replace("Tina's Simple Chat App")
        }).catch((error) => {
        // An error happened.
    });
    }

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            renderUsernameOnMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar:auth?.currentUser?.photoURL
             }}
        />
    )
}

export default ChatScreen;