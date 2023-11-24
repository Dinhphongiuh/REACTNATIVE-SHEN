import { useEffect, useState } from 'react';
import { StyleSheet, Dimensions,Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, TextInput, ImageBackground, FlatList} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';


export default function App({navigation, route}) {
    const [account, setAccount] = useState([]);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        let fetchAccount = async() => {
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
        fetchAccount();
      }, []);

    const onHandleContinue = (user) =>
    {
        let gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        let numericRegex = /^0[0-9]{9}$|^[1-9][0-9]{9}$/;
        if (user.trim() == "")
        {
            Toast.show({
                type: 'error',
                text1: 'error',
                text2: 'Email is null',
            })
        }
        else if (!gmailRegex.test(user) && !numericRegex.test(user))
        {
            Toast.show({
                type: 'error',
                text1: 'error',
                text2: 'Invalid user',
            })
        }
        else
        {
            const userExists = account.some(accountItem => accountItem.user === user);

            if (userExists) {
                navigation.push("loginScreen", {userName: user});
            } else {
                navigation.push("SigupScreen", {userName: user});
            }
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
            <View style={{width: '90%', justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{}}
                    resizeMode='contain'
                    source={require('./Icon/logo.png')}
                ></Image>
            </View>
            <View style={{width: '90%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '90%', marginBottom: 5}}><Text style={{color: '#959595',}}>Mobile number or email address</Text></View>
                <View style={{width: '90%', height: 40, borderWidth: 1, borderColor: '#BBBBBB', alignItems: 'center', justifyContent: 'center', padding: 5}}>
                    <TextInput 
                        style={{width: '100%', fontSize: 20, color: 'black'}}
                        onChangeText={(text) => setUser(text.toLowerCase())}
                    ></TextInput>
                </View>
                <TouchableOpacity
                    style={{width: '90%', height: 40, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', marginTop: 15}}
                    onPress={() => onHandleContinue(user)}
                >
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '90%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{borderWidth: 1, width: '20%', borderColor: '#E5E5E5', height: 1}}></View>
                    <Text style={{color: '#959595', paddingRight: 20, paddingLeft: 20}}>Or Join With</Text>
                    <View style={{borderWidth: 1, width: '20%', borderColor: '#E5E5E5', height: 1}}></View>
                </View>
                <TouchableOpacity style={{width: '90%', height: 50, borderWidth: 1, borderColor: '#BBBBBB', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20}}>
                    <View style={{width: 35, height: 35, borderWidth: 1, borderRadius: 40, justifyContent: 'center', alignItems: 'center', borderColor: '#CCCCCC', marginRight: 30}}>
                        <Image
                            style={{height: 25, width: 25}}
                            resizeMode='contain'
                            source={require('./Icon/googleIcon.png')}
                        ></Image>
                    </View>
                    <Text>Continue with  Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '90%', height: 50, borderWidth: 1, borderColor: '#BBBBBB', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20,}}>
                    <Image
                        style={{height: 35, width: 35, marginRight: 25  }}
                        resizeMode='contain'
                        source={require('./Icon/facebookIcon.webp')}
                    ></Image>
                    <Text>Continue with  Facebook</Text>
                </TouchableOpacity>
                <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <TouchableOpacity style={{width: 160, height: 35, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#F6F6F6', borderRadius: 20}}>
                        <Image 
                            style={{width: 20, height: 20}}
                            resizeMode='contain'
                            source={require('./Icon/LocationIcon.png')}
                        ></Image>
                        <Text>United Stated</Text>
                        <Image
                            style={{width: 20, height: 20}}
                            resizeMode='contain'
                            source={require('./Icon/arrowDownIcon.png')}
                        ></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', marginBottom: '30%'}}>
                <Text style={{textAlign: 'center'}}>By continuing, you agree to our  
                    <TouchableOpacity>
                        <Text style={{color: '#2D68A8'}}>Privacy  & Cookie Policy</Text>
                    </TouchableOpacity>
                    and
                    <TouchableOpacity>
                        <Text style={{color: '#2D68A8'}}>Teams & Conditions.</Text>
                    </TouchableOpacity>
                </Text>
            <Toast ref={(ref) => Toast.setRef(ref)}/>
            </View>
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
    }
});