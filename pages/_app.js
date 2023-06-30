import React, { useEffect } from "react";
import Head from "next/head";
import "../styles/global.css";
import { Provider } from "react-redux";
import { store } from "../components/store/createStore";
import { AppProvider } from "../components/ContextData";
import { ThemeProvider } from "@material-ui/core/styles";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <AppProvider>
        <ThemeProvider>
          <div>
            <Head>
              <meta charset="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </AppProvider>
    </Provider>
  );
}
