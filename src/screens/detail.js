import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'

import {getOneContact, deleteContact} from '../stores/actions'

const Detail = (props) => {
    const {id} = props.route.params

    useEffect(() => {
        props.getOneContact(id)
    }, [])
    
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => props.navigation.navigate('Edit')}>
                <Text>edit</Text>
            </TouchableOpacity>
            <Text>Ini halaman detail</Text>
            <Text>{id}</Text>
            <Text>{JSON.stringify(props.detailContact)}</Text>
            <TouchableOpacity onPress={() => props.deleteContact(id)}>
                <Text>delete</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return state;
  };
const mapDispatchToProps = {
    getOneContact,
    deleteContact
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

const styles = StyleSheet.create({})
