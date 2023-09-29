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
})

export default Style;