import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import '../styles/login.css'; // Correct relative path to CSS

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://localhost:7123/api/auth/login', { // Replace with your actual backend URL/port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        // Save auth data
        localStorage.setItem('token', resData.data.token);
        localStorage.setItem('user', JSON.stringify(resData.data));

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        // Display backend error message
        setError(resData.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to your account</p>
        </div>

        {error && (
          <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                disabled={loading}
              >
                {showPassword ? <Eye size={18} color="#94a3b8" /> : <EyeOff size={18} color="#94a3b8" />}
              </button>
            </div>
          </div>

          <a href="#forgot" className="forgot-link">Forgot Password?</a>

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <button type="button" className="link-button" onClick={() => navigate('/register')}>
            Register now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;



































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import '../styles/login.css'; // Correct relative path to CSS

// function Login() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//  const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login submitted:', formData);
//     navigate('/dashboard');
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-card">
        
//         <div className="auth-header">
//           <h1 className="auth-title">Welcome Back</h1>
//           <p className="auth-subtitle">Sign in to continue to your account</p>
//         </div>

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className="form-label">Email Address</label>
//             <div className="input-wrapper">
              
//               <input
//                 type="email"
//                 name="email"
//                 className="form-input"
//                 placeholder="name@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">Password</label>
//             <div className="input-wrapper">
              
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 className="form-input"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 className="toggle-eye"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label="Toggle password visibility"
//               >
//                 {showPassword ? <Eye size={18} color="#94a3b8" /> : <EyeOff size={18} color="#94a3b8" />}
//               </button>
//             </div>
//           </div>

//           <a href="#forgot" className="forgot-link">Forgot Password?</a>

//           <button type="submit" className="btn-primary btn-full">Log In</button>
//         </form>

//         <div className="auth-footer">
//           Don't have an account?{' '}
//           <button type="button" className="link-button" onClick={() => navigate('/register')}>
//             Register now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;