"use client"

import { useRef, useState } from "react"
import { Animated, View, Text, StyleSheet, Dimensions, ScrollView, Pressable, Platform, TextInput } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

let MapboxGL: any = null
try {
  MapboxGL = require("@react-native-mapbox-gl/maps").default
  // Set your Mapbox access token here
  if (MapboxGL && process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN)
  }
} catch (e) {
  console.warn("[v0] Mapbox not available, using fallback map")
}

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window")
const CARD_WIDTH = Math.min(920, Math.max(360, SCREEN_W * 0.58))
const CARD_HEIGHT = Math.min(520, Math.max(260, SCREEN_H * 0.56))
const SPACING = 10
const MAP_HEIGHT = Math.min(450, SCREEN_H * 0.4)
const isSmallScreen = SCREEN_W < 360

const resources = [
  {
    id: 1,
    title: "STEM Tutoring Program",
    desc: "Volunteer as a tutor helping high school students with math & science.",
    location: "Coppell Library",
    time: "Weekdays, 4–6 PM",
    people: "18 Participants",
    tags: ["STEM", "Volunteering"],
    category: "Academic Resources",
    coords: [-96.586, 32.904],
  },
  {
    id: 2,
    title: "Youth Leadership Workshop",
    desc: "Join us for an interactive workshop focused on developing leadership skills for young professionals.",
    location: "Community Center, Downtown",
    time: "Saturdays, 2–4 PM",
    people: "24 Participants",
    tags: ["Leadership", "Community Work"],
    category: "Club & Activities",
    coords: [-96.59, 32.908],
  },
  {
    id: 3,
    title: "Robotics Club",
    desc: "Join us for hands-on robotics and coding experiences.",
    location: "Tech Building A",
    time: "Thursdays, 5–7 PM",
    people: "12 Participants",
    tags: ["Robotics", "Coding"],
    category: "Club & Activities",
    coords: [-96.575, 32.912],
  },
  {
    id: 4,
    title: "Health & Fitness Classes",
    desc: "Free yoga, pilates, and cardio classes for all fitness levels.",
    location: "Wellness Center",
    time: "Mon-Fri, 6–7 PM",
    people: "35 Participants",
    tags: ["Health", "Fitness"],
    category: "Health & Wellness",
    coords: [-96.592, 32.898],
  },
  {
    id: 5,
    title: "Food Bank Distribution",
    desc: "Help distribute food to families in need.",
    location: "Main Street Distribution Hub",
    time: "Sundays, 9 AM–12 PM",
    people: "40 Participants",
    tags: ["Food", "Community"],
    category: "Food Support",
    coords: [-96.581, 32.892],
  },
]

const categories = [
  "Academic Resources",
  "Health & Wellness",
  "Recreation",
  "Club & Activities",
  "Food Support",
  "Events",
  "Other Local Services",
]

function MapComponent({ resources }: { resources: typeof resources }) {
  const mapRef = useRef<any>(null)
  const [selectedPin, setSelectedPin] = useState<number | null>(null)
  const centerCoord = [-96.586, 32.904]

  if (!MapboxGL) {
    return (
      <View style={styles.mapContainer}>
        <View style={styles.mapFallback}>
          <Text style={styles.fallbackText}>Map requires Mapbox access token</Text>
          <Text style={styles.fallbackSubtext}>Add EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN to your environment variables</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.mapContainer}>
      <MapboxGL.MapView
        ref={mapRef}
        styleURL={MapboxGL.StyleURL?.Dark || "mapbox://styles/mapbox/dark-v11"}
        zoomLevel={14}
        centerCoordinate={centerCoord}
        style={styles.mapBox}
      >
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={centerCoord}
          animationMode="easeTo"
          animationDuration={1000}
        />

        {resources.map((resource) => (
          <MapboxGL.PointAnnotation
            key={resource.id}
            id={`pin-${resource.id}`}
            coordinate={resource.coords}
            onSelected={() => setSelectedPin(resource.id)}
          >
            <View style={styles.pinMarker}>
              <Ionicons name="location" size={20} color="#fff" />
            </View>
          </MapboxGL.PointAnnotation>
        ))}

        {selectedPin !== null && (
          <MapboxGL.Callout>
            <View style={styles.callout}>
              <Text style={styles.calloutTitle}>{resources.find((r) => r.id === selectedPin)?.title}</Text>
              <Text style={styles.calloutSubtitle}>{resources.find((r) => r.id === selectedPin)?.location}</Text>
            </View>
          </MapboxGL.Callout>
        )}
      </MapboxGL.MapView>
    </View>
  )
}

