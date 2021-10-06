import React from "react";
import "../styles/globals.css";

export const AppContext = React.createContext(null);

function AppProvider(props) {
  const [app, setApp] = React.useState();
  const value = [app, setApp];
  return <AppContext.Provider value={value} {...props} />;
}

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />;
    </AppProvider>
  );
}

export default MyApp;
