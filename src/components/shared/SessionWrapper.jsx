import { SessionProvider } from 'next-auth/react';

const SessionWrapper = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default SessionWrapper;
