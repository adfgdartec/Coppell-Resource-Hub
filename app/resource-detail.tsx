"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const { width: SCREEN_W } = Dimensions.get("window")

interface Resource {
  id: number
  title: string
  desc: string
  location: string
  time: string
  people: string
  tags: string[]
  category: string
  coords: [number, number]
  aboutTitle?: string
  aboutDesc?: string
  requirements?: string[]
  contactEmail?: string
  contactPhone?: string
  contactWebsite?: string
}

export default function ResourceDetail({ resource }: { resource: Resource }) {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleGoBack = () => {
    router.push("/")
  }

  return (
    <LinearGradient colors={["#0D0F12", "#000000"]} style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
            <Text style={styles.backText} >Back to Search</Text>
          </Pressable>
        </View>

        {/* Image Gallery Placeholder */}
        <View style={styles.imageGallery}>
          <View style={styles.imageRow}>
            <View style={styles.imageLarge}>
              <Image
                source={{ uri: "/resource-opportunity-image.jpg" }}
                style={styles.image}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={48} color="rgba(255,255,255,0.3)" />
                </View>
              )}
            </View>
            <View style={styles.imageColumn}>
              <View style={styles.imageSmall}>
                <Image source={{ uri: "/activity-image.jpg" }} style={styles.image} />
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={32} color="rgba(255,255,255,0.3)" />
                </View>
              </View>
              <View style={styles.imageSmall}>
                <Image source={{ uri: "/community-image.jpg" }} style={styles.image} />
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={32} color="rgba(255,255,255,0.3)" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Title and Tags */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{resource.title}</Text>
          <View style={styles.tagsRow}>
            {resource.tags.map((tag, idx) => (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <Ionicons name="location" size={20} color="#3E87DB" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{resource.location}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="time" size={20} color="#3E87DB" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Schedule</Text>
              <Text style={styles.infoValue}>{resource.time}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="people" size={20} color="#3E87DB" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Participants</Text>
              <Text style={styles.infoValue}>{resource.people}</Text>
            </View>
          </View>
        </View>

        {/* About This Opportunity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#3E87DB" />
            <Text style={styles.sectionTitle}>About This Opportunity</Text>
          </View>
          <Text style={styles.sectionDesc}>
            {resource.aboutDesc ||
              "Join us for an interactive workshop focused on developing leadership skills for young professionals. This is an excellent opportunity to grow your skills and make meaningful connections in the community. We welcome participants of all experience levels and provide comprehensive training and support throughout the program."}
          </Text>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#3E87DB" />
            <Text style={styles.sectionTitle}>Requirements</Text>
          </View>
          <View style={styles.requirementsList}>
            {(
              resource.requirements || [
                "Must be 16 years or older",
                "Commitment to attend regularly",
                "Background check may be required",
                "Enthusiasm and willingness to learn",
              ]
            ).map((req, idx) => (
              <View key={idx} style={styles.requirementItem}>
                <Ionicons name="checkmark" size={16} color="#3E87DB" />
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Get In Touch */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="call" size={24} color="#3E87DB" />
            <Text style={styles.sectionTitle}>Get In Touch</Text>
          </View>
          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>{resource.contactEmail || "contact@opportunity.org"}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{resource.contactPhone || "(555) 123 - 4567"}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>{resource.contactWebsite || "www.opportunity.org"}</Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaContainer}>
          <Pressable style={styles.ctaButton}>
            <Text style={styles.ctaText}>Go To Application</Text>
            <Ionicons name="open-outline" size={20} color="#fff" />
          </Pressable>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  imageGallery: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  imageRow: {
    flexDirection: "row",
    gap: 12,
  },
  imageLarge: {
    flex: 1.5,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    height: 300,
    overflow: "hidden",
  },
  imageColumn: {
    flex: 1,
    gap: 12,
  },
  imageSmall: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleSection: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: "row",
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
  infoCards: {
    paddingHorizontal: 16,
    gap: 12,
    marginVertical: 16,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    fontWeight: "500",
  },
  infoValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionDesc: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 22,
  },
  requirementsList: {
    gap: 10,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  requirementText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
  },
  contactGrid: {
    gap: 16,
  },
  contactItem: {
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  contactLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    fontWeight: "500",
  },
  contactValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
  ctaContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  ctaButton: {
    backgroundColor: "#3E87DB",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
