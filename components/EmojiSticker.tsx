import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Platform, useWindowDimensions } from "react-native";

type Props = {
  size: number;
  stickerSource: string;
};

export default function EmojiSticker({ size, stickerSource }: Props) {
  const scale = useSharedValue(size);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const { height, width } = useWindowDimensions();

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scale.value !== size * 2) {
        scale.value = scale.value * 2;
      } else {
        scale.value = Math.round(scale.value / 2);
      }
    });

  const emojiStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(scale.value),
    };
  });

  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const combinedGesture = Gesture.Simultaneous(drag, doubleTap);

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
        <Animated.Text style={[emojiStyle, { fontSize: size }]}>
          {stickerSource}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
}
