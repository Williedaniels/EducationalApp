// AdminPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { firestore } from './firebaseConfig';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firestore.collection('users').get()
            .then(snapshot => {
                const userList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userList);
            });
    }, []);

    const addCourse = () => {
        // Logic to add a new course
    };

    return (
        <View>
            <Text>Admin Page</Text>
            {users.map(user => (
                <Text key={user.id}>{user.email}</Text>
            ))}
            <Button title="Add Course" onPress={addCourse} />
        </View>
    );
};

export default AdminPage;