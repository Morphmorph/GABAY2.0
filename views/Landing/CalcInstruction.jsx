// PrivacyPolicy.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Style from '../Style';

const CalcInstruction = () => {
  return (
    <View style={[Style.common]}>
      <ScrollView style={{ paddingTop: 10 }}>
        <Text style={[styles.paragraph, { marginTop: -10 }]}>
        How To Use Our Savings Calculator? {'\n\n'}
        <Text style={{ color: '#E3B448' }}>For using our Savings Calculator</Text>, you need to put certain information in the mentioned required fields, such as the amount you want to contribute, the frequency rate you will adopt (e.g. monthly, quarterly, yearly), and the length of the total time you want to invest in the program.
            Our calculator will use your given information to estimate the overall returns on your total investment, based on the current interest rate. 
        </Text>
        

        <Text style={styles.subheading}>These are the fields you need to fill in our Savings Calculator: </Text>
        <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>Principle/Amount:</Text> A principle amount is an initial savings value you will have to make when you start and open savings account.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>Contribution:</Text> Along with the principle amount, you’ll need to decide your chosen amount of contribution to your savings plan. Input the contribution amount you have determined. 
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>Frequency:</Text> Decide how often you’d like to contribute (e.g. monthly or annually), and make sure the frequency is consistent in line with your contribution plan.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>Time Period:</Text> This is the length of the total time period you want to continue saving. Longer the period, higher the returns will be. 
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>Interest Rate:</Text> The interest rate determines at the end of the year. It is dynamic in nature and depends on the economical condition of a country.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>Click calculate to see the estimated amount of returns on your savings. </Text>
                    </Text>
                </View>

                <Text style={styles.paragraph}>
                    We would like to point out that the results of our Savings calculator are based on estimates, so you should take this into consideration before relying on them.
                </Text>
        <View
          style={{
            backgroundColor: 'transparent', // Set your desired background color
            padding: 5,
            marginHorizontal: 5,
            marginTop: 20,
            bottom: 5,
            left: 0,
            right: 0,
            borderTopWidth: 1,
            borderColor: '#144714',
          }}
        >
          <Text style={Style.footerText}>
            © 2023 GABAY. All Rights Reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#E3B448',
  },
  paragraph: {
    marginTop: 5,
    fontSize: 16,
    padding: 10,
    color: '#CBD18f',
  },
  listContainer: {
    marginTop: 10,
    alignSelf: 'center',
    width: '80%',
  },
  listItem: {
    fontSize: 16,
    color: '#CBD18f',
    marginBottom: 5,
  },
});

export default CalcInstruction;
