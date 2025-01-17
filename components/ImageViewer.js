import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ imgSource, selectedImage}) {
    return (
        <Image source={selectedImage ? {uri : selectedImage } : imgSource} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});