import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from '../Style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomInput from '../CustomInput';
import { axiosRequest } from '../../api_server/axios'
import Loader from '../Starting/actionLoader';
import ModalMessage from '../Modal';
import ModalMessageE from '../ModalE';
const InspectExpenses = ({ route, editMode, setEditMode,}) => {
  const navigation = useNavigation()
  const { expense, date } = route.params;
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [id,setId] = useState()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalEMessage, setShowModalEMessage] = useState(false);
  const [action, setAction] = useState(false)

  const toggleDeleteModal = (data) => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
    setId(data.id)
  };
  const toggleEditModal = (data) => {
    setSelectedExpense(data);
    setTitle(data.key);
    setAmount(data.value.toString());
    setId(data.id)
    setEditModalVisible(!isEditModalVisible);
  };



  const handleEdit = async() => {
    // Implement your edit logic here
    // You can use the selectedExpense state to get the details of the expense being edited
    // Close the modal after editing
    setAction(true);
    await axiosRequest.put(`gabay/transaction/edit/${id}/`,{
      "description": title,
      "amount": parseInt(amount)
  }).then((response)=>{
    console.log('success')
    setAction(false);
    setShowModalMessage(true);
    setTimeout(() => setShowModalMessage(false), 500);
  }).catch(e=>{
    console.log('failed')
  })

    setEditModalVisible(false);
    setEditMode(false);
    
  };

  const handleDelete = async() => {
    // Implement your delete logic here
    // You can use the selectedExpense state to get the details of the expense being deleted
    // Close the modal after deleting
    setAction(true);
    await axiosRequest.delete(`gabay/transaction/edit/${id}/`).then((response)=>{
    console.log('success')
    setAction(false);
    setShowModalEMessage(true)
    setTimeout(() => setShowModalEMessage(false), 500);
  }).catch(e=>{
    console.log('failed')
  })
    setEditModalVisible(false); 
    setEditMode(false);
    setIsDeleteModalVisible(false)
  };
  const wants = [
    require('../../assets/Icon/wants/w1.png'),
    require('../../assets/Icon/wants/w2.png'),
    require('../../assets/Icon/wants/w3.png'),
    require('../../assets/Icon/wants/w4.png'),
    require('../../assets/Icon/wants/w5.png'),
    require('../../assets/Icon/wants/w6.png'),
    require('../../assets/Icon/wants/w7.png'),
    require('../../assets/Icon/wants/w8.png'),
    require('../../assets/Icon/wants/w9.png'),
  ];
  const necessities = [
    require('../../assets/Icon/necessities/n9.png'),
    require('../../assets/Icon/necessities/n2.png'),
    require('../../assets/Icon/necessities/n3.png'),
    require('../../assets/Icon/necessities/n4.png'),
    require('../../assets/Icon/necessities/n5.png'),
    require('../../assets/Icon/necessities/n6.png'),
    require('../../assets/Icon/necessities/n7.png'),
    require('../../assets/Icon/necessities/n1.png'),
    require('../../assets/Icon/necessities/n8.png'),
  ];

  const savings = [
    require('../../assets/Icon/savings/s1.png'),
    require('../../assets/Icon/savings/s2.png'),
    require('../../assets/Icon/savings/s3.png'),
    require('../../assets/Icon/savings/s4.png'),
    require('../../assets/Icon/savings/s5.png'),
    require('../../assets/Icon/Icons/c11.png'),
  ];
  // console.log(icon1)
  
  return (
    <View style={Style.common}>
       
      <ScrollView contentContainerStyle={{ paddingBottom: 10, height: 'auto', }}>

        <View style={{ top: 10, borderBottomWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center', }}>
          <Text style={{ color: '#E3B448', fontSize: 17, top: -5, alignSelf: 'center' }}>[ {date} Records ]</Text>
        </View>
        <View style={{ margin: 10, padding: 10, backgroundColor: '#CBD18F', borderRadius: 5 }}>
          {expense.map((data, index) => (<View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
          {editMode && (
              <View style={{ flexDirection: 'row', position: 'absolute', zIndex: 9999, top: 10, right: 10, }}>
                <TouchableOpacity onPress={() => toggleEditModal(data)}>
                  <Iconn name="pencil" size={20} color="#CBD18F" style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleDeleteModal(data)}>
                  <Iconn name="delete" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
            <View style={{ backgroundColor: '#144714', borderRadius: 5, flexDirection: 'row', flex: 1, }}>
              <Image source={parseInt(data.icon, 10)} style={{ width: 80, height: 80, margin: 10, backgroundColor: 'transparent', borderRadius: 10 }} />
              <View style={{ flexDirection: 'column', alignSelf: 'center', marginRight: 10, borderLeftWidth: 2, borderColor: '#E3B448', backgroundColor: '#144714', borderBottomRightRadius: 5, borderTopRightRadius: 5, flex: 1 }}>
                <View style={{ paddingVertical: 10 ,flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{ color: '#CBD18F', marginLeft: 5, fontWeight: 'bold', width: 'auto' }}> {data.key} </Text>
                  <Text style={{ color: '#E3B448', marginLeft: 5, fontWeight: 'bold', width: 'auto' }}> {data.category == 1 ? "Necessities": data.category == 2 ? "Wants" : data.category == 3 && "Savings" } </Text>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: '#E3B448', paddingVertical: 10 }}>
                  <Text style={{ color: '#E3B448', marginLeft: 5, fontWeight: 'bold', width: 'auto' }}> <Iconn name="currency-php" style={{ fontSize: 15 }} /> {data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                </View>
              </View>
            </View>
          </View>))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!isEditModalVisible);
        }}
      >
        <View style={Style.modalContainer}>
        <Loader visible={action} message="Updating..." />
          <View style={Style.modalContent}>
          <Text style={{ fontSize: 20, marginBottom: 20, color: '#E3B448', }}>Update record:</Text>
            <CustomInput
              iconName="application-outline"
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <CustomInput
              iconName="currency-php"
              placeholder="00.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.yesButton} onPress={handleEdit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonText2}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => {
          setIsDeleteModalVisible(!isDeleteModalVisible);
        }}
      >
        <View style={styles.centeredView}>
        <Loader visible={action} message="Removing..." />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.yesButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton} onPress={toggleDeleteModal}>
                <Text style={styles.buttonText2}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ModalMessageE showAutomatically={showModalEMessage} message="Deleted succesfully!" icon={<MaterialCommunityIcons name="delete-circle-outline" size={200} color="#E3B448" />} navigateToScreen="Home"/>
      <ModalMessage showAutomatically={showModalMessage} message="Updated succesfully!" icon={<MaterialCommunityIcons name="note-check-outline" size={200} color="#E3B448" />} navigateToScreen="Home" />
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#3A6B35',
    borderRadius: 10,
    width: '90%',
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#E3B448'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  yesButton: {
    flex: 1,
    backgroundColor: '#A2A869',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  noButton: {
    flex: 1,
    backgroundColor: '#810000',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#144714',
    fontSize: 16,
  },
  buttonText2: {
    color: '#CBD18F',
    fontSize: 16,
  },
});

export default InspectExpenses;