import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'

import {updateContact} from '../stores/actions'

const EditContact = (props) => {
    const [inputData, setInputData] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        photo: ''
    })

    useEffect(() => {
        const {firstName, lastName, age, photo} = props.detailContact
        setInputData({firstName, lastName, age, photo})
    }, [])
    return (
        <View>
            <Text>Edit contact</Text>
            <Text>{JSON.stringify(props.detailContact)}</Text>
            <Text>{JSON.stringify(inputData)}</Text>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.updateContact()}>
            <Text>save</Text>
            </TouchableOpacity>
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

const styles = StyleSheet.create({})
