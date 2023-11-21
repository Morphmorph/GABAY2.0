// PrivacyPolicy.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Style from '../Style';

const PrivacyPolicy = () => {
  return (
    <View style={[Style.common]}>
      <ScrollView style={{ paddingTop: 10 }}>
        <Text style={[styles.paragraph, { marginTop: -10 }]}>
          This Privacy Policy describes how{' '}
          <Text style={{ color: '#E3B448' }}>GABAY</Text> collects, uses, and
          protects your personal information when you use our mobile
          application.
        </Text>

        <Text style={styles.subheading}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We may collect personal information, including but not limited to,
          your name, email address, and usage data when you use{' '}
          <Text style={{ color: '#E3B448' }}>GABAY</Text>. Additionally, we may
          collect device information such as device type, operating system, and
          unique device identifiers.
        </Text>

        <Text style={styles.subheading}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect to provide and improve{' '}
          <Text style={{ color: '#E3B448' }}>GABAY</Text>, customize your
          experience, and send you updates and relevant information. The
          collected information may be used for purposes including, but not
          limited to:
        </Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>
            a. Personalizing your experience within the application.
          </Text>
          <Text style={styles.listItem}>
            b. Analyzing usage patterns to improve our services.
          </Text>
          <Text style={styles.listItem}>
            c. Sending you important updates and notifications.
          </Text>
          <Text style={styles.listItem}>
            d. Responding to user inquiries and support requests.
          </Text>
        </View>

        <Text style={styles.subheading}>3. Information Sharing and Disclosure</Text>
        <Text style={styles.paragraph}>
          We do not sell, trade, or otherwise transfer your personal
          information to third parties without your consent. However, we may
          share your information with trusted third-party service providers who
          assist us in operating our application and providing services to you.
        </Text>

        <Text style={styles.subheading}>4. Security Measures</Text>
        <Text style={styles.paragraph}>
          We take reasonable measures to protect the security of your personal and non-personal
          information. However, please be aware that no method of transmission
          over the internet or electronic storage is completely secure, and we
          cannot guarantee absolute security.
        </Text>

        <Text style={styles.subheading}>5. Your Choices</Text>
        <Text style={styles.paragraph}>
          You have the right to review, update, or delete the personal
          information we hold about you.
        </Text>

        <Text style={styles.subheading}>6. Changes to Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We reserve the right to update this Privacy Policy from time to time.
          Any changes will be posted on this page, and you will be notified of
          significant changes. Continued use of{' '}
          <Text style={{ color: '#E3B448' }}>GABAY</Text> after such changes
          constitutes your acceptance of the updated Privacy Policy.
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

export default PrivacyPolicy;
