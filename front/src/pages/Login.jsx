import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS } from "../config"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setError('')
            setLoading(true)

            const response = await fetch(API_ENDPOINTS.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                throw new Error(`Login failed: ${response.status}`)
            }

            const data = await response.json()
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token || '')

            // Redirect to courses or dashboard
            window.location.href = '/courses'
        } catch (err) {
            setError(err.message || 'Login failed')
            console.error('Login error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <header>
                <h1>Login</h1>
                <Link to='/'><button>Back to Home</button></Link>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='your@email.com'
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            required
                            disabled={loading}
                        />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div>
                        <button type='submit' disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>

                    <p>
                        Don't have an account? <Link to='/register'>Register here</Link>
                    </p>
                </form>
            </main>
        </div>
    )
}
