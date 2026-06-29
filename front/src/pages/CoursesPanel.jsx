import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS } from "../config"

export default function CoursesPanel() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await fetch(API_ENDPOINTS.getCourses || `${API_ENDPOINTS.login.split('/api')[0]}/api/courses`)

            if (!response.ok) {
                throw new Error(`Failed to fetch courses: ${response.status}`)
            }

            const data = await response.json()
            setCourses(data || [])
        } catch (err) {
            setError(err.message)
            console.error('Fetch courses error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <header>
                <h1>Courses</h1>
                <Link to='/'><button>Home</button></Link>
            </header>
            <main>
                {loading && <p>Loading courses...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {!loading && courses.length === 0 && (
                    <p>No courses available. Create one or join an existing course.</p>
                )}

                {!loading && courses.length > 0 && (
                    <div>
                        <h2>Available Courses</h2>
                        <ul>
                            {courses.map(course => (
                                <li key={course.id}>
                                    <h3>{course.name}</h3>
                                    <p>Owner ID: {course.ownerId}</p>
                                    <Link to={`/blog?courseId=${course.id}`}>
                                        <button>View Homeworks</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    )
}
