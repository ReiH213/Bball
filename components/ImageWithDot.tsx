import React, { useState } from 'react';
import Image from 'next/image';

type DotPosition = {
  x: number;
  y: number;
} | null;

const ImageWithDot: React.FC = () => {
  const [dotPosition, setDotPosition] = useState<DotPosition>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDotPosition({ x, y });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} onClick={handleImageClick}>
      <Image
        src={"court.jpg"}
        alt="Click to place dot"
        layout="intrinsic" // Dynamically sized based on the imported image
        width={800} // Set appropriate width for the image
        height={600} // Set appropriate height for the image
        style={{ cursor: 'pointer' }}
      />
      {dotPosition && (
        <div
          style={{
            position: 'absolute',
            top: dotPosition.y,
            left: dotPosition.x,
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      )}
    </div>
  );
};

export default ImageWithDot;
