import React, { useRef, useState } from 'react';
import { Animated, PanResponder, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function CardDeck({ data }) {
  const position = useRef(new Animated.ValueXY()).current;
  const [index, setIndex] = useState(0);

  const rotate = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-20deg", "0deg", "20deg"]
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.95, 0.9, 0.95],
    extrapolate: "clamp"
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 120) {
        forceSwipe("right");
      } else if (gesture.dx < -120) {
        forceSwipe("left");
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    }
  });

  const forceSwipe = (dir) => {
    Animated.timing(position, {
      toValue: { x: dir === "right" ? 500 : -500, y: 0 },
      duration: 250,
      useNativeDriver: false
    }).start(() => onSwipeComplete());
  };

  const onSwipeComplete = () => {
    position.setValue({ x: 0, y: 0 });
    setIndex((prev) => (prev + 1) % data.length);
  };

  const handleNext = () => forceSwipe("right");
  const handleBack = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {data
        .map((item, i) => {
          if (i < index) return null;

          if (i === index) {
            return (
              <Animated.View
                key={i}
                {...panResponder.panHandlers}
                style={[
                  styles.card,
                  {
                    transform: [...position.getTranslateTransform(), { rotate }]
                  }
                ]}
              >
                <Card item={item} />
              </Animated.View>
            );
          }

          if (i === index + 1) {
            return (
              <Animated.View
                key={i}
                style={[
                  styles.card,
                  {
                    transform: [{ scale: nextCardScale }],
                    opacity: 0.7,
                    top: 20
                  }
                ]}
              >
                <Card item={item} />
              </Animated.View>
            );
          }

          return null;
        })
        .reverse()}

      <View style={styles.buttonRow}>
        <Pressable onPress={handleBack} style={styles.btn}>
          <Text style={styles.btnText}>Back</Text>
        </Pressable>

        <Pressable onPress={handleNext} style={styles.btn}>
          <Text style={styles.btnText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Card({ item }) {
  return (
    <>
      <Text style={styles.bigText}>{item.title}</Text>
      <Text style={styles.normText}>{item.desc}</Text>

      <View style={styles.infoRow}>
        <Ionicons name="location" size={16} color="rgba(255,255,255,0.6)" />
        <Text style={styles.smallText}>{item.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.6)" />
        <Text style={styles.smallText}>{item.time}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="people-outline" size={16} color="rgba(255,255,255,0.6)" />
        <Text style={styles.smallText}>{item.people}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: "60%",
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    borderColor: "rgba(255,255,255,0.18)",
    borderWidth: 1
  },
  bigText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginTop: 6
  },
  normText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginTop: 6
  },
  smallText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginTop: 6
  },
  infoRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8
  },
  buttonRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 340
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#333",
    borderRadius: 12
  },
  btnText: {
    color: "#fff",
    fontSize: 16
  }
});
