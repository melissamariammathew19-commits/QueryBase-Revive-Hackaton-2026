import { useLocation, useNavigate } from 'react-router-dom'

const topics = [
  { id: 'tenant-rights', name: 'Tenant Rights', emoji: '🏠', active: true },
  { id: 'land-rights', name: 'Land Rights', emoji: '🌳', active: false },
  { id: 'consumer-rights', name: 'Consumer Rights', emoji: '🛒', active: false },
  { id: 'labor-rights', name: 'Labor Rights', emoji: '⚖️', active: false },
]

function Topic() {
  const navigate = useNavigate()
  const routerLocation = useLocation()
  const location = routerLocation.state?.location || 'California'

  const handleTopicClick = (topic) => {
    if (!topic.active) return
    navigate('/chat', { state: { location, topic: topic.id } })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 text-center">
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-500 hover:text-indigo-600 mb-6 transition font-medium"
      >
        ← Change location
      </button>

      <h1 className="text-4xl font-bold mb-2 text-gray-900 tracking-tight">
  QueryBase
</h1>

      <span className="inline-block bg-white shadow-sm text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-10 border border-purple-200">
        📍 Showing topics for {location}
      </span>

      <div className="grid grid-cols-2 gap-5 max-w-md w-full">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            disabled={!topic.active}
            title={!topic.active ? 'Coming soon — expanding to more topics' : ''}
            className={`relative rounded-2xl p-6 text-base font-bold border-2 transition-all duration-200
              ${topic.active
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-transparent cursor-pointer hover:scale-[1.05] hover:shadow-xl shadow-md'
                : 'bg-white/60 text-gray-400 border-dashed border-gray-300 cursor-not-allowed'
              }`}
          >
            {!topic.active && (
              <span className="absolute top-2 right-3 text-gray-300 text-sm">🔒</span>
            )}
            <div className="text-2xl mb-1">{topic.emoji}</div>
            {topic.name}
            {!topic.active && (
              <div className="text-xs mt-1 font-normal text-gray-400">Coming Soon</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Topic