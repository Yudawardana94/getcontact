import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'

import {addContact} from '../stores/actions'

const AddContact = () => {
    return (
        <View>
            <Text>addcontact</Text>
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

const styles = StyleSheet.create({})
