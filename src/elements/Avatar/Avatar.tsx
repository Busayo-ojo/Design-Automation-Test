import React from 'react';
import type { HTMLAttributes } from 'react';
import './Avatar.css';

export type AvatarType = 'Image' | 'Initials' | 'Icon';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarStatus = 'None' | 'online' | 'offline' | 'verified';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  type?: AvatarType;
  size?: AvatarSize;
  statusIcon?: AvatarStatus;
  isEditable?: boolean;
  imageUrl?: string;
  initials?: string;
  icon?: React.ReactNode;
}

const VerifiedIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="6" fill="#176CB3"/>
    <path d="M3.5 6L5.16667 7.66667L8.5 4.33333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="currentColor"/>
    <path d="M5.30565 18C3.64905 20.6701 9.13273 22 12 22C14.8673 22 20.3509 20.6701 18.6943 18C17.4486 15.9921 14.9288 14 12 14C9.07123 14 6.55143 15.9921 5.30565 18Z" fill="currentColor"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="#667185"/>
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="white"/>
    <path d="M8.00008 7.33333C7.4478 7.33333 7.00008 7.78105 7.00008 8.33333C7.00008 8.88562 7.4478 9.33333 8.00008 9.33333C8.55237 9.33333 9.00008 8.88562 9.00008 8.33333C9.00008 7.78105 8.55237 7.33333 8.00008 7.33333Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.41429 5.16666H8.58587C8.85108 5.16666 9.10544 5.27202 9.29297 5.45956L9.52161 5.68819C9.61737 5.78395 9.73158 5.85927 9.85733 5.90956L10.7048 6.24855C11.0845 6.40042 11.3334 6.76813 11.3334 7.17703V9.83333C11.3334 10.3856 10.8857 10.8333 10.3334 10.8333H5.66675C5.11446 10.8333 4.66675 10.3856 4.66675 9.83333V7.17703C4.66675 6.76813 4.9157 6.40042 5.29536 6.24855L6.14284 5.90956C6.26858 5.85927 6.38279 5.78395 6.47855 5.68819L6.70719 5.45956C6.89472 5.27202 7.14908 5.16666 7.41429 5.16666ZM6.33341 8.33333C6.33341 7.41286 7.07961 6.66666 8.00008 6.66666C8.92056 6.66666 9.66675 7.41286 9.66675 8.33333C9.66675 9.25381 8.92056 10 8.00008 10C7.07961 10 6.33341 9.25381 6.33341 8.33333ZM9.28263 7.06411C9.41627 7.10865 9.52113 7.21351 9.56567 7.34715C9.61101 7.48315 9.80338 7.48315 9.84871 7.34715C9.89326 7.21351 9.99812 7.10865 10.1318 7.06411C10.2678 7.01877 10.2678 6.8264 10.1318 6.78107C9.99812 6.73652 9.89326 6.63166 9.84871 6.49803C9.80338 6.36202 9.61101 6.36202 9.56567 6.49803C9.52113 6.63166 9.41627 6.73652 9.28263 6.78107C9.14663 6.8264 9.14663 7.01877 9.28263 7.06411Z" fill="white"/>
  </svg>
);

export const Avatar: React.FC<AvatarProps> = ({
  type = 'Icon',
  size = 'md',
  statusIcon = 'None',
  isEditable = false,
  imageUrl,
  initials,
  icon,
  className = '',
  ...props
}) => {
  const containerClasses = [
    'qasah-avatar',
    `qasah-avatar--size-${size}`,
    className
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    switch (type) {
      case 'Image':
        return imageUrl ? (
          <img src={imageUrl} alt="Avatar" className="qasah-avatar__image" />
        ) : (
          <div className="qasah-avatar__icon"><UserIcon /></div>
        );
      case 'Initials':
        return (
          <div className="qasah-avatar__initials">
            {initials ? initials.substring(0, 2).toUpperCase() : '??'}
          </div>
        );
      case 'Icon':
      default:
        return <div className="qasah-avatar__icon">{icon || <UserIcon />}</div>;
    }
  };

  const showStatus = statusIcon !== 'None';
  const statusClasses = [
    'qasah-avatar__status',
    `qasah-avatar__status--${statusIcon}`
  ].filter(Boolean).join(' ');

  // Editable mode only for lg, xl, 2xl
  const canBeEditable = ['lg', 'xl', '2xl'].includes(size);

  return (
    <div className={containerClasses} {...props}>
      {renderContent()}
      
      {showStatus && (
        <div className={statusClasses}>
          {statusIcon === 'verified' && <VerifiedIcon />}
        </div>
      )}

      {isEditable && canBeEditable && (
        <div className="qasah-avatar__editable-overlay">
          <CameraIcon />
        </div>
      )}
    </div>
  );
};

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const containerClasses = [
    'qasah-avatar-group',
    `qasah-avatar-group--size-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};
