import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Platform, Pressable, useWindowDimensions, View } from "react-native";
import { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  size: number;
  stickerSource: { id: string; emoji: string };
  onPress: (id: string) => void;
};

export default function EmojiSticker({ size, stickerSource, onPress }: Props) {
  const { height, width } = useWindowDimensions();
  const scale = useSharedValue(size);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showDeleteIcon) {
      timer = setTimeout(() => setShowDeleteIcon(false), 3000); // Hide after 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [showDeleteIcon]);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scale.value = scale.value === size * 2 ? size : size * 2;
    });

  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const longPress = Gesture.LongPress().onStart(() => {
    runOnJS(setShowDeleteIcon)(true);
  });

  const emojiStyle = useAnimatedStyle(() => ({
    fontSize: withSpring(scale.value),
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  const combinedGesture = Gesture.Simultaneous(drag, doubleTap, longPress);

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View
        style={[
          containerStyle,
          {
            position: "absolute",
            top: Platform.OS === "web" ? 100 : height * 0.2,
            left: Platform.OS === "web" ? 100 : width * 0.3,
          },
        ]}
      >
        {showDeleteIcon && (
          <Pressable onPress={() => onPress(stickerSource.id)} style={{ position: "absolute", top: -10, right: -20 }}>
            <MaterialIcons name="delete" size={24} color="red" />
          </Pressable>
        )}
        <Animated.Text style={[emojiStyle, { fontSize: size }]}>
          {stickerSource.emoji}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
}
