import React from 'react';

export interface ShapeBackgroundProps {
  image: string;
  size: number;
  blur: number;
  zIndex: number;
  rotation: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  hideOnSmallScreen?: boolean;
  children?: React.ReactNode;
}

const ShapeBackground: React.FC<ShapeBackgroundProps> = ({
  image,
  size,
  blur,
  zIndex,
  rotation,
  top,
  bottom,
  left,
  right,
  hideOnSmallScreen = false,
  children,
}) => {
  const bgStyles: any = {
    position: 'absolute',
    backgroundImage: `url(${image})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${size}px`,
    height: '100%',
    filter: `blur(${blur}px)`,
    zIndex,
    transform: `rotate(${rotation}deg)`,
    top,
    bottom,
    left,
    right,
  };

  return (
    <div
      style={bgStyles}
      className={`${hideOnSmallScreen ? 'lg:block hidden' : ''}`}
    >
      {children}
    </div>
  );
};

export default ShapeBackground;
