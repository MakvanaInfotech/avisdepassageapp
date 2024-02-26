import React from 'react';
import {View, Text} from 'react-native';

const DisplayNumbers = ({number}) => {
    // Ensure the number is a string
    const numberStr = String(number);
    let displayText = ""
    if (numberStr.length > 6) {
        // Get the first 3 numbers
        const firstThree = numberStr.slice(0, 4);
        // Replace the middle digits with asterisks
        const middleAsterisks = '*'.repeat(numberStr.length);
        // Get the last 3 numbers
        // const lastThree = numberStr.slice(-3);
        // Concatenate the strings
        displayText = `${firstThree}${middleAsterisks}`;

    } else{
        const numberLength = numberStr.length;

// Calculate the number of digits to replace with asterisks
        const asterisksCount = Math.max(0, numberLength - 3);

        // Replace all digits except the last 3 with asterisks
        displayText = '*'.repeat(numberStr.length)

    }

    return (
        <View>
            <Text>{displayText}</Text>
        </View>
    );
};

export default DisplayNumbers;
