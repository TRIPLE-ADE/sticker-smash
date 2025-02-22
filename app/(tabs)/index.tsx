import "expo-dev-client";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Button,
  CircleButton,
  IconButton,
  EmojiSticker,
  ImageViewer,
  EmojiList,
  EmojiPicker,
} from "@/components";
import { useDisclosure, useImageEditor, usePermissions } from "@/hooks";

const PlaceholderImage = require("../../assets/images/background-image.png");

export default function Index() {
  usePermissions();
  const { isVisible, toggleModal } = useDisclosure();
  const {
    selectedImage,
    showAppOptions,
    setShowAppOptions,
    pickedEmoji,
    removeEmoji,
    addEmoji,
    imageRef,
    takePhoto,
    pickImage,
    resetApp,
    saveImage,
  } = useImageEditor();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer} ref={imageRef} collapsable={false}>
          <View>
            <ImageViewer
              imgSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {pickedEmoji.map((sticker, index) => (
              <EmojiSticker
                key={index}
                onPress={removeEmoji}
                stickerSource={sticker}
                size={40}
              />
            ))}
          </View>
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={resetApp} />
              <CircleButton onPress={toggleModal} isDisabled={isVisible} />
              <IconButton icon="save-alt" label="Save" onPress={saveImage} />
            </View>
          </View>
        ) : (
          <View style={styles.optionsContainer}>
            <Button theme="primary" label="Choose Photo" onPress={pickImage} />
            <Button theme="primary" label="Take Photo" onPress={takePhoto} />
            <Button
              label="Use this photo"
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        )}
        {isVisible && (
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <EmojiPicker
              key={isVisible ? "visible" : "hidden"}
              isVisible={isVisible}
              onClose={toggleModal}
            >
              <EmojiList onSelect={addEmoji} onClose={toggleModal} />
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
    justifyContent: "space-between",
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
