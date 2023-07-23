import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Simulate API call to verify the email
const mockEmailVerification = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com') {
        resolve({ success: true });
      } else {
        reject({ message: 'Email not found in the database' });
      }
    }, 1000);
  });
};

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError('');
    setIsSubmitting(true);

    try {
      const response = await mockEmailVerification(email);

      if (response.success) {
        setIsEmailSent(true);
      } else {
        setError('Email not found in the database');
      }
    } catch (error) {
      setError('Error occurred while processing the request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Forgot Password</h4>
              {isEmailSent ? (
                <div className="alert alert-success" role="alert">
                  Reset link has been sent to your email.
                </div>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
