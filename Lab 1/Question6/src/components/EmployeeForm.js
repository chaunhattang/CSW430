import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { styles } from "../../styles";
import EmployeeDisplay from "./EmployeeDisplay";

const EmployeeForm = () => {
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);

    const handleUpdate = () => {
        if (!fullName || !age || !occupation) {
            Alert.alert('Please fill in all fields');
            return;
        }
        setIsUpdated(true);
    }

    return (
        <View style={styles.section} >
            <Text style={styles.title}>1a. Employee Information</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />

            <TextInput
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Occupation"
                value={occupation}
                onChangeText={setOccupation}
            />

            <Button
                title="Update"
                onPress={handleUpdate}
                color="#007BFF"
            />

            {isUpdated && (
                <>
                    <Text style={styles.successMessage}>
                        Employee information updated successfully!
                    </Text>
                    <EmployeeDisplay
                        fullName={fullName}
                        age={age}
                        occupation={occupation}
                    />
                </>
            )}
        </View>
    );
}
export default EmployeeForm;