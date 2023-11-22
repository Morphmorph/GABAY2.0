// ModalMessage.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    setShowModal(visible);
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
};

const ModalMessage = ({ showAutomatically, message = "Please wait...", icon, navigateToScreen }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (showAutomatically) {
      setVisible(true);
    }
  }, [showAutomatically]);

  const handleOkayPress = () => {
    if (navigateToScreen) {
      navigation.navigate(navigateToScreen);
    }

    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <ModalPoup visible={visible}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.messageText}>{message}</Text>
        <TouchableOpacity onPress={handleOkayPress} style={styles.okayButton}>
          <Text style={styles.okayButtonText}>Okay</Text>
        </TouchableOpacity>
      </ModalPoup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#3A6B35',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  messageText: {
    marginVertical: 30,
    fontSize: 20,
    textAlign: 'center',
    color: '#CBD18F',
  },
  okayButton: {
    backgroundColor: '#A2A869',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 80
  },
  okayButtonText: {
    color: '#144714',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ModalMessage;
