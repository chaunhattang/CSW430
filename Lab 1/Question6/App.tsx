import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './styles';
import { ScrollView, Text } from "react-native";
import EmployeeForm from "./src/components/EmployeeForm";
import SumFirstLastDigit from "./src/components/SumFirstLastDigit";
import MinOfThreeNumbers from "./src/components/MinOfThreeNumbers";
import HailstoneSequence from "./src/components/HailstoneSequence";


export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>LAB 1 - Question 6</Text>

                <EmployeeForm />
                <SumFirstLastDigit />
                <MinOfThreeNumbers />
                <HailstoneSequence />
            </ScrollView>
        </SafeAreaView>
    );
}