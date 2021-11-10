import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CustomOrderItem from '../../components/CustomOrderItem'

const customOrderScreen = props => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.itemWindow}>
                <CustomOrderItem />
            </View>
            <View style={styles.editor}></View>
        </SafeAreaView>
    )
}

const {height} = Dimensions.get("screen")
const cardSize = height * 0.7

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemWindow: {
        height: '60%',
        width: '100%',
        //backgroundColor: 'red',
    },
    editor: {
        height: '40%',
        width: '100%',
        backgroundColor: 'green',
    },
})

export default customOrderScreen