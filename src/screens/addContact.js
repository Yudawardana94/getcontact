import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Button , Image} from 'react-native'
import Modal from 'react-native-modal'

import {addContact} from '../stores/actions'

const sh = Dimensions.get("screen").height
const wh = Dimensions.get("screen").width

const AddContact = (props) => {
    const defaultPic = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS1ASArT6_WHuAaqjPXW0_P_UU3QPITuvXoA&usqp=CAU"
    const [inputData, setInputData] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        photo: defaultPic
    })
    const [isModalVisible, setIsModalVisible] = useState(false)

    const actionAfterPressSave = (action) => {
        if(action === 'ok') {
            props.addContact(inputData, props.navigation)
        } else {
            setIsModalVisible(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 10, marginLeft: 10}}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Add Contact</Text>
            </View>
            <Image
                style={styles.image}
                source={{uri: inputData.photo}}
                resizeMethod={"resize"}
                resizeMode={"cover"}
            />
            <View style={{flexDirection: "row", flexWrap: "wrap",alignItems: "center", marginBottom: 20}}>
                <View style={styles.inputTag}>
                    <Text>First Name</Text>
                    <TextInput 
                    value={inputData.firstName}
                    placeholder={"First Name"}
                    style={styles.input}
                    onChangeText={(text) => setInputData({...inputData, firstName: text})}
                    />
                </View>
                <View style={styles.inputTag}>
                    <Text>Last Name</Text>
                    <TextInput 
                    value={inputData.lastName}
                    placeholder={"First Name"}
                    style={styles.input}
                    onChangeText={(text) => setInputData({...inputData, lastName: text})}
                    />
                </View>
                <View style={styles.inputTag}>
                    <Text>Age</Text>
                    <TextInput 
                    value={inputData.age}
                    placeholder={"Age"}
                    style={styles.input}
                    keyboardType={"number-pad"}
                    onChangeText={(text) => setInputData({...inputData, age: text})}
                    />
                </View>
            </View>
            <View style={{flexDirection: "row", justifyContent: 'space-evenly'}}>
                <TouchableOpacity 
                style={styles.cancel}
                onPress={() => props.navigation.goBack()}>
                <Text style={{color: "crimson", fontSize: 16}}>cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.save}
                onPress={() => setIsModalVisible(true)}>
                <Text style={{color: "white", fontSize: 16}}>save</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modal}>
                    <Text style={{alignSelf: "center", marginTop: 20}}>Are you sure ?</Text>
                    <View style={{flexDirection: "row", justifyContent: 'space-evenly'}}>
                        <TouchableOpacity 
                        style={styles.cancel}
                        onPress={() => actionAfterPressSave('abort')}>
                        <Text style={{color: "black", fontSize: 16}}>cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.save}
                        onPress={() => actionAfterPressSave('ok')}>
                        <Text style={{color: "white", fontSize: 16}}>save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const mapStateToProps = (state) => {
    return state;
  };
const mapDispatchToProps = {
    addContact
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1f1"
    },
    input:  {
        width: '100%',
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
        marginVertical: 5,
        borderColor: "#616161",
        borderWidth: 2
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textTransform: 'capitalize',
        margin: 10,
        alignSelf: "flex-end"
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "white",
        alignSelf: "center"
    },
    inputTag: {
        width: wh * 45 /100,
        margin: 10,
        marginTop: 0
    },
    cancel: {
        width: '30%',
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 20,
    },
    save: {
        backgroundColor: "seagreen",
        width: '30%',
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 20,
        borderRadius: 5
    },
    modal: {
        width: '95%',
        backgroundColor: "white",
        borderRadius: 5,
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 25,
        minHeight: '20%'
    }
})
