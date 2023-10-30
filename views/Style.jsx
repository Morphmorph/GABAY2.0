import { Dimensions, StyleSheet } from "react-native";
const {width, height} = Dimensions.get('window');

export const Style = StyleSheet.create({

    common: {
        flex: 1,
        height: Dimensions.get('window'),
        width: Dimensions.get('window'),
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
    glass: {
      margin: 5,
      height: 155,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      padding: 7,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'transparent',  // Change the border color to match the CSS
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(6.7px)',
      WebkitBackdropFilter: 'blur(6.7px)',
      
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#3A6B35',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      modalButton: {
        backgroundColor: '#CBD18F',
        borderRadius: 5,
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
      },
      modalButtonText: {
        color: '#144714',
        fontSize: 18,
      },
      modalCancelButton: {
        backgroundColor: '#810000',
      },
      legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      legendLabel: {
        fontSize: 16,
        color: '#144714',
      },
      lottie:{
        width: width*0.9,
        height: width
      },
      
})

export default Style;