import React from 'react';
import {View, FlatList, StyleSheet, Text, Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop:'20%',
    marginBottom:'10%',
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 50,
    fontSize: 18,
    height: 44,
    width:'20%',
  },
  
});

function RosterScreen({ navigation, route }) {
  const sessionKey = route.params.sessionKey;
  return (
    <View style={styles.container}>
       <FlatList
        data={[
          {key: 'Devin A'},
          {key: 'Dan B'},
          {key: 'Dominic C'},
          {key: 'Jackson D'},
          {key: 'James E'},
          {key: 'Joel F'},
          {key: 'John G'},
          {key: 'Jillian H'},
          {key: 'Jimmy I'},
          {key: 'Julie J'},
          {key: 'Devin K'},
          {key: 'Dan L'},
          {key: 'Dominic M'},
          {key: 'Jackson N'},
          {key: 'James O'},
          {key: 'Joel P'},
          {key: 'John Q'},
          {key: 'Jillian R'},
          {key: 'Jimmy S'},
          {key: 'Julie T'},
          {key: 'Devin U'},
          {key: 'Dan V'},
          {key: 'Dominic W'},
          {key: 'Jackson X'},
          {key: 'James Y'},
          {key: 'Joel Z'},
          {key: 'John A'},
          {key: 'Jillian B'},
          {key: 'Jimmy C'},
          {key: 'Julie D'},
        ]}
        renderItem={({item}) => <Button title={item.key} style={styles.item} onPress={() => navigation.navigate('AthleteProfileScreen', {sessionKey :sessionKey})} />}
      />
    </View>
  );
}

export default RosterScreen;