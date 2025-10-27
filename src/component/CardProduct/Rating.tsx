import React from 'react';

import Image from 'next/image';

interface RatingProps {
  rating?: number;
}
const Rating = ({ rating }: RatingProps) => {
  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: 5 }).map((_, index) =>
        index < (rating || 0) ? (
          <Image key={index} src='/images/starYellow.svg' alt='star' width={20} height={20} />
        ) : (
          <Image key={index} src='/images/starGray.svg' alt='star' width={20} height={20} />
        ),
      )}
    </div>
  );
};

export default Rating;
