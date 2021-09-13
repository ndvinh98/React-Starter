import {useState, useEffect} from 'react';
import {useMediaQuery} from '@chakra-ui/react';

interface ISize {
  width: number | undefined;
  height: number | undefined;
}
interface IRange {
  gt?: IBreakPoint;
  lt?: IBreakPoint;
}

type IBreakPoint =
  | 'smallPhone'
  | 'phone'
  | 'tablet'
  | 'desktop'
  | 'largeDesktop';

export const BREAK_POINT = {
  smallPhone: 320,
  phone: 375,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

export const useMedia = () => {
  const [
    isSmallPhone,
    isPhone,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isAllMobile,
    isBase,
  ] = useMediaQuery([
    '(min-width:320px) and (max-width: 375px)',
    '(min-width:376px) and (max-width: 768px)',
    '(min-width:769px) and (max-width: 1024px)',
    '(min-width:1025px)and (max-width: 1440px)',
    '(min-width:1441px)',
    '(min-width:320px) and (max-width: 768px)',
    '(min-width:769px)',
  ]);

  return {
    isSmallPhone,
    isPhone,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isAllMobile,
    isBase,
  };
};
