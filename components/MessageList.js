import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Message from './Message.js'
import InfiniteScroll from 'react-native-infinite-scrolling'
 
var isSenderLast = null

export default function MessageList(props) {
    const [data, setData] = useState(props.messages)

    const renderData = ({ item }) => {

        return (
            <View style={styles.scrollView}>
                <Message message={item}></Message>
            </View>
        )
    }
    

    const loadMore = () => {
        var newData = []
        var len = typeof(data) !== 'undefined' ? data.length : 0
        for (let index = len; index < (len + 10); index++) {
            var isSender = Math.random() > 0.5
            var message = {
                id: index,
                text: "Message longlonglonglonglonglonglonglonglonglonglonglonglong" + index,
                isSender: isSender,
                isSequential: isSenderLast === isSender
            }
            newData.push(message)
            isSenderLast = message.isSender
        }
        let updatedData = typeof(data) !== 'undefined' ? data.concat(newData) : newData
        setData(updatedData)
    }
    useEffect(() => {
        loadMore()
    }, [])

    return (
        <View style={styles.container}>
            <InfiniteScroll
                renderData={renderData}
                data={data}
                loadMore={loadMore}
                onReachEnd={false}
            />
        </View>
    );


}
const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    scrollView: {
        backgroundColor: '#4b5d67',
        marginHorizontal: 5,
    },
});