import { useNavigation } from '@react-navigation/native';
import { axiosRequest } from '../api_server/axios';
import { useLoginModel } from '../model/LoginModel'; // Import the model

export const useLoginController = () => {
  const navigation = useNavigation();
  const { inputs, setInputs, errors, setErrors, isValidEmail } = useLoginModel();

  const goToSignup = () => {
    navigation.navigate('Sign up');
  };

  const goToForgot = () => {
    navigation.navigate('Forgot password');
  };

  const handleSignIn = async() => {
    // Clear existing errors
    setErrors({});

    // Validate email
    if (!inputs.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
    } else if (!isValidEmail(inputs.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
    }

    // Validate password
    if (!inputs.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
    }

    // Navigate to Home if there are no errors
    if (isValidEmail(inputs.email) && inputs.password) {
      
      await axiosRequest.post("auth/login/",JSON.stringify(inputs),{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
        
        // must set a loading svreen here from View like Setloading = false 
        if(response.data.status == 200){
          // setContext({email:email})
          alert(`Hello ${response.data.user.email}`)
          navigation.navigate('Incomes');
        }
        
        else if(response.data.status == 401){
          alert(response.data.Warning)
          navigation.navigate('Pin')
        }else{
          alert(response.data.Warning)
        }
        
      }).catch((err)=>{
        console.log(JSON.stringify(inputs))
        console.log(err)
      })
    }
  };

  return { inputs, setInputs, errors, setErrors, goToSignup, goToForgot, handleSignIn };
};
