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
        width: '100%',
        paddingHorizontal: 20
    },
    textcolor: {
        color: '#CBD18F',
        marginBottom: '5%',
    },
    footer: {
      backgroundColor: 'transparent', // Set your desired background color
      padding: 5,
      overflow:'hidden',      
      // position:'absolute',
      alignItems:'stretch',
      bottom: 0,
      left: 0,
      right: 0,
      
    },
    footerText: {
      color: '#144714',
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 12,
      marginBottom: 5,
    },
    footerLinks: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      top: -5,
    },
    footerLinkText: {
      color: '#E3B448', // Set the color you want for clickable links
      fontSize: 12,
     marginHorizontal: 5,
      textDecorationLine: 'none',
    },
    logo: {
        width: 'auto',
        height: 'auto',
        marginTop: '40%',
        resizeMode: 'contain',
    },
    glass: {
      margin: 5,
      backgroundColor: '#144714',
      padding: 7,
      borderRadius: 10,
      paddingBottom: 2,
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
        width: '80%',
        alignItems: 'center'
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
        backgroundColor: '#A2A869',
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