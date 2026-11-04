import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome">
      <div className="welcome-content">
        <motion.img
          src="/logo.png"
          alt="Darajo Sports"
          className="welcome-logo"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        />

        <motion.h1
          className="welcome-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          DARAJO <span>SPORTS</span>
        </motion.h1>

        <motion.p
          className="welcome-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Wear Your Game 🏆
        </motion.p>

        <motion.div
          className="welcome-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <div className="loader-bar">
            <motion.div
              className="loader-fill"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: 1.5 }}
            />
          </div>
          <p className="loader-text">Loading...</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Welcome;