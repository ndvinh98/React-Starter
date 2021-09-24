import React from 'react';
import {createIcon} from '@chakra-ui/icons';

export interface IIcon {
  sizeBox?: string;
  fillColor?: string;
}

export const PartnerApplicationsIcon = (props: IIcon) => {
  const {sizeBox, fillColor = '#333'} = props;
  const Icon = createIcon({
    defaultProps: {
      width: sizeBox,
      height: sizeBox,
    },
    displayName: 'PartnerApplicationsIcon',
    viewBox: '0 0 21 21',
    path: (
      <path
        d="M15.5 10a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11ZM2 10.999l8.81.001A6.478 6.478 0 0 0 9 15.5c0 1.087.267 2.112.739 3.013-1.05.35-2.208.487-3.239.487-2.722 0-6.335-.956-6.495-4.27L0 14.5v-1.501a2 2 0 0 1 2-2Zm13.5 1.003-.09.008a.5.5 0 0 0-.402.402l-.008.09V15h-2.5l-.09.008a.5.5 0 0 0-.402.402L12 15.5l.008.09a.5.5 0 0 0 .402.402l.09.008H15v2.5l.008.09a.5.5 0 0 0 .402.402l.09.008.09-.008a.5.5 0 0 0 .402-.402L16 18.5V16h2.5l.09-.008a.5.5 0 0 0 .402-.402L19 15.5l-.008-.09a.5.5 0 0 0-.402-.402L18.5 15H16v-2.498l-.008-.09a.5.5 0 0 0-.402-.402l-.09-.008ZM6.5 0a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm9 2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"
        fill={fillColor}
      />
    ),
  });
  return <Icon />;
};

export const UserManagmentIcon = (props: IIcon) => {
  const {sizeBox, fillColor = '#333'} = props;
  const Icon = createIcon({
    defaultProps: {
      width: sizeBox,
      height: sizeBox,
    },
    displayName: 'UserManagmentIcon',
    viewBox: '0 -5 25 25',
    path: (
      <path
        d="M12 6.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V12H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91ZM4 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm1.13 1.1C4.76 8.04 4.39 8 4 8c-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 10.43V12h4.5v-1.61c0-.83.23-1.61.63-2.29ZM20 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 8c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V12H24v-1.57ZM12 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Z"
        fill={fillColor}
      />
    ),
  });
  return <Icon />;
};

export const PartnerManagementIcon = (props: IIcon) => {
  const {sizeBox, fillColor = '#333'} = props;
  const Icon = createIcon({
    defaultProps: {
      width: sizeBox,
      height: sizeBox,
    },
    displayName: 'PartnerManagementIcon',
    viewBox: '0 0 21 21',
    path: (
      <path
        d="M9 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-7.5 9S0 18 0 16.5s1.5-6 9-6 9 4.5 9 6-1.5 1.5-1.5 1.5h-15Zm15-15.75a.75.75 0 0 1 .75-.75h6a.75.75 0 1 1 0 1.5h-6a.75.75 0 0 1-.75-.75ZM17.25 6a.75.75 0 1 0 0 1.5h6a.75.75 0 1 0 0-1.5h-6Zm3 4.5a.75.75 0 1 0 0 1.5h3a.75.75 0 1 0 0-1.5h-3Zm0 4.5a.75.75 0 1 0 0 1.5h3a.75.75 0 1 0 0-1.5h-3Z"
        fill={fillColor}
      />
    ),
  });
  return <Icon />;
};

export const TierManagementIcon = (props: IIcon) => {
  const {sizeBox, fillColor = '#333'} = props;
  const Icon = createIcon({
    defaultProps: {
      width: sizeBox,
      height: sizeBox,
    },
    displayName: 'TierManagementIcon',
    viewBox: '0 0 21 21',
    path: (
      <path
        d="M6 16h4V0H6v16Zm-6 0h4V8H0v8ZM12 5v11h4V5h-4Z"
        fill={fillColor}
      />
    ),
  });
  return <Icon />;
};

export const ContentManagementIcon = (props: IIcon) => {
  const {sizeBox, fillColor = '#333'} = props;
  const Icon = createIcon({
    defaultProps: {
      width: sizeBox,
      height: sizeBox,
    },
    displayName: 'ContentManagementIcon',
    viewBox: '0 0 24 24',
    path: (
      <>
        <rect width="11" height="11" rx="3" fill={fillColor} />
        <rect x="12" width="11" height="11" rx="3" fill={fillColor} />
        <rect y="12" width="11" height="11" rx="3" fill={fillColor} />
        <rect x="12" y="12" width="11" height="11" rx="5.5" fill={fillColor} />
      </>
    ),
  });
  return <Icon />;
};

export const FeedbackFormIcon = (props: IIcon) => {
  const {sizeBox, fillColor = '#333'} = props;
  const Icon = createIcon({
    defaultProps: {
      width: sizeBox,
      height: sizeBox,
    },
    displayName: 'FeedbackFormIcon',
    viewBox: '0 0 21 21',
    path: (
      <path
        d="M18 0H2.01c-1.1 0-2 .9-2 2v18L4 16h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm-7 12H9v-2h2v2Zm0-5c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1s1 .45 1 1v2Z"
        fill={fillColor}
      />
    ),
  });
  return <Icon />;
};

export const SystemSettingsIcon = (props: IIcon) => {
  const {sizeBox, fillColor = '#333'} = props;
  const Icon = createIcon({
    defaultProps: {
      width: sizeBox,
      height: sizeBox,
    },
    displayName: 'FeedbackFormIcon',
    viewBox: '0 0 21 21',
    path: (
      <path
        d="M11.82 20H8.18a1 1 0 0 1-.978-.786l-.407-1.884a8.002 8.002 0 0 1-1.535-.887l-1.837.585a1 1 0 0 1-1.17-.453L.43 13.424a1.006 1.006 0 0 1 .193-1.239l1.425-1.3a8.1 8.1 0 0 1 0-1.772L.622 7.816a1.006 1.006 0 0 1-.193-1.24l1.82-3.153a1 1 0 0 1 1.17-.453l1.837.585c.244-.18.498-.348.76-.5.253-.142.513-.271.78-.386L7.202.787A1 1 0 0 1 8.18 0h3.64a1 1 0 0 1 .976.787l.412 1.883a8.192 8.192 0 0 1 1.535.887l1.838-.585a1 1 0 0 1 1.17.453l1.82 3.153c.231.407.151.922-.194 1.239l-1.425 1.3a8.1 8.1 0 0 1 0 1.772l1.425 1.3c.345.318.425.832.193 1.239l-1.82 3.153a1 1 0 0 1-1.17.453l-1.837-.585a7.985 7.985 0 0 1-1.534.886l-.413 1.879a1 1 0 0 1-.976.786ZM9.994 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
        fill={fillColor}
      />
    ),
  });
  return <Icon />;
};
