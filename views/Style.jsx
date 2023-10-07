import { Dimensions, StyleSheet } from "react-native";

export const Style = StyleSheet.create({

    common: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#3A6B35',
       
    },
    container: {
        alignItems: 'center',
        marginTop: '20%',
    },
    textcolor: {
        color: '#CBD18F',
        marginBottom: '5%',
    },
    
    logo: {
        width: 'auto',
        height: 'auto',
        marginTop: '40%',
        resizeMode: 'contain',
    },
  
    signInButton: {
        backgroundColor: '#144714',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    signInButtonText: {
        color: '#CBD18F',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
        color: '#E3B448',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#3A6B35',
        borderRadius: 10,
      },
      modalButton: {
        backgroundColor: '#144714',
        borderRadius: 5,
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
      },
      modalButtonText: {
        color: '#E3B448',
        fontSize: 18,
      },
      modalCancelButton: {
        backgroundColor: '#810000',
      },
      
})

export default Style;