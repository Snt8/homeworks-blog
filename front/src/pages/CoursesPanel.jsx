import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS } from "../config"

export default function CoursesPanel() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [courseCreation, setCourseCreation] = useState(false)
    const [courseName, setCourseName] = useState('')

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await fetch(API_ENDPOINTS.getCourses)

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

    const createCourse = async (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'))
        const ownerId = user.id
        try {
            const response = await fetch(API_ENDPOINTS.createCourse, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: courseName, ownerId })
            })

            if (!response.ok) {
                throw new Error(`Course creation failed: ${response.status}`)
            }

            const data = await response.json()
            setCourses(prev => [...prev, data])
            setCourseName('')
            setCourseCreation(false)
        } catch (err) {
            setError(err.message || 'Course creation failed')
            console.error('Create course error:', err)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-700 shadow-md">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400">Courses</h1>
                    <Link to='/'>
                        <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition duration-200 text-xs sm:text-sm">
                            Home
                        </button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div>
                    <button onClick={() => setCourseCreation(true)}>Create Course</button>
                </div>

                {courseCreation && (
                    <div>
                        <form onSubmit={createCourse}>
                            <div>
                                <label>Course name</label>
                                <input
                                    type='text'
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    placeholder='Course Name'
                                    required
                                />
                            </div>
                            <button type='submit'>Create</button>
                        </form>
                    </div>
                )}

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-slate-400">Loading courses...</p>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg mb-6">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {!loading && courses.length === 0 && (
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
                        <p className="text-slate-400">No courses available. Create one or join an existing course.</p>
                    </div>
                )}

                {!loading && courses.length > 0 && (
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-8">Available Courses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map(course => (
                                <div
                                    key={course.id}
                                    className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition duration-300 hover:shadow-lg hover:shadow-indigo-500/10 flex flex-col"
                                >
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-3">{course.name}</h3>
                                    <p className="text-slate-400 text-sm mb-6 flex-1">Owner ID: <span className="text-indigo-400">{course.ownerId}</span></p>
                                    <Link to={`/blog?courseId=${course.id}`}>
                                        <button className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-indigo-500/50 text-sm">
                                            View Homeworks
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
