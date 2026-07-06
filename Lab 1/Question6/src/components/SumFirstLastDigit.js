import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { styles } from "../../styles";

const SumFirstLastDigit = () => {
    const [numberStr, setNumberStr] = useState('');
    const [sumResult, setSumResult] = useState(null);

    const calculateSum = () => {
        if (!numberStr || isNaN(numberStr)) {
            Alert.alert('Please enter a valid number');
            return;
        }
        const cleanStr = numberStr.replace('-', '');

        const firstDigit = parseInt(cleanStr[0], 10);
        const lastDigit = parseInt(cleanStr[cleanStr.length - 1], 10);
        setSumResult(firstDigit + lastDigit);
    };

    return (
        <View style={styles.section}>
            <Text style={styles.title}>1b. Sum of First and Last Digit</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a number"
                value={numberStr}
                onChangeText={setNumberStr}
                keyboardType="numeric" />

            <Button
                title="Calculate Sum"
                onPress={calculateSum}
                color="#28A745"
            />

            {sumResult !== null && (
                <Text style={styles.resultText}>
                    Sum of first and last digit: {sumResult}
                </Text>
            )}
        </View>
    );
}
export default SumFirstLastDigit;