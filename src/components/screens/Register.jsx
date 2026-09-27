import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import '../styles/register.css';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend validation check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      // Note: Map frontend 'phone' state to backend 'phoneNumber' property
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const response = await fetch('https://localhost:7123/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        // Navigate to login page on successful registration
        navigate('/login', { state: { message: resData.message } });
      } else {
        // Display API validation or error message
        setError(resData.message || 'Registration failed. Please try again.');
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
        <button className="back-btn" onClick={() => navigate('/login')} aria-label="Go back" disabled={loading}>
          <ArrowLeft size={18} color="#1e293b" strokeWidth={2.5} />
        </button>

        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up to get started with your new account</p>
        </div>

        {error && (
          <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">FIRST NAME *</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  placeholder="Muhammad"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">LAST NAME *</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  placeholder="Ali"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">EMAIL ADDRESS *</label>
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
            <label className="form-label">PHONE NUMBER (OPTIONAL)</label>
            <div className="input-wrapper">
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="03142123231"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">PASSWORD *</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">CONFIRM PASSWORD *</label>
            <div className="input-wrapper">
              <input
               type={showPassword ? 'text' : 'password'}
               name="confirmPassword"
               className="form-input"
               placeholder="Re-enter password"
               value={formData.confirmPassword}
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
                {showPassword ? <Eye size={18} color="#64748b" /> : <EyeOff size={18} color="#64748b" />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <button type="button" className="link-button" onClick={() => navigate('/login')} disabled={loading}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

























// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
// import '../styles/register.css';

// function Register() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Register submitted:', formData);
    
//     // Navigate to login page after successful registration submission
//     navigate('/login');
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-card">
//         <button className="back-btn" onClick={() => navigate('/login')} aria-label="Go back">
//           <ArrowLeft size={18} color="#1e293b" strokeWidth={2.5} />
//         </button>

//         <div className="auth-header">
//           <h1 className="auth-title">Create Account</h1>
//           <p className="auth-subtitle">Sign up to get started with your new account</p>
//         </div>

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <div className="form-row">
//             <div className="form-group">
//               <label className="form-label">FIRST NAME *</label>
//               <div className="input-wrapper">
                
//                 <input
//                   type="text"
//                   name="firstName"
//                   className="form-input"
//                   placeholder="John"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label className="form-label">LAST NAME *</label>
//               <div className="input-wrapper">
                
//                 <input
//                   type="text"
//                   name="lastName"
//                   className="form-input"
//                   placeholder="Doe"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">EMAIL ADDRESS *</label>
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
//             <label className="form-label">PHONE NUMBER (OPTIONAL)</label>
//             <div className="input-wrapper">
              
//               <input
//                 type="tel"
//                 name="phone"
//                 className="form-input"
//                 placeholder="+1 234 567 8900"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">PASSWORD *</label>
//             <div className="input-wrapper">
              
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 className="form-input"
//                 placeholder="Create password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">CONFIRM PASSWORD *</label>
//             <div className="input-wrapper">
              
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 className="form-input"
//                 placeholder="Re-enter password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 className="toggle-eye"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label="Toggle password visibility"
//               >
//                 {showPassword ? <Eye size={18} color="#64748b" /> : <EyeOff size={18} color="#64748b" />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" className="btn-primary btn-full">CREATE ACCOUNT</button>
//         </form>

//         <div className="auth-footer">
//           Already have an account?{' '}
//           <button type="button" className="link-button" onClick={() => navigate('/login')}>
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;