// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from './firebaseConfig';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = () => {
        if (isLogin) {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => navigation.navigate('Home'))
                .catch(error => alert(error.message));
        } else {
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => navigation.navigate('Home'))
                .catch(error => alert(error.message));
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title={isLogin ? "Login" : "Register"} onPress={handleAuth} />
            <Text onPress={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </Text>
        </View>
    );
};

export default LoginScreen;