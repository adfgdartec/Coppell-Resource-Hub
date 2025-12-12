"use client"

interface ResourceCardProps {
  icon: string
  title: string
  description: string
  isOffset?: boolean
}

export function ResourceCard({ icon, title, description, isOffset = false }: ResourceCardProps) {
  return (
    <button
      className={`group rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-6 text-left transition-all duration-300 hover:border-blue-500/30 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-blue-500/10 sm:p-8 ${
        isOffset ? "md:mt-8" : ""
      }`}
    >
      <div className="mb-3 text-3xl sm:text-4xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-400 sm:text-xl">
        {title}
      </h3>
      <p className="text-sm text-gray-400 group-hover:text-gray-300 sm:text-base">{description}</p>
    </button>
  )
}
