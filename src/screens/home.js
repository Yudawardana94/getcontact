import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'

import {getAllContact} from '../stores/actions'

const Home = (props) => {
    const [search, setSearch] = useState('')
    
    useEffect(() => {
        props.getAllContact()
    }, [])

    function searchData() {
        console.log('panggil deh ini')
    }

    return (
        <View style={styles.container}>
            <View style={styles.topComponent}>
                <Text>{props.title}</Text>
                <TextInput 
                style={styles.input}
                onEndEditing={searchData}
                placeholder={"search contact"}
                placeholderTextColor={"#f1f1f1"}
                />
            </View>
            <View style={{width: '90%'}}>
                <FlatList 
                    data={props.allContact}
                    renderItem={({item}) => {
                        return <TouchableOpacity 
                        onPress={() => props.navigation.navigate('Detail', {id: item.id})}
                        style={styles.card}>
                            <Text>{item.id}</Text>
                            <Text>{item.firstName} {item.lastName}</Text>
                            <Text>{item.age}</Text>
                        </TouchableOpacity>
                    }}
                    keyExtractor={(el, idx) => idx + "home" + el}
                    ListEmptyComponent={() => <Text>No Data</Text>}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return state;
  };
const mapDispatchToProps = {
    getAllContact
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    topComponent: {
        width: '90%',
    },
    input: {
        width: '100%',
        borderRadius: 5,
        padding: 15,
        color: "#f1f1f1",
        marginVertical: 5,
        height: 50,
        backgroundColor: '#616161',
        alignSelf: "center"
    },
    card: {
        width: "100%",
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'salmon',
    }
})
