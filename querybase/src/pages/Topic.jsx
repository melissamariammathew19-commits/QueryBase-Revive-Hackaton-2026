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

  // Comes from the Location screen via navigate('/topic', { state: { location } })
  // Falls back to 'California' if visited directly (e.g. during testing)
  const location = routerLocation.state?.location || 'California'

  const handleTopicClick = (topic) => {
    if (!topic.active) return
    navigate('/chat', { state: { location, topic: topic.id } })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-2">QueryBase</h1>
      <p className="text-gray-500 mb-8">
        Showing topics for <span className="font-semibold text-gray-800">{location}</span>
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-md w-full">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            disabled={!topic.active}
            className={`rounded-xl p-6 text-base font-bold border-2 transition
              ${topic.active
                ? 'bg-indigo-600 text-white border-indigo-600 cursor-pointer hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed opacity-60'
              }`}
          >
            {topic.name}
            {!topic.active && (
              <div className="text-xs mt-1 font-normal">Coming Soon</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Topic