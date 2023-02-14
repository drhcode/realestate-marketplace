import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const handleChange = (e) => setEmail(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success('Reset link email sent successfully')
        } catch (error) {
            toast.error('Reset link email failed to sent')
        }
    }

    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Forgot Password</p>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="emailInput"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <div className="signInBar">
                        <div className="signInText">Send reset link</div>
                        <button className="signInButton">
                            <ArrowRightIcon
                                fill="#ffffff"
                                width="34px"
                                height="34px"
                            />
                        </button>
                    </div>
                </form>

                <Link className="registerLink" to="/sign-in">
                    Sign In Instead
                </Link>
            </main>
        </div>
    )
}

export default ForgotPassword
