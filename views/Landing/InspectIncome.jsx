import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from '../Style';
import icon1 from '../../assets/Icon/income/i1.png';
import CustomInput from '../CustomInput';
import { axiosRequest } from '../../api_server/axios';

const InspectExpenses = ({ route, editMode, setEditMode,navigation }) => {
  const { income } = route.params;
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [id,setId] = useState()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const toggleDeleteModal = (data) => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
    setId(data.id)
  };

  const toggleEditModal = (data) => {
    setSelectedExpense(data);
    setTitle(data.key);
    setAmount(data.value.toString());
    setEditModalVisible(!isEditModalVisible);
    setId(data.id)
    console.log(data)
  };

  const handleEdit = async() => {
    // Implement your edit logic here
    // You can use the selectedExpense state to get the details of the expense being edited
    // Close the modal after editing
    await axiosRequest.put(`gabay/add/edit/${id}/`,{
      "title": title,
      "amount": parseInt(amount)
  }).then((response)=>{
    console.log('success')
    navigation.navigate('Home')
  }).catch(e=>{
    console.log('failed')
  })

    setEditModalVisible(false);
    setEditMode(false);
    
    setEditModalVisible(false);
    setEditMode(false);
  };

  const handleDelete = async() => {
    // Implement your delete logic here
    // You can use the selectedExpense state to get the details of the expense being deleted
    // Close the modal after deleting
    await axiosRequest.delete(`gabay/add/edit/${id}/`).then((response)=>{
    console.log('success')
    navigation.navigate('Home')
  }).catch(e=>{
    console.log('failed')
  })
    setEditModalVisible(false);
    setEditMode(false);
    setIsDeleteModalVisible(false)
  };

  console.log(income)
  return (
    <View style={Style.common}>
      <ScrollView contentContainerStyle={{ paddingBottom: 10, height: 'auto', }}>
        <View style={{ top: 10, borderBottomWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center', }}>
          <Text style={{ color: '#E3B448', fontSize: 17, top: -5, alignSelf: 'center' }}>[ Income ]</Text>
        </View>
        <View style={{ margin: 10, padding: 10, backgroundColor: '#CBD18F', borderRadius: 5 }}>
          {income.map((data, index) => (<View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
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
                <View style={{ paddingVertical: 10 }}>
                  <Text style={{ color: '#CBD18F', marginLeft: 5, fontWeight: 'bold', width: 'auto' }}> {data.key} </Text>
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
        onRequestClose={toggleDeleteModal}
      >
        <View style={styles.centeredView}>
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