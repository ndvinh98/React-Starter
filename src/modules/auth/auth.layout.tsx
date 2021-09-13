import React from 'react';

function AuthLayout({children}: any) {
  return (
    <div>
      <div>This is header</div>
      <div>{children}</div>
    </div>
  );
}

export default AuthLayout;
