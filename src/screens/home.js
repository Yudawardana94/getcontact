import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'

import {getAllContact, searchContact} from '../stores/actions'

const Home = (props) => {
    const [search, setSearch] = useState('')
    const [searchValue, setSearchValue] = useState(null)
    const defaultPic = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS1ASArT6_WHuAaqjPXW0_P_UU3QPITuvXoA&usqp=CAU"
    
    useEffect(() => {
        props.getAllContact()
    }, [])

    function searchData() {
        search == '' ? props.getAllContact() : props.searchContact(search)
    }

    return (
        <View style={styles.container}>
            <View style={styles.topComponent}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: 10, marginVertical: 10}}>
                    <Text style={styles.title}>{props.title}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Add')}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
                <TextInput 
                style={styles.input}
                onEndEditing={searchData}
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder={"search contact"}
                placeholderTextColor={"#f1f1f1"}
                />
            </View>
            <View style={{width: '100%',flex: 1, paddingVertical: 10}}>
                {
                    !props.searchValue && <FlatList 
                    data={props.allContact}
                    renderItem={({item}) => {
                        return <> 
                            <Text style={styles.cardTag}>{item[0]}</Text>
                            <FlatList
                                data={item[1]} 
                                renderItem={(item2) => {
                                    return <TouchableOpacity 
                                    onPress={() => props.navigation.navigate('Detail', {id: item2.item.id})}
                                    style={styles.card}>
                                        <Image
                                            style={styles.image}
                                            source={{uri: item2.item.photo.toLowerCase() !== 'n/a' ? item2.item.photo : defaultPic}}
                                            resizeMethod={"resize"}
                                            resizeMode={"cover"}
                                        />
                                        <View>
                                            <Text>{item2.item.firstName} {item2.item.lastName}</Text>
                                            <Text>Age: {item2.item.age} y.o</Text>
                                        </View>
                                    </TouchableOpacity>
                                }}
                            />
                        </>
                    }}
                    keyExtractor={(el, idx) => idx + "home" + el}
                    ListEmptyComponent={() => <Text>No Data</Text>}
                />
                }
                {
                    props.searchValue && <View>
                        <Text>Search Result</Text>
                        <FlatList 
                        data={props.searchValue}
                        renderItem={({item}) => {
                            return <TouchableOpacity 
                                onPress={() => props.navigation.navigate('Detail', {id: item.id})}
                                style={styles.card}>
                                    <Image
                                        style={styles.image}
                                        source={{uri: item.photo.toLowerCase() !== 'n/a' ? item.photo : defaultPic}}
                                        resizeMethod={"resize"}
                                        resizeMode={"cover"}
                                    />
                                    <View>
                                        <Text>{item.firstName} {item.lastName}</Text>
                                        <Text>Age: {item.age} y.o</Text>
                                    </View>
                                </TouchableOpacity>
                        }}

                        />
                    </View>
                }
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return state;
  };
const mapDispatchToProps = {
    getAllContact,
    searchContact
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
        marginBottom: 2,
        backgroundColor: "#616161",
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        width: 50,
        height: 50,
        margin: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "white",
        marginRight: 25
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textTransform: 'capitalize'
    },
    cardTag: {
        paddingHorizontal: 20,
        fontWeight: "bold",
        fontSize: 20,
        width:"100%",
        // backgroundColor: "white"
    }
})
