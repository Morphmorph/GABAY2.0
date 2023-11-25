import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

const ReportInbox = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const richText = useRef();

    const handleSend = () => {
        // Implement your logic to send the message
        console.log('Subject:', subject);
        console.log('Message:', message);
        // Access the content of the RichEditor using ref
        console.log('Editor Content:', richText.current.getContentHtml());
    };

    return (
        <View style={styles.container}>
            <View style={{flex:1, backgroundColor: '#CBD18F', padding: 10, }}>
            <Text style={styles.label}>Subject:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter subject"
                value={subject}
                onChangeText={(text) => setSubject(text)}
            />

            <Text style={styles.label}>Message:</Text>
            <ScrollView style={styles.editorContainer}>
                <RichEditor
                    placeholder='Write a message...'
                    ref={richText}
                    onChange={(text) => setMessage(text)}
                    editorStyle={{ backgroundColor: 'transparent', placeholderColor: '#2C333184', color: '#144714' }}
                    style={{ borderWidth: 1, borderRadius: 5, borderColor: '#144714' }}
                    overScrollMode='content'
                />
            </ScrollView>
            <RichToolbar
                editor={richText}
                style={styles.toolbar}
                iconTint
                unselectedButtonStyle
                selectedIconTint
                selectedButtonStyle
            />

            <Button title="Send" onPress={handleSend} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#3A6B35',
        padding: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#144714'
    },
    input: {
        height: 40,
        color: '#144714',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        borderColor: '#144714',
    },
    editorContainer: {
        height: 200, // Set the fixed height for the RichEditor
        marginBottom: 15,
    },
    toolbar: {
        borderTopWidth: 1,
        borderTopColor: '#144714',
        backgroundColor: '#A2A869',
        height: 50,
    },
});

export default ReportInbox;
