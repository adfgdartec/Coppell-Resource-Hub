import React, { useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const isSmallScreen = width < 500;

const App = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const steps = ["Welcome", "Preferences", "Rate"];

  const [rating, setRating] = useState(0);
  const [rating2, setRating2] = useState(0);

  const canGoNext = rating > 0 && rating2 > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <View style={[styles.stepCircle, currentStep === index + 1 && styles.stepCircleActive]}>
                <Text style={[styles.stepNumber, currentStep === index + 1 && styles.stepNumberActive]}>
                  {index + 1}
                </Text>
              </View>

              {index < steps.length - 1 && (
                <View style={[styles.progressLine, currentStep > index + 1 && styles.progressLineActive]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Step Labels */}

        <View style={styles.stepLabelsContainer}>
          {steps.map((step, index) => (
            <Text
              key={index}
              style={[styles.stepLabel, currentStep === index + 1 && styles.stepLabelActive]}
            >
              {step}
            </Text>
          ))}
        </View>


        <View style={styles.infoBox}>
            <View style={styles.row}>
                <View style = {{alignItems: "center",justifyContent:'center'}}>
                    <Text style={styles.infoBoxTitle}>Sample Resource 1</Text>
                </View>

                <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Pressable key={star} onPress={() => setRating(star)}>
                    <Text style={[
                        styles.starSmall,
                        rating >= star && styles.starSelected
                    ]}>
                        ★
                    </Text>
                    </Pressable>
                ))}
                </View>
            </View>
        </View>
        
        <View style={styles.infoBox}>
            <View style={styles.row}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.infoBoxTitle}>Sample Resource 2</Text>
                </View>

                <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Pressable key={star} onPress={() => setRating2(star)}>
                    <Text
                        style={[
                        styles.starSmall,
                        rating2 >= star && styles.starSelected
                        ]}
                    >
                        ★
                    </Text>
                    </Pressable>
                ))}
                </View>
            </View>
        </View>





        {/* Navigation Buttons */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
          
          {/* Back */}
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>

          {/* Next */}
          <Pressable
            onPress={() => {
              if (canGoNext) router.push("/search/page");
            }}
            style={[styles.nextButton, !canGoNext && { opacity: 0.4 }]}
          >
            <Text style={styles.nextButtonText}>Next →</Text>
          </Pressable>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  scrollContent: {
    paddingHorizontal: isSmallScreen ? 16 : 24,
    paddingBottom: 40,
    marginLeft: "15%",
    marginRight: "15%",
  },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#404040",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#505050",
  },
  stepCircleActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#2563eb",
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999",
  },
  stepNumberActive: {
    color: "#fff",
  },
  progressLine: {
    width: isSmallScreen ? 40 : 60,
    height: 1,
    backgroundColor: "#404040",
    marginHorizontal: 12,
  },
  progressLineActive: {
    backgroundColor: "#3b82f6",
  },
  stepLabelsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
    paddingHorizontal: isSmallScreen ? 10 : 20,
  },
  stepLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  stepLabelActive: {
    color: "#fff",
  },

  infoBox: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    backgroundColor: "#1a1a1a",
  },
  infoBoxTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 18,
  },

  starContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 40,
  },

  star: {
    fontSize: 42,
    color: "#555",
  },
  starSelected: {
    color: "#FFD700",
  },

  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  nextButton: {
    backgroundColor: "#4F95E6",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  starRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  starSmall: {
    fontSize: 40,   // smaller, so they fit beside the title
    marginHorizontal: 2,
    color: "#555",
  },
  
});

export default App;
