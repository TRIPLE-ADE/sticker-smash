import "expo-dev-client";
import { View, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

const PlaceholderImage = require("../../assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [stickers, setStickers] = useState<string[]>([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setIsModalVisible(false);
    setSelectedImage(undefined);
    setStickers([]);
  };

  const onModalClose = () => {;
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onAddSticker = (sticker: string) => {
    setStickers((prev) => [...prev, sticker]);
    setIsModalVisible(false);
  };

  const openStickerModal = () => {
    setIsModalVisible(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer} ref={imageRef} collapsable={false}>
          <View>
            <ImageViewer
              imgSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {stickers.map((sticker, index) => (
              <EmojiSticker
                key={index}
                stickerSource={sticker}
                size={40}
              />
            ))}
          </View>
        </View>
        {showAppOptions ? (
          <View >
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={openStickerModal} />
              <IconButton
                icon="save-alt"
                label="Save"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>
        ) : (
          <View>
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImageAsync}
            />
            <Button
              label="Use this photo"
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        )}
        {isModalVisible && (
          <View>
            <EmojiPicker
              key={isModalVisible ? "visible" : "hidden"}
              isVisible={isModalVisible}
              onClose={onModalClose}
            >
              <EmojiList onSelect={onAddSticker} />
            </EmojiPicker>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "relative",
    flex: 2 / 3,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 10,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
