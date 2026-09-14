import { useLocation, useNavigate } from 'react-router-dom'

const topics = [
  { id: 'tenant-rights', name: 'Tenant Rights', active: true },
  { id: 'land-rights', name: 'Land Rights', active: false },
  { id: 'consumer-rights', name: 'Consumer Rights', active: false },
  { id: 'labor-rights', name: 'Labor Rights', active: false },
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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-indigo-50 to-white text-center">
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 transition"
      >
        ← Change location
      </button>

      <h1 className="text-4xl font-bold mb-2 text-gray-900">QueryBase</h1>

      <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1 rounded-full mb-10">
        📍 Showing topics for {location}
      </span>

      <div className="grid grid-cols-2 gap-4 max-w-md w-full animate-fade-in">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            disabled={!topic.active}
            className={`relative rounded-xl p-6 text-base font-bold border-2 transition-all duration-200
              ${topic.active
                ? 'bg-indigo-600 text-white border-indigo-600 cursor-pointer hover:bg-indigo-700 hover:scale-[1.03] hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
              }`}
            title={!topic.active ? 'Coming soon — expanding to more topics' : ''}
          >
            {!topic.active && (
              <span className="absolute top-2 right-2 text-gray-300">🔒</span>
            )}
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