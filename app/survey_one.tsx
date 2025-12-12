import React, { useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { router } from 'expo-router';

const { width, height } = Dimensions.get("window")
const isSmallScreen = width < 500

const Question1 = [
  {
    id:1,
    title: "Volunteering",
  },
  {
    id:2,
    title: "Clubs",
  },
  {
    id:3,
    title: "Courses",
  },
  {
    id:4,
    title: "Events",
  },
  {
    id:5,
    title: "Certifications",
  },
]

const Question2 = [
  {
    id:6,
    title: "STEM",
  },
  {
    id:7,
    title: "Art",
  },
  {
    id:8,
    title: "Sports",
  },
  {
    id:9,
    title: "Business",
  },
  {
    id:10,
    title: "Community Work",
  },
  {
    id:11,
    title: "Leadership",
  },
]




const App = () => {
  const [currentStep, setCurrentStep] = useState(2)

  const steps = ["Welcome", "Preferences", "Rate"]
  

  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) => 
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };
  const pickedFromQ1 = selected.some(id => id >= 1 && id <= 5);
  const pickedFromQ2 = selected.some(id => id >= 6 && id <= 11);
  
  const canGoNext = pickedFromQ1 && pickedFromQ2;
  

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
            <Text key={index} style={[styles.stepLabel, currentStep === index + 1 && styles.stepLabelActive]}>
              {step}
            </Text>
          ))}
        </View>
        



        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>What achievements are you seeking?</Text>
          <View style={styles.interestsContainer}>
            {Question1.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => toggleSelect(item.id)}
                style={[
                  styles.interestChip,
                  selected.includes(item.id) && styles.interestChipSelected
                ]}
              >
                <Text style={styles.interestChipText}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>


        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Your Interests?</Text>

          <View style={styles.interestsContainer}>
            {Question2.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => toggleSelect(item.id)}
                style={[
                  styles.interestChip,
                  selected.includes(item.id) && styles.interestChipSelected
                ]}
              >
                <Text style={styles.interestChipText}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
  
          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>

          {/* Next Button */}
          <Pressable
            onPress={() => {
              if (canGoNext) router.push('/survey_two');
            }}
            style={[
              styles.nextButton,
              !canGoNext && { opacity: 0.4 }
            ]}
          >
            <Text style={styles.nextButtonText}>Next →</Text>
          </Pressable>

        </View>





      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#0f0f0f",

  },
  scrollContent: {
    paddingHorizontal: isSmallScreen ? 16 : 24,
    paddingBottom: 40,
    marginLeft: '15%',
    marginRight:'15%'

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
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3b82f6",
    marginBottom: 32,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  locationText: {
    color: "#3b82f6",
    fontSize: 13,
    fontWeight: "500",
  },
  heroSection: {
    marginBottom: 40,
  },
  headingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  headingNormal: {
    fontSize: isSmallScreen ? 36 : 48,
    fontWeight: "700",
    color: "#fff",
  },
  headingHighlight: {
    fontSize: isSmallScreen ? 36 : 48,
    fontWeight: "700",
    color: "#3b82f6",
  },
  subheading: {
    fontSize: isSmallScreen ? 14 : 16,
    color: "#b3b3b3",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
    alignSelf: "center",
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  ctaButtonArrow: {
    color: "#fff",
    fontSize: 18,
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
    marginBottom: 12,
  },
  infoBoxText: {
    color: "#b3b3b3",
    fontSize: 14,
    lineHeight: 22,
  },
  resourcesHeading: {
    color: "#b3b3b3",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
    fontWeight: "500",
  },
  resourcesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  resourceCard: {
    width: isSmallScreen ? "100%" : "48%",
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  resourceCardOffset: {
    marginTop: isSmallScreen ? 0 : 24,
  },
  resourceIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  resourceTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  resourceDescription: {
    color: "#999",
    fontSize: 13,
    lineHeight: 18,
  },

  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  interestChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
    marginRight: 10,
    marginBottom: 10,
  },
  interestChipSelected: {
    backgroundColor: "#3b82f6",
    borderColor: "#2563eb",
  },
  interestChipText: {
    color: "#fff",
    fontSize: 14,
  },

  backButton: {
    padding: 10,
  },

  nextButton: {
    backgroundColor: "#4F95E6",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  
  
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  
})

export default App
