import React from 'react';
import { ScrollView } from 'react-native';
import data from './Data'
import Square from './Square';
import styles from './style';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <Square key={item} text={`Square: ${index + 1}`} />
      ))}
    </ScrollView>
  );
}

