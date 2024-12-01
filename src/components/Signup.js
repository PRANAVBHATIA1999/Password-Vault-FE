import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, reset } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isSuccess && user) {
      alert('Signup Successful!');
      navigate('/login');
    }

    if (isError) {
      alert(message);
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={onSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={onChange}
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
