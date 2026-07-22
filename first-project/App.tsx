import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>I like sport cars</Text>
      <Text>They are fast and stylish</Text>
      <StatusBar style="auto" />  
      <Text>What do you like about them?</Text>
      <TextInput placeholder="Enter your thoughts..." />
      <Button title="add" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
