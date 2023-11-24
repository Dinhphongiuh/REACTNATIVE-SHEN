import { StyleSheet, Dimensions,Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, TextInput, ImageBackground, FlatList} from 'react-native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import axios from 'axios';


export default function App({navigation, route}) {
    const {userName} = route.params;
    const [passwordHide, setPasswordHide] = useState(false);
    const [password, setPassword] = useState('');

    const [checkPrivacy, setCheckPrivacy] = useState(false);

    const handleCheckPrivacy = () => {
        setCheckPrivacy(!checkPrivacy);
    };

    const handleShowPassword = () => 
    {
        setPasswordHide(!passwordHide);
    };

    const handleRegister = (password) =>
    {
        let regexChar = /[a-zA-Z]/;
        let regexNum = /\d/;
        if (password.trim() == "")
        {
            Toast.show({
                type: 'error',
                text1: 'error',
                text2: 'Pass word is null',
            })
            return;
        }
        else if (password.length >= 8 && regexChar.test(password) && regexNum.test)
        {
            if (!checkPrivacy)
            {
                Toast.show({
                    type: 'error',
                    text1: 'error',
                    text2: 'Đọc kỹ điều khoãn và xác nhận đã đọc',
                })
                return ;
            }

            const newAccount = 
            {
                user: userName,
                password: password
            };
            const createAccount = async (newAccountData) => 
            {
                try
                {
                    const response = await axios.post('https://655bc0f7ab37729791a98ca6.mockapi.io/account', newAccount);
                    Toast.show({
                        type: 'success',
                        text1: 'success',
                        text2: 'create account success',
                    })
                    navigation.push('loginScreen', {userName: userName});
                    return response.data;
                }
                catch (error)
                {
                    console.error('Error creating account: ', error);
                    throw error;
                }
            }
            createAccount();
        }
    };


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
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Create Your SHEIN Account</Text>
                <Text style={{color: '#959595'}}>It's quick and easy.</Text>
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
                {password.trim() !== '' && (
                    <View>
                    <Text style={{ color: password.length >= 8 ? 'green' : 'red', fontSize: 12 }}>8 characters minimum</Text>
                    <Text style={{ color: /[a-zA-Z]/.test(password) ? 'green' : 'red', fontSize: 12 }}>At least one letter</Text>
                    <Text style={{ color: /\d/.test(password) ? 'green' : 'red', fontSize: 12 }}>At least one number</Text>
                    </View>
                )}
                <View style={{width: '90%', flexDirection: 'row', marginTop: 20}}>
                    <TouchableOpacity
                        style={checkPrivacy ? styles.checkedPrivacy : styles.unCheckedPrivacy}
                        onPress={() => handleCheckPrivacy()}
                    >
                        {checkPrivacy && (
                        <Image
                        style={{ width: 22, height: 22, tintColor: 'white' }}
                        resizeMode="contain"
                        source={require('./Icon/checkWhite.png')}
                        />
                        )}
                    </TouchableOpacity>
                    <Text style={{marginLeft: 30}}>
                        <Text style={{color: '#767676',}}>I agree to the</Text> 
                        <TouchableOpacity style={{}}><Text style={{color: '#2D68A8'}}>Privacy & Cookie Policy</Text></TouchableOpacity>
                        and
                        <TouchableOpacity style={{padding: 10}}><Text style={{color: '#2D68A8'}}><TouchableOpacity style={{}}><Text style={{color: '#2D68A8'}}>Privacy & Cookie Policy</Text></TouchableOpacity></Text></TouchableOpacity>
                    </Text>
                </View>
                <TouchableOpacity
                    style={{width: '100%', height: 45, backgroundColor: '#222222', justifyContent: 'center', alignItems: 'center', marginTop: 10}}
                    onPress={() => handleRegister(password)}
                >
                    <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>REGISTER</Text>
                </TouchableOpacity>
                <View style={{backgroundColor: '#FFF6F3', height: 110, marginTop: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{width: '33%',justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <Image
                                style={{width: 20, height: 20}}
                                resizeMode='contain'
                                source={require('./Icon/discountIcon.png')}
                            ></Image>
                            <Text style={{fontSize: 14, fontWeight: 'bold', padding: 10}}>get 20% off</Text>
                            <Text style={{color: '#5F5F5F'}}>First Order</Text>
                        </View>
                    </View>
                    <View style={{borderRightWidth: 2, height: '35%', borderColor: '#DFDFDF'}}></View>
                    <View style={{width: '33%',}}>
                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <Image
                                style={{width: 20, height: 20}}
                                resizeMode='contain'
                                source={require('./Icon/ShippingIcon.png')}
                            ></Image>
                            <Text style={{fontSize: 14, fontWeight: 'bold', paddingBottom: 10, paddingTop: 10}}>Free Shipping</Text>
                            <Text style={{color: '#5F5F5F'}}>First Order</Text>
                        </View>
                    </View>
                    <View style={{borderRightWidth: 2, height: '35%', borderColor: '#DFDFDF'}}></View>
                    <View style={{width: '33%',}}>
                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <Image
                                style={{width: 20, height: 20}}
                                resizeMode='contain'
                                source={require('./Icon/return.png')}
                            ></Image>
                            <Text style={{fontSize: 14, fontWeight: 'bold', paddingBottom: 10, paddingTop: 10}}>Free Returns</Text>
                            <Text style={{color: '#5F5F5F'}}>Within 35 Days</Text>
                        </View>
                    </View>
                </View>
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
    checkedPrivacy: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BBBBBB',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unCheckedPrivacy:{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#BBBBBB'
    }
});