"use client"

import React, { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView } from "react-native"

const { width, height } = Dimensions.get("window")
const isSmallScreen = width < 500

const RESOURCES = [
  {
    id: 1,
    title: "Job Opportunities",
    description: "Find local career openings and professional development",
    icon: "",
  },
  {
    id: 2,
    title: "Education & Training",
    description: "Access courses, workshops, and skill-building programs",
    icon: "",
  },
  {
    id: 3,
    title: "Community Events",
    description: "Discover local events, meetups, and social gatherings",
    icon: "",
  },
  {
    id: 4,
    title: "Health & Wellness",
    description: "Find fitness, mental health, and medical services nearby",
    icon: "",
  },
  {
    id: 5,
    title: "Business Support",
    description: "Connect with local entrepreneurs and business resources",
    icon: "🚀",
  },
  {
    id: 6,
    title: "Community Groups",
    description: "Join clubs, hobby groups, and community organizations",
    icon: "👥",
  },
]

const App = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = ["Welcome", "Preferences", "Rate"]

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

        {/* Location Badge */}
        <View style={styles.locationBadge}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>Coppell, TX</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingNormal}>Discover </Text>
            <Text style={styles.headingHighlight}>Your Community</Text>
          </View>

          <Text style={styles.subheading}>
            Connect with local resources, opportunities, and services tailored to your interests
          </Text>

          {/* CTA Button */}
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
            <Text style={styles.ctaButtonText}>Begin Survey</Text>
            <Text style={styles.ctaButtonArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Why this matters</Text>
          <Text style={styles.infoBoxText}>
            Our community thrives when everyone has access to the right resources. This personalized map helps you
            discover opportunities that match your interests, goals, and needs — all in one place.
          </Text>
        </View>

        {/* Resources Section */}
        <Text style={styles.resourcesHeading}>Explore Resources across Coppell</Text>

        <View style={styles.resourcesContainer}>
          {RESOURCES.map((resource, index) => (
            <TouchableOpacity
              key={resource.id}
              style={[styles.resourceCard, index % 2 === 1 && styles.resourceCardOffset]}
              activeOpacity={0.8}
            >
              <Text style={styles.resourceIcon}>{resource.icon}</Text>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>{resource.description}</Text>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: isSmallScreen ? 0 : 20,
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
})

export default App
