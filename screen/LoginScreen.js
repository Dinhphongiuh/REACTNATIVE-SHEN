import { StyleSheet, Dimensions,Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, TextInput, ImageBackground, FlatList} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';


export default function Login({navigation, route}) {
    const {userName} = route.params;
    const [passwordHide, setPasswordHide] = useState(false);
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState([]);

    const handleShowPassword = () => 
    {
        setPasswordHide(!passwordHide);
    };

    const fetchAccount = async() => {
      try
        {
            let response = await axios.get('https://655bc0f7ab37729791a98ca6.mockapi.io/account');
            let data  = response.data;
            setAccount(data);
        }
        catch (error)
        {
            console.log('error fetching data ListCategoryProduct: ', error);
        }
    };
    useEffect(() => {
        fetchAccount();
      }, []);
      
      fetchAccount();

    const handleSignIn = (userName, password) => {
        if (password.trim() == "")
        {
            Toast.show({
                type: 'error',
                text1: 'error',
                text2: 'Password is null',
            })
        }
        const accountExists = account.some(account => account.user === userName && account.password === password);

        if (accountExists) {
            // Tài khoản hợp lệ, thực hiện các bước tiếp theo
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Sign in successful',
            });
            // console.log(account);
            navigation.push('HomeScreen', {userName: userName});
        } 
        else {
            // Tài khoản không hợp lệ
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Invali password',
            });
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{width: 20, height: 40}}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                    style={{width: 20, height: 40}}
                    resizeMode='contain'
                    source={require('./Icon/arrowLeft.png')}
                    ></Image>
                </TouchableOpacity>
            </View>
            <View style={{width: '90%', height: '90%'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Sign in with your account</Text>
                <Text style={{color: '#959595', marginTop: 10}}>Email Address</Text>
                <View style={{width: '100%', backgroundColor: '#ccc', height: 35, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10}}>
                    <TextInput
                        style={{color: '#000000', width: '90%', placeholderTextColor: '#000000'}}                       
                        editable={false}
                    >{userName}</TextInput>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            style={{width: 20, height: 20}}
                            resizeMode='contain'
                            source={require('./Icon/EditIcon.png')}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <Text style={{color: '#959595', marginTop: 24}}>Password</Text>
                <View style={{width: '100%', backgroundColor: '#ccc', height: 35, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10}}>
                    <TextInput
                        style={{color: '#000000', width: '90%'}}
                        secureTextEntry={!passwordHide}
                        onChangeText={(text) => setPassword(text)}
                    ></TextInput>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => handleShowPassword()}
                    >
                        <Image
                            style={{width: 20, height: 20}}
                            resizeMode='contain'
                            source={passwordHide ? require('./Icon/eyeActive.png') : require('./Icon/eyeNoActive.png')}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%', alignItems: 'flex-end', marginTop: 10}}>
                    <TouchableOpacity>
                        <Text style={{color: '#959595'}}>Forgot your Password ?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{width: '100%', height: 45, backgroundColor: '#222222', justifyContent: 'center', alignItems: 'center', marginTop: 10}}
                    onPress={() => handleSignIn(userName, password)}
                >
                    <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header:{
        width: '95%',
    },
});