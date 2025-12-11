import React, { useRef, useState } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Platform,

} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const CARD_WIDTH = Math.min(920, Math.max(360, SCREEN_W * 0.58));
const CARD_HEIGHT = Math.min(520, Math.max(260, SCREEN_H * 0.56));
const SPACING = 10;

const events = [
  {
    title: "STEM Tutoring Program",
    desc: "Volunteer as a tutor helping high school students with math & science.",
    location: "Coppell Library",
    time: "Weekdays, 4–6 PM",
    people: "18 Participants",
    tags: ["STEM", "Volunteering"],
  },
  {
    title: "Youth Leadership Workshop",
    desc: "Interactive workshop developing leadership skills.",
    location: "Community Center, Downtown",
    time: "Saturdays, 2–4 PM",
    people: "24 Participants",
    tags: ["Leadership", "Community Work"],
  },
  {
    title: "Robotics Club",
    desc: "Join us for hands-on robotics and coding.",
    location: "Tech Building A",
    time: "Thursdays, 5–7 PM",
    people: "12 Participants",
    tags: ["Robotics", "Coding"],
  },
];

export default function HomeScreen() {
  return (
    <LinearGradient colors={["#0D0F12", "#000000"]} style={styles.background}>
      <ScrollView>
          <View style = {styles.space}/>
          <View style = {styles.curateView}>
            <Pressable style = {styles.curateBtn}>
              <Text style = {styles.curateText}> Curate with AI</Text>

            </Pressable>
          </View>


        <View style={styles.container}>


          <View style = {styles.space}></View>
          <Text style = {styles.sectionText}>Available Opportunities</Text>
          <View style = {styles.space}></View>
          <Carousel />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function Carousel() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const idx = Math.round(x / (CARD_WIDTH + SPACING));
    setCurrentIndex(idx);
  };

  const goToIndex = (targetIndex) => {
    const safeIndex = Math.max(0, Math.min(events.length + 1, targetIndex));

    const xOffset = safeIndex * (CARD_WIDTH + SPACING);

    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ x: xOffset, animated: true });
    });

    setCurrentIndex(safeIndex);
  };

  const handleNext = () => goToIndex(currentIndex + 1);
  const handleBack = () => goToIndex(currentIndex - 1);

  return (
    <View style={{ width: "100%", alignItems: "center", }}>

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}

        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",

          // 💥 THIS IS THE FIX!!
          width: (CARD_WIDTH + SPACING) * events.length,
          paddingHorizontal: SCREEN_W / 2,
        }}
      >
        {events.map((item, i) => {
          const inputRange = [
            (i - 1) * (CARD_WIDTH + SPACING),
            i * (CARD_WIDTH + SPACING),
            (i + 1) * (CARD_WIDTH + SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.45, 1, 0.45],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={{
                width: CARD_WIDTH,
                marginRight: SPACING,
                transform: [{ scale }],
                opacity,
              }}
            >
              <View style={styles.card}>
                <Card item={item} />
              </View>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      {/* buttons */}
      <View style={styles.buttonsRow}>
        <Pressable onPress={handleBack} style={styles.backBtn}>

          <Text style={styles.btnText}>Back</Text>

        </Pressable>

        <Pressable onPress={handleNext}  style={styles.nextBtn}>
          <View>
            <Text style={styles.btnText}>Next</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}



function Card({ item }) {
  return (
    <View style={styles.cardInner}>
      <View style={styles.iconHolder}>
        <Ionicons name="person-circle-outline" size={46} color="#6B6FFF" />
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color="#bbb" />
        <Text style={styles.smallText}>{item.location}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="time-outline" size={16} color="#bbb" />
        <Text style={styles.smallText}>{item.time}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="people-outline" size={16} color="#bbb" />
        <Text style={styles.smallText}>{item.people}</Text>
      </View>

      <View style={styles.tagsRow}>
        {item.tags.map((t, idx) => (
          <View key={idx} style={styles.tag}>
            <Text style={styles.tagText}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 44,
    alignItems: "center",
  },

  carouselWrap: {
    width: "100%",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#111216",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 10,
    overflow: Platform.OS === "web" ? ("visible" as any) : "hidden",
  },

  cardInner: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
  },

  iconHolder: {
    alignSelf: "center",
    marginBottom: 8,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  desc: {
    color: "rgba(255,255,255,0.75)",
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },

  smallText: {
    color: "rgba(255,255,255,0.78)",
    marginLeft: 8,
  },

  tagsRow: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
    flexWrap: "wrap",
  },

  tag: {
    backgroundColor: "#2B2D33",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
  },

  tagText: {
    color: "#9FB0FF",
    fontSize: 12,
  },

  // Big floating side arrows
  sideArrow: {
    position: "absolute",
    top: "48%",
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 12,
    borderRadius: 999,
    zIndex: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonsRow: {
    width: Math.min(1100, SCREEN_W * 0.8),
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  backBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  nextBtn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#6C7DFF",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  full: {

    width: '700%',
    alignContent:'center',
    alignItems: 'center'

  },
  sectionText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",

  },
  space: {

    padding: 30,

  },
  curateBtn: {
    flex: 1,
    width: '80%',
    backgroundColor: '#3E87DB',
    borderRadius: 16,
    alignItems: "center",
    height:'10%',
    alignSelf: 'center'
  },

  curateText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },

  curateView: {
    flex:1,
  }
});
