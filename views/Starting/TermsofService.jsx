import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Style from '../Style';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';

const TermsofService = () => {
    return (
        <View style={[Style.common,]}>
            <ScrollView style={{ marginTop: 10 }}>
                <Text style={[styles.paragraph, {marginTop: -10}]}>
                    Welcome to <Text style={{color: '#E3B448'}}>GABAY</Text>, the savings forecasting system mobile application. By using
                    GABAY, you agree to comply with and be bound by the following terms and
                    conditions:
                </Text>

                <Text style={styles.subheading}>1. Use of GABAY</Text>
                <Text style={styles.paragraph}>
                <Text style={{color: '#E3B448'}}>GABAY</Text> is provided for informational purposes only. You agree not to use
                <Text style={{color: '#E3B448'}}> GABAY</Text> for any illegal or unauthorized purpose.
                </Text>

                <Text style={styles.subheading}>2. User Accounts</Text>
                <Text style={styles.paragraph}>
                    In order to access certain features of <Text style={{color: '#E3B448'}}>GABAY</Text>, you may be required to
                    create a user account. You are responsible for maintaining the
                    confidentiality of your account and password.
                </Text>

       
                <Text style={styles.subheading}>3. Content Ownership</Text>
                <Text style={styles.paragraph}>
                    The content you upload or contribute to GABAY remains your intellectual
                    property. However, by using <Text style={{color: '#E3B448'}}>GABAY</Text>, you grant us a non-exclusive,
                    royalty-free license to use, display, and distribute your content as
                    necessary for the operation and improvement of the application.
                </Text>

                <Text style={styles.subheading}>4. Termination of Account</Text>
                <Text style={styles.paragraph}>
                    We reserve the right to terminate or suspend your account at any time
                    if you violate the terms of service or engage in activities that
                    compromise the security or integrity of <Text style={{color: '#E3B448'}}>GABAY</Text>.
                </Text>

                <Text style={styles.subheading}>5. Changes to Terms</Text>
                <Text style={styles.paragraph}>
                    We may update these terms of service from time to time. You will be
                    notified of any significant changes, and continued use of <Text style={{color: '#E3B448'}}>GABAY</Text> after
                    such changes constitutes your acceptance of the updated terms.
                </Text>

                {/* Add more terms of service content as needed */}
        
                <View
          style={{
            backgroundColor: 'transparent', // Set your desired background color
            padding: 5,
            marginHorizontal: 5,
            marginTop: 20,
            bottom: 5,
            left: 0,
            right: 0,
           
          }}
        >
     
        </View>
                <View style={Style.footer}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Iconn name='email' style={{ fontSize: 15, color: '#144714' }} />
        <Text style={Style.footerText}> team.gabay404@gmail.com</Text>
        </View>
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
        color: '#E3B448'
    },
    paragraph: {
        marginTop: 5,
        fontSize: 16,
        padding: 10,
        color: '#CBD18f'
    },
});

export default TermsofService;
