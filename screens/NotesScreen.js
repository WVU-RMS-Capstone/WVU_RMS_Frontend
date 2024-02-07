import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

function NotesScreen() {
  const [value, onChangeText] = React.useState('');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

      <TextInput
        editable
        autoFocus
        multiline
        numberOfLines={4}
        placeholder='Enter Notes'
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{padding: 10}}
      />
   <Button title="Submit"
        onPress={null} />
    </View>
  );
}

export default NotesScreen;