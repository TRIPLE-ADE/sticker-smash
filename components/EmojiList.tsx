import { StyleSheet, FlatList, Platform, Pressable, Text } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
  onSelect: (emoji: ImageSource) => void;
};

export default function EmojiList({ onSelect }: Props) {
  const emoji: ImageSource[] = [
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ];

  const emojies = [
    // Shopping & Payment
    "🛒",
    "🛍️",
    "🧺",
    "💳",
    "💸",
    "💵",
    "💰",
    "💲",
    "🧾",
    "🔖",
    "🏪",
    "🏬",
    "🏦",
    "🏧",
    "📦",
    "📮",
    "🏷️",
  
    // Organizational / Utility
    "✅",
    "📋",
    "📜",
    "✏️",
    "📝",
    "🔍",
    "📆",
    "⏰",
    "📱",
    "💻",
    "🌐",
    "🔗",
    "🔒",
    "🔑",
    "🗃️",
    "🗂️",
    "🔄",
    "💡",
    "⭐️",
    "📌",
    "📍",
    "📊",
    "💯",
    "🎉",
    "🎊",
    "🎁",
    "🏆",
    "⚖️",
    "🏠",
  
    // Transportation & Movement (for shopping trips)
    "🚗",
    "🏃‍♂️",
    "🏃‍♀️",
    "🚶‍♂️",
    "🚶‍♀️",
  
    // Clothing (Items to buy)
    "👕",
    "👖",
    "👗",
    "👔",
    "🩳",
    "👠",
    "👟",
    "🧥",
    "🧤",
    "🧣",
    "🧦",
    "🎒",
    "👜",
    "👛",
    "👓",
    "🕶️",
    "👒",
  
    // Household Items (Things you might add to a shopping list)
    "🪣",
    "🪑",
    "🛋️",
    "🚪",
    "🪟",
    "🏺",
    "🖼️",
    "📺",
    "📻",
    "🔌",
    "🧴",
    "🪥",
    "🧹",
    "🧽",
    "🗑️",
    "🪒",
    "💊",
    "💉",
    "🩹",
    "❤️",
    "💔",
    "💘",
    "💙",
    "💚",
    "💛",
    "💜",


    // Fruits
    "🍏",
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🫐",
    "🍈",
    "🍒",
    "🍑",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
  
    // Vegetables
    "🍅",
    "🍆",
    "🥑",
    "🥦",
    "🥬",
    "🥒",
    "🌶",
    "🫑",
    "🌽",
    "🥕",
    "🥔",
    "🧄",
    "🧅",
    "🍄",
  
    // Breads & Bakery
    "🍞",
    "🥖",
    "🥨",
    "🥐",
    "🥯",
  
    // Dairy & Eggs
    "🧀",
    "🥚",
    "🍳",
    "🥞",
    "🧇",
  
    // Meats
    "🥓",
    "🥩",
    "🍗",
    "🍖",
  
    // Fast Foods
    "🌭",
    "🍔",
    "🍟",
    "🍕",
  
    // Wraps, Sandwiches & Ethnic Foods
    "🥪",
    "🌮",
    "🌯",
    "🫔",
    "🥙",
    "🧆",
  
    // Pasta, Rice & Asian Foods
    "🍜",
    "🍝",
    "🍣",
    "🍤",
    "🍙",
    "🍚",
    "🍛",
    "🍲",
    "🥘",
    "🥗",
  
    // Snacks & Misc
    "🍿",
    "🧈",
    "🥫",
    "🍱",
    "🥮",
    "🍠",
    "🍥",
    "🥟",
    "🥠",
    "🥡",
  
    // Desserts & Sweets
    "🍦",
    "🍧",
    "🍨",
    "🍩",
    "🍪",
    "🧁",
    "🍰",
    "🎂",
    "🍮",
    "🍭",
    "🍬",
    "🍫",
    "🍯",
  
    // Nuts
    "🥜",
    "🌰",
  
    // Drinks
    "🥛",
    "🧃",
    "🧉",
    "🥤",
    "🍶",
    "🍵",
    "🍺",
    "🍻",
    "🥂",
    "🍷",
    "🍸",
    "🍹",
    "🥃",
    "🍾",
    "☕️",
    "🫖",
  
    // Utensils & Condiments
    "🥄",
    "🍴",
    "🍽",
    "🥢",
    "🧂",
    "🥄" ,
      
  ];

  return (
    <FlatList
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(_, index) => index.toString()} 
      numColumns={3}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{ bottom: 0 }}
      scrollIndicatorInsets={{ bottom: 0 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
          }}
        >
          {/* <Text style={{ fontSize: 60 }}>{item}</Text> */}
          <Image source={item} style={styles.image} />
        </Pressable>
      )}
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
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
