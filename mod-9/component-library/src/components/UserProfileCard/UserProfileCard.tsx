// src/components/UserProfileCard/UserProfileCard.tsx
import React from 'react';
import type { UserProfileCardProps } from '../../types';

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  showEmail = true,
  showRole = true,
  onEdit,
  children
}) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full mb-4"
          src={user.avatarUrl}
          alt={`${user.name} avatar`}
        />
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        
        {showEmail && (
          <p className="text-gray-600 mt-2">{user.email}</p>
        )}
        
        {showRole && (
          <p className="text-gray-500 mt-1">{user.role}</p>
        )}
        
        {onEdit && (
          <button
            onClick={() => onEdit(user.id)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default UserProfileCard;