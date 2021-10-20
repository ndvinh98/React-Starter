import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
// import ENV from '@env';
import ReCAPTCHA from 'react-google-recaptcha';

export interface IRecaptcha {
  name?: string;
  [key: string]: any;
}

const Recaptcha: React.FC<IRecaptcha> = (props) => {
  const {onChange, name, ...other} = props;

  return (
    <UI.Center {...other}>
      <ReCAPTCHA
        // sitekey={ENV().RECAPTCHA_SITE_KEY_V2}
        onChange={(token) => {
          onChange({target: {value: token || undefined, name}});
        }}
      />
    </UI.Center>
  );
};

export default memo(Recaptcha);
