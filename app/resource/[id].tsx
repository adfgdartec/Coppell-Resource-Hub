import { useLocalSearchParams } from "expo-router"
import ResourceDetail from "../resource-detail"

export default function ResourceDetailPage() {
  const { resource: resourceJson } = useLocalSearchParams()

  const resource = resourceJson ? JSON.parse(Array.isArray(resourceJson) ? resourceJson[0] : resourceJson) : null

  if (!resource) {
    return (
      <ResourceDetail
        resource={{
          id: 0,
          title: "Loading...",
          desc: "",
          location: "",
          time: "",
          people: "",
          tags: [],
          category: "",
          coords: [0, 0],
        }}
      />
    )
  }

  return <ResourceDetail resource={resource} />
}
