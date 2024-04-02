import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';

function CategoryExercisesScreen({ navigation, route }) {
  const { rawExercises } = route.params;
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    setFilteredExercises(rawExercises);
  }, []);
  
  const searchFilter = (text) => {
    if (text) {
      const updatedData = rawExercises.filter((item) => {
        const item_data = `${item.key.toUpperCase()}`;
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setSearch(text);
      setFilteredExercises(updatedData);
    } else {
      setFilteredExercises(rawExercises)
      setSearch('')
    }
  }
  
  // This will return a View containing a list of exercises as a result of the filtered search results.
  const exerciseList = () => {
    const list = [];
    
    for (e in filteredExercises) {
      list.push(
        <View key={e}>
          <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('ExerciseDetailScreen', { exerciseID: filteredExercises[e].id })}>
            <View style={styles.row}>
              <Text>{filteredExercises[e].key}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    
    return list;
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.searchBox}>
        <TextInput
            style={[styles.input, { backgroundColor: 'white' }]}
            clearButtonMode='always'
            placeholder='Search Exercise'
            autoCapitalize='none'
            value={search}
            onChangeText={(text) => searchFilter(text)}
        />
        </View>

        <View style={{ maxHeight: '62%' }}>
        <ScrollView style={{}}>
            { exerciseList() }
        </ScrollView>
        </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5',
  },
  searchBox: {
    marginHorizontal: 20,
    marginBottom: 25
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  background: {
    margin: 50,
    backgroundColor: 'white',
  },
  ath: {
    backgroundColor: 'white',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    height: 25,
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    })
  },
  row: {
    flexDirection: "row",
  },
  button: {
    // paddingLeft: 150,
    marginTop: '50%',
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 5,
    color: '#1E3861',
    width: '50%',
  },
})

export default CategoryExercisesScreen;