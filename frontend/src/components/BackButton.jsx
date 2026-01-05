import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ label = 'Back to Dashboard', to = '/principal/dashboard', className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4 font-medium px-2 py-1 rounded hover:bg-gray-100 ${className}`}
    >
      <FaArrowLeft />
      {label}
    </button>
  );
};

export default BackButton;
