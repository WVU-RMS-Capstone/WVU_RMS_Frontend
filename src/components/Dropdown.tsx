import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
        <Text>{selectedOption}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionSelect(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};


export default Dropdown;
