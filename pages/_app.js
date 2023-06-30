import Head from "next/head";
import "../styles/global.css";
import { Provider } from "react-redux";
import { store } from "../components/store/createStore";
import { AppProvider } from "../components/ContextData";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppProvider>
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
      </AppProvider>
    </Provider>
  );
}
