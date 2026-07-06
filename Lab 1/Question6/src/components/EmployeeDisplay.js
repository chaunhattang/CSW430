import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles";

const EmployeeDisplay = ({ fullName, age, occupation }) => {
    return (
        <View style={styles.resultBox}>
            <Text style={styles.resultText}>FullName: {fullName}</Text>
            <Text style={styles.resultText}>Age: {age}</Text>
            <Text style={styles.resultText}>Occupation: {occupation}</Text>
        </View>
    );
};
export default EmployeeDisplay;