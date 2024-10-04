import { useState } from 'react';
import { StyleSheet, FlatList, Platform, Pressable, Image } from 'react-native';

export default function EmojiList({ onSelect, onCloseModal }) {
    const [emoji] = useState([
        require('../assets/images/emoji1.png'),
        require('../assets/images/emoji2.png'),
        require('../assets/images/emoji3.png'),
        require('../assets/images/emoji4.png'),
        require('../assets/images/emoji5.png'),
        require('../assets/images/emoji6.png'),
    ]);

    return (
        <FlatList
            horizontal
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            renderItem={({ item, index }) => (
                <Pressable onPress={() => { onSelect(item); onCloseModal(); }}>
                    <Image source={item} key={index} style={styles.emoji} />
                </Pressable>
            )}
        />
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    emoji: {
        width: 100,
        height: 100,
        marginRight: 20,
    }
})
