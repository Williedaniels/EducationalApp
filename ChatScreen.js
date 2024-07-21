// ChatScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { firestore, auth } from './firebaseConfig';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unsubscribe = firestore.collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const msgList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(msgList);
            });
        return unsubscribe;
    }, []);

    const sendMessage = () => {
        const user = auth.currentUser;
        firestore.collection('messages').add({
            text: message,
            userId: user.uid,
            createdAt: new Date()
        });
        setMessage('');
    };

    return (
        <View>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text>{item.text}</Text>
                )}
            />
            <TextInput
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

export default ChatScreen;

// FeedbackScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { firestore, auth } from './firebaseConfig';

const FeedbackScreen = () => {
    const [feedback, setFeedback] = useState('');

    const sendFeedback = () => {
        const user = auth.currentUser;
        firestore.collection('feedback').add({
            text: feedback,
            userId: user.uid,
            createdAt: new Date()
        });
        setFeedback('');
    };

    return (
        <View>
            <TextInput
                value={feedback}
                onChangeText={setFeedback}
                placeholder="Write your feedback here"
            />
            <Button title="Send" onPress={sendFeedback} />
        </View>
    );
};

export default FeedbackScreen;