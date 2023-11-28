import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import Loader from '../Starting/actionLoader';
import ModalMessage from '../Modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SupportInbox = ({}) => {
    const [loader,setLoader] = useState(false)
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [subject, setSubject] = useState('');
    const [subjectError, setSubjectError] = useState(null);
    const [messageError, setMessageError] = useState(null);
    const [message, setMessage] = useState('');
    const richText = useRef();

   

    const handleSend = () => {
        // Check if subject or message is empty
        if (!subject.trim() || !message.trim()) {
            // If empty, update styles to indicate an error
            setSubjectError(!subject.trim());
            setMessageError(!message.trim());
            return; // Do not proceed with sending the message
        }
    
        // Implement your logic to send the message
        console.log('Subject:', subject);
        console.log('Message:', message);
        // Access the content of the RichEditor using ref
        console.log('Editor Content:', richText.current.getContentHtml());
        setLoader(true);
        setTimeout(() => {
            setShowModalMessage(true);
        }, 5000);
    };
    
    return (
        <View style={styles.container}>
             <Loader visible={loader} message="Sending..." />
            <View style={{ flex: 1, backgroundColor: '#CBD18F', padding: 10, borderRadius: 5 }}>
    <Text style={styles.label}>Subject:</Text>
    <TextInput
        style={[styles.input, subjectError && styles.inputError]} // Apply error style if subjectError is true
        placeholder={subjectError ? 'Subject cannot be empty' : 'Enter a subject'}
        placeholderTextColor={subjectError ? '#A60A0FAA' : '#2C333184'}
        value={subject}
        onChangeText={(text) => {
            setSubject(text);
            setSubjectError(false); // Reset the error when the user starts typing
        }}
    />
    
    <Text style={styles.label}>Message:</Text>
    <ScrollView style={{ ...styles.editorContainer }}>
        <RichEditor
            placeholder={messageError ? 'Message cannot be empty' : 'Write a message...'}
            ref={richText}
            onChange={(text) => {
                setMessage(text);
                setMessageError(false); // Reset the error when the user starts typing
            }}
            editorStyle={{ backgroundColor: 'transparent', placeholderColor: messageError ? '#FF0F17AA' : '#2C333184', color: '#144714' }}
            overScrollMode='content'
            useContainer={false}
            containerStyle={{ minHeight: 440, borderWidth: 1, borderRadius: 5, borderColor: messageError ? 'red' : '#144714' }}
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
                <ModalMessage showAutomatically={showModalMessage} message="Support message send!" icon={<MaterialCommunityIcons name="comment-check" size={200} color="#E3B448" />}navigateToScreen="Settings"/>
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
        padding: 5,
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
    inputError: {
        borderColor: 'red',
    },
    editorContainer: {
        marginBottom: 15,
        
    },
    toolbar: {
        borderTopWidth: 1,
        borderTopColor: '#144714',
        backgroundColor: '#A2A869',
        height: 50,
    },
});

export default SupportInbox;
