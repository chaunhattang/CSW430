import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { styles } from "../../styles";

const HailstoneSequence = () => {
    const [inputN, setInputN] = useState('');
    const [sequence, setSequence] = useState([]);

    const generateSequence = () => {
        let n = parseInt(inputN, 10);
        if (isNaN(n) || n <= 0) {
            Alert.alert('Please enter a positive integer');
            return;
        }
        let seq = [];
        while (n !== 1) {
            seq.push(n);
            if (n % 2 === 0) {
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
        }
        seq.push(1);
        setSequence(seq);
    }

    return (
        <View style={styles.section}>
            <Text style={styles.title}>3. Hailstone Sequence</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a positive integer"
                value={inputN}
                onChangeText={setInputN}
                keyboardType="numeric"
            />
            <Button title="Generate Sequence" onPress={generateSequence} />
            {sequence.length > 0 && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                        Hailstone Sequence: {sequence.join(' ➔ ')}
                    </Text>
                </View>
            )}
        </View>
    );
}
export default HailstoneSequence;