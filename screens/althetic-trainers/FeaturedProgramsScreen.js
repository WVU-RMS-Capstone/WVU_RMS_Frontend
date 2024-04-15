import React from 'react';
import {View, Button} from 'react-native';

function FeaturedProgramsScreen({ navigation }) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Featured Program"
        onPress={() => navigation.navigate('SelectedFeaturedProgramScreen')} />
    </View>
  );
}

export default FeaturedProgramsScreen;