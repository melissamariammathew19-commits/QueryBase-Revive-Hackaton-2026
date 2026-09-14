const topics = [
  { id: 'tenant-rights', name: 'Tenant Rights', active: true },
  { id: 'land-rights', name: 'Land Rights', active: false },
  { id: 'consumer-rights', name: 'Consumer Rights', active: false },
  { id: 'labor-rights', name: 'Labor Rights', active: false },
]

function Topic() {
  // Hardcoded for now — later this comes from the Location screen via Router
  const location = 'California'

  const handleTopicClick = (topic) => {
    if (!topic.active) return
    console.log('Selected topic:', topic.id, 'Location:', location)
    // Later: navigate to Chat screen, passing { location, topic: topic.id }
    alert(`Going to Chat screen with: ${location} — ${topic.name}`)
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>QueryBase</h1>
      <p>Showing topics for <strong>{location}</strong></p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        maxWidth: '500px',
        margin: '30px auto'
      }}>
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            disabled={!topic.active}
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid #ccc',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: topic.active ? 'pointer' : 'not-allowed',
              opacity: topic.active ? 1 : 0.5,
              backgroundColor: topic.active ? '#4f46e5' : '#e5e5e5',
              color: topic.active ? 'white' : '#666',
              position: 'relative'
            }}
          >
            {topic.name}
            {!topic.active && (
              <div style={{ fontSize: '11px', marginTop: '6px' }}>Coming Soon</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Topic