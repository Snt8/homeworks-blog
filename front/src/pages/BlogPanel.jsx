import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { API_ENDPOINTS } from "../config"

export default function BlogPanel() {
    const [searchParams] = useSearchParams()
    const courseId = searchParams.get('courseId')

    const [homeworks, setHomeworks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (courseId) {
            fetchHomeworks()
        }
    }, [courseId])

    const fetchHomeworks = async () => {
        try {
            setLoading(true)
            setError('')

            const url = `${API_ENDPOINTS.getCourseHomeworks}`.replace('{courseId}', courseId)
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Failed to fetch homeworks: ${response.status}`)
            }

            const data = await response.json()
            setHomeworks(data || [])
        } catch (err) {
            setError(err.message)
            console.error('Fetch homeworks error:', err)
        } finally {
            setLoading(false)
        }
    }

    if (!courseId) {
        return (
            <div>
                <header>
                    <h1>Blog</h1>
                    <Link to='/courses'><button>Back to Courses</button></Link>
                </header>
                <main>
                    <p>No course selected. Please select a course first.</p>
                </main>
            </div>
        )
    }

    return (
        <div>
            <header>
                <h1>Course Blog - Homeworks</h1>
                <div>
                    <Link to='/courses'><button>Back to Courses</button></Link>
                </div>
            </header>
            <main>
                {loading && <p>Loading homeworks...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {!loading && homeworks.length === 0 && (
                    <p>No homeworks in this course yet.</p>
                )}

                {!loading && homeworks.length > 0 && (
                    <div>
                        <h2>Homeworks</h2>
                        <ul>
                            {homeworks.map(homework => (
                                <li key={homework.id}>
                                    <h3>{homework.subject}</h3>
                                    <p>{homework.description}</p>
                                    <p>Due: {new Date(homework.dueDate).toLocaleDateString()}</p>
                                    <Link to={`/homework/${homework.id}`}>
                                        <button>View Comments</button>
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
