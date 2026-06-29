import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS } from "../config"

export default function Register() {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setError('')
            setSuccess(false)
            setLoading(true)

            const response = await fetch(API_ENDPOINTS.register, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastname, email, password })
            })

            if (!response.ok) {
                throw new Error(`Registration failed: ${response.status}`)
            }

            const data = await response.json()
            setSuccess(true)
            setName('')
            setLastname('')
            setEmail('')
            setPassword('')

            setTimeout(() => window.location.href = '/login', 2000)
        } catch (err) {
            setError(err.message || 'Registration failed')
            console.error('Registration error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <header>
                <h1>Register</h1>
                <Link to='/'><button>Back to Home</button></Link>
            </header>
            <main>
                {success && <p style={{ color: 'green' }}>Registration successful! Redirecting...</p>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='John'
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            id="lastname"
                            type='text'
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder='Doe'
                            required
                            disabled={loading}
                        />
                    </div>

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
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>

                    <p>
                        Already have an account? <Link to='/login'>Login here</Link>
                    </p>
                </form>
            </main>
        </div>
    )
}
