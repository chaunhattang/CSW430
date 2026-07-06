import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { styles } from "../../styles";

const MinOfThreeNumbers = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [minResult, setMinResult] = useState(null);

    const findMinimum = () => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        const c = parseFloat(num3);
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            Alert.alert('Please enter valid numbers');
            return;
        }
        setMinResult(Math.min(a, b, c));
    };

    return (
        <View style={styles.section}>
            <Text style={styles.title}>2. Minimum of Three Numbers</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter first number"
                value={num1}
                onChangeText={setNum1}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter second number"
                value={num2}
                onChangeText={setNum2}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter third number"
                value={num3}
                onChangeText={setNum3}
                keyboardType="numeric"
            />
            <Button
                title="Find Minimum"
                onPress={findMinimum}
                color="#ffc107"
            />
            {minResult !== null && (
                <Text style={styles.resultText}>
                    Minimum: {minResult}
                </Text>
            )}
        </View>
    );
};
export default MinOfThreeNumbers;