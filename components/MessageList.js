import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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

    const handleVieweableItemsChanged = useCallback(({ viewedItems }) => {
        console.log(viewedItems)
       /* setData(oldData => {
            const newData = loadMore(oldData)
            // We can have access to the current state without adding it
            //  to the useCallback dependencies

            // If the items didn't change, we return the old items so
            //  an unnecessary re-render is avoided.
            return newData;
        });*/

        // Since it has no dependencies, this function is created only once
    }, []);
    /*const handleVieweableItemsChanged = (currentData) => {
        // console.log(lastViewableItem)
        // Use viewable items in state or as intended
        if (lastViewableItem.id == 8) {
            var newData = []
            var len = typeof (data) !== 'undefined' ? data.length : 0
            console.log(len)
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
            const updatedData = typeof (data) !== 'undefined' ? data.concat(newData) : newData
            setData(updatedData)
        }
    }*/
    const loadMore = () => {
        var newData = []
        var len = typeof (data) !== 'undefined' ? data.length : 0
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

        const updatedData = typeof (data) !== 'undefined' ? data.concat(newData) : newData
        setData(updatedData)

    }
    useEffect(() => {
        loadMore()
        // onViewRef.current()
    }, [])

    return (
        <View style={styles.container}>
            {/* <InfiniteScroll
                renderData={renderData}
                data={data}
                loadMore={loadMore}
                onReachEnd={false}
            /> */}
            <FlatList
                data={data}
                keyExtractor={(item, index) => String(index)}
                renderItem={renderData}
                inverted={true}
                onEndReached={loadMore}
                onEndReachedThreshold={50}
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
