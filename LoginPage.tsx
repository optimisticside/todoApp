import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, {useRef, useState} from 'react';

// temp for now, move to env later
const local_host = "http://127.0.0.1:8000/"

export default function LoginPage({setIsLoggedIn}:{setIsLoggedIn(isLoggedIn: boolean):void}){
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (text: string) => {
        setUsername(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleNextField = (nextFieldRef: any) => {
        if (nextFieldRef) {
          nextFieldRef.current.focus();
        }
    };

    // if makeNewAccount is 0 -> create user
    // else login existing user

    const sendUserInfo = (makeNewAccount: number) =>{
        const req = new XMLHttpRequest();
        req.open('PUT', local_host + "edit_user" + makeNewAccount, true)
        req.setRequestHeader('Content-Type', 'application/json');
        const jsonData = {
            name: username,
            password: password
        }
        const body = JSON.stringify(jsonData)
        req.send(body)

        req.onload = () => {
            if(req.status === 200){
                const response = JSON.parse(req.responseText)
                console.log(response)
                console.log("logging user in ");
                //will allow user through page
                setIsLoggedIn(true);
            }
            
            else{
                console.error("Failed to log user in  ", req.status);
            }
        }
    }

    return(
        <View style={styles.LoginPage}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={handleUsernameChange}
                    onSubmitEditing={()=>handleNextField(passwordRef)}
                />
            </View>

            <View style={styles.inputContainer}>
           <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={handlePasswordChange}
                    onSubmitEditing={() => handleNextField(null)}
                />
            </View>
            
            <View style ={styles.inputContainer}>
                <Button title="Login" onPress={() => sendUserInfo(0)} />
            </View>

            <View style ={styles.inputContainer}>
                <Button title="Make New Account" onPress={() => sendUserInfo(1)} />
            </View>
        </View>
    )
}


    const styles = StyleSheet.create({
        LoginPage:{
            flexDirection: 'column',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            flex: 1, // Add this line to make the component take up the full height of its container
        },
        inputContainer: {
            marginBottom: 10,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            width: '80%',
            alignSelf: 'center',
            padding: 10,
            color: 'white',
        },
        buttonContainer: {
            marginBottom: 10,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            width: '80%',
            alignSelf: 'center',
            padding: 10,
        },
        buttonText: {
            textAlign: 'center',
            fontWeight: 'bold',
        },
    });