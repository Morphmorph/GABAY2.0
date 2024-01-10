// PrivacyPolicy.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Style from '../Style';

const About = () => {
  return (
    <View style={[Style.common]}>
      <ScrollView style={{ paddingTop: 10 }}>
        <Text style={[styles.paragraph, { marginTop: -10 }]}>
         We help young professionals to be aware of their future savings anytime.{'\n\n'}
        <Text style={{ color: '#E3B448' }}>GABAY</Text>, is committed to providing an accessible experience for all users. 
          We are constantly evaluating our accessibility offerings, educating our team about the importance 
          of accessibility, and improving the accessibility of our experiences. <Text style={{ color: '#E3B448' }}>GABAY</Text> is dedicated to assisting 
          young professionals, and accessibility is a critical component of our mission.
        </Text>
        

        <Text style={styles.subheading}>Privacy Center</Text>
        <Text style={styles.paragraph}>
        <Text style={{ color: '#E3B448' }}>GABAY</Text> values the trust 
          that our users and customers place in us by granting us access to their Personal Data. This Privacy Statement 
          explains how we work to keep that trust and protect that information. {'\n\n'}
          Our Privacy Policy covers how we collect, use, and disclose the Personal and 
          Non-Personal Data we collect from and about you when you access or use our online 
          and/or mobile websites, applications, services, and software, interactions with us 
          over the phone or in person, or that we obtain from publicly available sources or third-party 
          sources, as permitted by applicable law and in accordance with this Privacy Policy.
        </Text>

        <Text style={styles.subheading}>Prioritizing your trust</Text>
        <Text style={styles.paragraph}>
        We value the trust you place in us, whether we're assisting you in predicting future savings. 
       To keep your trust, we make significant investments in data security. Our privacy values guide these efforts: {'\n\n'}

       We treat all users fairly by providing a complete set of global privacy rights. Any user can make the following request:{'\n\n\t'}

       <Text style={{ color: '#E3B448' }}>1.</Text> Access to their personal data{'\n\t'}
       <Text style={{ color: '#E3B448' }}>2.</Text> Deletion of their personal data{'\n\t'}
       <Text style={{ color: '#E3B448' }}>3.</Text> A portable version of their personal data{'\n\t'}
       <Text style={{ color: '#E3B448' }}>4.</Text> Restriction of or objection to certain processing of their personal data{'\n\t'}
       <Text style={{ color: '#E3B448' }}>5.</Text> We adhere to a policy of privacy by design, which informs how we build and operate our services.{'\n\t'}
       <Text style={{ color: '#E3B448' }}>6.</Text> We’re transparent about what personal data we collect and how it’s processed.{'\n\t'}
       <Text style={{ color: '#E3B448' }}>7.</Text> We ensure the personal data we gather will primarily be used for the purposes of predicting future savings and improving the services we provide to you. {'\n\t'}
       <Text style={{ color: '#E3B448' }}>8.</Text> We limit our collection and storage of personal data to what’s adequate, relevant and necessary.{'\n\t'}
       <Text style={{ color: '#E3B448' }}>9.</Text> We keep your personal data accurate and up to date, where appropriate.{'\n\t'}
       <Text style={{ color: '#E3B448' }}>10.</Text> We process your personal data using appropriate security and confidentiality.{'\n\t'}
       {/* <Text style={{ color: '#E3B448' }}>11.</Text> We demonstrate accountability and responsibility under applicable privacy laws.{'\n\t'} */}


        </Text>

        {/* Add more privacy policy content as needed */}
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

export default About;
