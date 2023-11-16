import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Image, Text, Animated, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ModalPoup = ({ visible, children, }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const ModalMessage = ({ showAutomatically, message="Please wait..." }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showAutomatically) {
      setVisible(true);
    }
  }, [showAutomatically]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: 'center' }}>
        <MaterialCommunityIcons name="check-decagram-outline" size={200} color={'#CBD18F'} />
        </View>
        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center', color: '#E3B448' }}>
          {message}
        </Text>
      </ModalPoup>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#3A6B35',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default ModalMessage;
