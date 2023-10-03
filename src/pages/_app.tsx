import Layout from "@/components/Layout/Layout";
import { wrapper } from "@/redux/store";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { FC, ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CLIENT_ID } from "@/commons/constants";
import Head from "next/head";
import type { NextPage } from "next";
import { Web3ReactProvider } from "@web3-react/core";
import { appConnectors } from "@/web3/connectors";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App: FC<AppProps> = ({ Component, ...rest }: AppPropsWithLayout) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const persistor = persistStore(store);
  const { pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Web3ReactProvider connectors={appConnectors}>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <PersistGate persistor={persistor}>
            {() => <Layout>{getLayout(<Component {...pageProps} />)}</Layout>}
          </PersistGate>
        </GoogleOAuthProvider>
      </Provider>
    </Web3ReactProvider>
  );
};

export default App;