export default function ResourceDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredResources, setFilteredResources] = useState(resources)
  const router = useRouter()

  // Filter resources based on search and categories
  const handleFilterChange = (query: string, categories: string[]) => {
    let filtered = resources

    if (query.trim()) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.desc.toLowerCase().includes(query.toLowerCase()) ||
          r.location.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (categories.length > 0) {
      filtered = filtered.filter((r) => categories.includes(r.category))
    }

    setFilteredResources(filtered)
  }

  const toggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(updated)
    handleFilterChange(searchQuery, updated)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    handleFilterChange(query, selectedCategories)
  }

  return (
    <LinearGradient colors={["#0D0F12", "#000000"]} style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resources</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="rgba(255,255,255,0.5)" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for Resources in Coppell, TX..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Filter Chips */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {categories.map((category) => (
              <Pressable
                key={category}
                onPress={() => toggleCategory(category)}
                style={[styles.filterChip, selectedCategories.includes(category) && styles.filterChipActive]}
              >
                <Text
                  style={[styles.filterChipText, selectedCategories.includes(category) && styles.filterChipTextActive]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Interactive Map */}
        <MapComponent resources={filteredResources} />

        {/* Curate with AI Button */}
        <View style={styles.curateContainer}>
          <Pressable style={styles.curateBtn}>
            <Ionicons name="sparkles" size={20} color="#fff" />
            <Text style={styles.curateText}>Curate with AI</Text>
          </Pressable>
        </View>

        {/* Available Opportunities */}
        <View style={styles.container}>
          <Text style={styles.sectionText}>Available Opportunities ({filteredResources.length})</Text>

          {filteredResources.length > 0 ? (
            <Carousel
              data={filteredResources}
              onSelectResource={(resource) => {
                router.push({
                  pathname: "/resource/[id]",
                  params: { id: resource.id, resource: JSON.stringify(resource) },
                })
              }}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="rgba(255,255,255,0.3)" />
              <Text style={styles.emptyText}>No resources found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

function Carousel({
  data,
  onSelectResource,
}: { data: typeof resources; onSelectResource: (resource: (typeof resources)[0]) => void }) {
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollRef = useRef<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x
    const idx = Math.round(x / (CARD_WIDTH + SPACING))
    setCurrentIndex(idx)
  }

  const goToIndex = (targetIndex: number) => {
    const safeIndex = Math.max(0, Math.min(data.length - 1, targetIndex))
    const xOffset = safeIndex * (CARD_WIDTH + SPACING)

    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ x: xOffset, animated: true })
    })

    setCurrentIndex(safeIndex)
  }

  const handleNext = () => goToIndex(currentIndex + 1)
  const handleBack = () => goToIndex(currentIndex - 1)

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
          listener: handleScroll,
        })}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          width: (CARD_WIDTH + SPACING) * data.length,
          paddingHorizontal: SCREEN_W / 2,
        }}
      >
        {data.map((item, i) => {
          const inputRange = [
            (i - 1) * (CARD_WIDTH + SPACING),
            i * (CARD_WIDTH + SPACING),
            (i + 1) * (CARD_WIDTH + SPACING),
          ]

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: "clamp",
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.45, 1, 0.45],
            extrapolate: "clamp",
          })

          return (
            <Animated.View
              key={item.id}
              style={{
                width: CARD_WIDTH,
                marginRight: SPACING,
                transform: [{ scale }],
                opacity,
              }}
            >
              <Pressable onPress={() => onSelectResource(item)}>
                <View style={styles.card}>
                  <Card item={item} />
                </View>
              </Pressable>
            </Animated.View>
          )
        })}
      </Animated.ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.buttonsRow}>
        <Pressable
          onPress={handleBack}
          disabled={currentIndex === 0}
          style={[styles.backBtn, currentIndex === 0 && styles.btnDisabled]}
        >
          <Text style={styles.btnText}>Back</Text>
        </Pressable>

        <Pressable
          onPress={handleNext}
          disabled={currentIndex === data.length - 1}
          style={[styles.nextBtn, currentIndex === data.length - 1 && styles.btnDisabled]}
        >
          <Text style={styles.btnText}>Next</Text>
        </Pressable>
      </View>
    </View>
  )
}

function Card({ item }: { item: (typeof resources)[0] }) {
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
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    alignItems: "flex-start",
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingTop: isSmallScreen ? 12 : 16,
    paddingBottom: isSmallScreen ? 10 : 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#fff",
  },
  filterSection: {
    marginVertical: 16,
  },
  filterLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 16,
    marginBottom: 8,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  filterChipActive: {
    backgroundColor: "#6B6FFF",
    borderColor: "#6B6FFF",
  },
  filterChipText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  mapContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  mapBox: {
    width: "100%",
    height: MAP_HEIGHT,
  },
  pinMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3E87DB",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  callout: {
    backgroundColor: "#111216",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  calloutTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  calloutSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
  curateContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  curateBtn: {
    flexDirection: "row",
    backgroundColor: "#3E87DB",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  curateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  container: {
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: "center",
  },
  sectionText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    marginVertical: 48,
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  emptySubtext: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    marginTop: 4,
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
    alignSelf: "center",
  },
  desc: {
    color: "rgba(255,255,255,0.75)",
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    alignSelf: "center",
  },
  smallText: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
  },
  tagsRow: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
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
  buttonsRow: {
    width: Math.min(1100, SCREEN_W * 0.8),
    marginTop: 22,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  backBtn: {
    flex: 1,
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  nextBtn: {
    flex: 1,
    backgroundColor: "#6C7DFF",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  mapFallback: {
    width: "100%",
    height: MAP_HEIGHT,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  fallbackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  fallbackSubtext: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
})
