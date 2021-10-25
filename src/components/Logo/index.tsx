import React, {memo} from 'react';
import {Image} from '@chakra-ui/react';
interface ILogo {
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
}

function Logo(props: ILogo) {
  const {width, className, onClick, height = '30px'} = props;
  return (
    <div onClick={onClick} className={`cursor-pointer ${className}`}>
      <Image src="/images/admin-portal-logo.png" w={width} h={height} />
    </div>
  );
}

export default memo(Logo);
