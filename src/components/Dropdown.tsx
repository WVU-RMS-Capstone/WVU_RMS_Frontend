import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function Dropdown ({ options }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={ () => setShowOptions(!showOptions) }>
        <Text style={dropDown.text}>{selectedOption}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={dropDown.text}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const dropDown = StyleSheet.create({
  text: {
    fontSize: 28,
    fontWeight:'500'
  }});


export default Dropdown;
