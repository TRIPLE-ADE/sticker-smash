import { StyleSheet, FlatList, Platform, Pressable, Text } from "react-native";
import React, { memo } from "react";

type Props = {
  onSelect: (emoji: string) => void;
};

const emojies = [
  "🛒", "🛍️", "🧺", "💳", "💸", "💵", "💰", "💲", "🧾", "🔖", "🏪",
  "🏬", "🏦", "🏧", "📦", "📮", "🏷️", "✅", "📋", "📜", "✏️", "📝",
  "🔍", "📆", "⏰", "📱", "💻", "🌐", "🔗", "🔒", "🔑", "🗃️", "🗂️",
  "🔄", "💡", "⭐️", "📌", "📍", "📊", "💯", "🎉", "🎊", "🎁", "🏆",
  "⚖️", "🏠", "🚗", "🏃‍♂️", "🏃‍♀️", "🚶‍♂️", "🚶‍♀️", "👕", "👖",
  "👗", "👔", "🩳", "👠", "👟", "🧥", "🧤", "🧣", "🧦", "🎒", "👜",
  "👛", "👓", "🕶️", "👒", "🪣", "🪑", "🛋️", "🚪", "🪟", "🏺", "🖼️",
  "📺", "📻", "🔌", "🧴", "🪥", "🧹", "🧽", "🗑️", "🪒", "💊", "💉",
  "🩹", "❤️", "💔", "💘", "💙", "💚", "💛", "💜", "🍏", "🍎", "🍐",
  "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭",
  "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶", "🫑",
  "🌽", "🥕", "🥔", "🧄", "🧅", "🍄", "🍞", "🥖", "🥨", "🥐", "🥯",
  "🧀", "🥚", "🍳", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🌭", "🍔",
  "🍟", "🍕", "🥪", "🌮", "🌯", "🫔", "🥙", "🧆", "🍜", "🍝", "🍣",
  "🍤", "🍙", "🍚", "🍛", "🍲", "🥘", "🥗", "🍿", "🧈", "🥫", "🍱",
  "🥮", "🍠", "🍥", "🥟", "🥠", "🥡", "🍦", "🍧", "🍨", "🍩", "🍪",
  "🧁", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫", "🍯", "🥜", "🌰", "🥛",
  "🧃", "🧉", "🥤", "🍶", "🍵", "🍺", "🍻", "🥂", "🍷", "🍸", "🍹",
  "🥃", "🍾", "☕️", "🫖", "🥄", "🍴", "🍽", "🥢", "🧂"
];

const EmojiItem = memo(({ item, onSelect }: { item: string; onSelect: (emoji: string) => void }) => {
  return (
    <Pressable onPress={() => onSelect(item)}>
      <Text style={{ fontSize: 50 }}>{item}</Text>
    </Pressable>
  );
});

export default function EmojiList({ onSelect }: Props) {
  return (
    <FlatList
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emojies}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item}
      numColumns={6}
      getItemLayout={(data, index) => ({
        length: 60,
        offset: 60 * index,
        index,
      })}
      renderItem={({ item }) => <EmojiItem item={item} onSelect={onSelect} />}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
