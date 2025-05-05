import React from 'react';
import '../../../shared/styles/appointmentsPage.css';
import CheckIcon from '../../../assets/icons/check.svg'; 

const AppointmentCard = ({ status, name, time }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      {/* Status */}
      <div className="flex items-center mb-2 text-green-600 text-sm font-medium">
        <img src={CheckIcon} alt="Confirmed" className="w-4 h-4 mr-2" />
        {status}
      </div>

      {/* Appointment Name */}
      <div className="text-base font-semibold text-black mb-1">{name}</div>

      {/* Time */}
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  );
};

export default AppointmentCard;
