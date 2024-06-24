import { ImgIcon } from '@/constants';
import React from 'react';

interface Props {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<Props> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative flex items-center justify-center w-36 h-36">
        <div className="absolute w-full h-full border-4 border-card border-t-primary rounded-full animate-spin"></div>
        <img src={ImgIcon.Logo} alt="" className="absolute w-1/2 h-1/2 animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingSpinner;