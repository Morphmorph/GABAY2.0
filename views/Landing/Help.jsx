// TermsOfService.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Style from '../Style';

const Help = () => {
    return (
        <View style={[Style.common]}>
            <ScrollView style={{ paddingTop: 10 }}>
                <Text style={[styles.paragraph, { marginTop: -10 }]}>
                    Welcome to <Text style={{ color: '#E3B448' }}>GABAY</Text>, a savings forecasting system mobile application.
                </Text>

                <Text style={styles.subheading}>1. How to change your password</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>I.</Text> Click the 3 horizontal line located at the top of the home page or simply slide to right to trigger the drawer
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>II.</Text> Select the settings.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>III.</Text> Under the Account, click the change password.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>IV.</Text> Input your new password and confirm your new password.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>V.</Text> Verify through email address.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>VI.</Text> Check the OTP in your gmail send through your email address.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>VII.</Text> Return to the GABAY app and input the OTP and click submit.
                    </Text>
                </View>

                <Text style={styles.subheading}>2. How to add expenses history</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>I.</Text> Click the "plus icon" in the home page located at the bottom center of the screen.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>II.</Text> Select the "add expenses".
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>III.</Text> Enter your expenses value and choose category from the list below it.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>IV.</Text> Click the add button.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>V.</Text> Select if the expenses you enter is from previous or current month.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>VI.</Text> If you choose current month, then its fine.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>VII.</Text> If you choose previous month, then you will choose which month and then done.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>VIII.</Text> It will then automatically navigate to your home page with your inputted expenses records.
                    </Text>
                </View>
                <Text style={styles.subheading}>3. How to add more income</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>I.</Text> Click the "plus icon" in the home page located at the bottom center of the screen.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>II.</Text> Select the "add income".
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>III.</Text> Enter your income value and choose category from the list below it.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>IV.</Text> Click the add button.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>V.</Text> It will then automatically navigate to your home page with your inputted income records.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>VI.</Text> Click the sort button located above the chart to view your income records.
                    </Text>
                </View>
                <Text style={styles.subheading}>4. How to check the details of the expenses and income</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>I.</Text> Click the "View details" button below the each chart.
                    </Text>
                </View>
                <Text style={styles.subheading}>5. How to edit the records of the expenses and income</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>I.</Text> Click the "View details" button below the each chart.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>II.</Text> Click the "edit" text located at the upper right of the page.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>III.</Text> Click the "pen icon" of each record that will appear to right side.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>IV.</Text> Edit the title and value.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>V.</Text> Click the save button.
                    </Text>
                </View>
                <Text style={styles.subheading}>6. How to delete the records of the expenses and income</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>I.</Text> Click the "View details" button below the each chart.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>II.</Text> Click the "edit" text located at the upper right of the page.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>III.</Text> Click the "trash icon" of each record that will appear to right side.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>IV.</Text> Click yes.
                    </Text>
                </View>
                <Text style={styles.subheading}>7. How to predict future savings</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>I.</Text> Click the "target" button located at the right side of the plus icon.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>II.</Text> Enter what month or year would you like to predict your savings.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>III.</Text> Click the "forcast" button.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>IV.</Text> The forcasted savings then display in a form of a chart.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>V.</Text> Click "view details" button for much clearer details.
                    </Text>
                </View>
                <Text style={styles.subheading}>8. How to add new category</Text>
                <View style={styles.listContainer}>
                <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>I.</Text> Click the "plus icon" in the home page located at the bottom center of the screen.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>II.</Text> Select the "add income" or "add expenses".
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>III.</Text> Click the "plus icon" inside each category.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>IV.</Text> It will navigate you to add new category screen.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>V.</Text> Enter your category title and select your own icon.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>VI.</Text> Click "add" button.
                    </Text>
                </View>
                <Text style={styles.subheading}>9. How to logout your account</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>I.</Text> Click the 3 horizontal line located at the top of the home page or simply slide to right to trigger the drawer
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>II.</Text> Select the "logout" button located at the bottom.
                    </Text>
                    <Text style={styles.listItem}>
                        <Text style={{ color: '#E3B448' }}>III.</Text> Click yes.
                    </Text>
                    
                </View>


                <View style={{
                    backgroundColor: 'transparent', // Set your desired background color
                    padding: 5,
                    marginHorizontal: 5,
                    marginTop: 20,
                    bottom: 5,
                    left: 0,
                    right: 0,
                    borderTopWidth: 1,
                    borderColor: '#144714',
                }}>
                    <Text style={Style.footerText}>© 2023 GABAY. All Rights Reserved.</Text>
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

export default Help;
