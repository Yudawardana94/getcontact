import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View , TouchableOpacity, TextInput, Dimensions, Image, Button} from 'react-native'
import Modal from 'react-native-modal'

import {updateContact} from '../stores/actions'
const sh = Dimensions.get("screen").height
const wh = Dimensions.get("screen").width

const EditContact = (props) => {
    const [inputData, setInputData] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        photo: ''
    })
    const [id, setId] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        const {firstName, lastName, age, photo, id} = props.detailContact
        
        setInputData({firstName, lastName, age: age.toString(), photo: photo ? photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS1ASArT6_WHuAaqjPXW0_P_UU3QPITuvXoA&usqp=CAU"})
        setId(id)
    }, [])
    
    const actionAfterPressSave = (action) => {
        if(action === 'ok') {
            props.updateContact(id, inputData, props.navigation)
        } else {
            setIsModalVisible(false)
        }
    }
    return (
        <View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 10}}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Edit Contact</Text>
            </View>
            <Image
                style={styles.image}
                source={{uri: inputData.photo}}
                resizeMethod={"resize"}
                resizeMode={"cover"}
            />
            <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                <TextInput 
                value={inputData.firstName}
                placeholder={"First Name"}
                style={styles.input}
                onChangeText={(text) => setInputData({...inputData, firstName: text})}
                />
                <TextInput 
                value={inputData.lastName}
                placeholder={"First Name"}
                style={styles.input}
                onChangeText={(text) => setInputData({...inputData, lastName: text})}
                />
                <TextInput 
                value={inputData.age}
                placeholder={"Age"}
                style={styles.input}
                keyboardType={"number-pad"}
                onChangeText={(text) => setInputData({...inputData, age: text})}
                />
            </View>
            <View style={{flexDirection: "row", justifyContent: 'space-evenly'}}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Text>cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Text>save</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isModalVisible}>
                <View style={{flex: 1}}>
                    <Text>Hello!</Text>

                    <Button title="Abort" onPress={() => actionAfterPressSave('abort')} />
                    <Button title="Ok" onPress={() => actionAfterPressSave('ok')} />
                </View>
            </Modal>
        </View>
    )
}

const mapStateToProps = (state) => {
    return state;
  };
const mapDispatchToProps = {
    updateContact
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContact)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input:  {
        width: wh * 45 /100,
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        borderRadius: 3,
        borderColor: "#616161"
    },
    image: {
        width: 150,
        height: 150,
        margin: 20,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: "white",
        alignSelf: "center"
    },
    inputTag: {
        width: wh * 45 /100,
        margin: 10,
        marginTop: 0
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textTransform: 'capitalize',
        margin: 10,
        alignSelf: "flex-end"
    },
})
