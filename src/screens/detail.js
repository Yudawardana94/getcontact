import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, SafeAreaView, TouchableOpacity , Image, View} from 'react-native'
import Modal from 'react-native-modal'

import {getOneContact, deleteContact} from '../stores/actions'

const Detail = (props) => {
    const {id} = props.route.params
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        props.getOneContact(id)
    }, [])
    
    const actionAfterPressSave = (action) => {
        if(action == 'ok') {
            props.deleteContact(id)
        } else {
            setIsModalVisible(false)
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", margin: 10}}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('Edit')}>
                    <Text>edit</Text>
                </TouchableOpacity>
            </View>

            <Image
                style={styles.image}
                source={{uri: props?.detailContact?.photo}}
                resizeMethod={"resize"}
                resizeMode={"cover"}
            />

            {/* <Text>{id}</Text>
            <Text>{JSON.stringify(props.detailContact)}</Text> */}
            <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontWeight: "bold", fontSize: 20, marginHorizontal: 5}}>{props.detailContact?.firstName ? props.detailContact.firstName : "-"}</Text>
                <Text style={{fontWeight: "bold", fontSize: 20, marginHorizontal: 5}}>{props.detailContact?.lastName ? props.detailContact.lastName : "-"}</Text>
            </View>
            <Text style={{fontSize: 18, alignSelf: "center"}}>{props.detailContact?.age ? props.detailContact.age : "-"} y.o</Text>
            <TouchableOpacity 
            style={styles.delete}
            onPress={() => setIsModalVisible(true)}>
                <Text style={{fontWeight: "bold", fontSize: 18, textTransform: "capitalize", color: 'crimson'}}>delete</Text>
            </TouchableOpacity>
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
                        <Text style={{color: "white", fontSize: 16}}>delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        margin: 20,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: "white",
        alignSelf: "center"
    },
    delete: {
        borderWidth: 2,
        borderColor: "crimson",
        position: "absolute",
        bottom: 20,
        width: "95%",
        padding: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    cancel: {
        width: '30%',
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 20,
    },
    save: {
        backgroundColor: "crimson",
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
