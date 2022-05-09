import { Provider } from 'react-redux';
// import { AppProps } from 'next/app';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'store/store';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'constants/theme';
import '../styles/globals.css';

require('../styles/variables.less');

const App = (ctx: any) => {
  const { Component, pageProps } = ctx;

  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });

  return (
    <>
      <Head>
        {/* This ways to add css on global website use local asset folder withhtml link tag */}
        <link href="/fonts/yekan-bakh-regular.ttf" rel="stylesheet" />
        <link href="/fonts/yekan-bakh-bold.ttf" rel="stylesheet" />
        <link href="/fonts/yekan-bakh-light.ttf" rel="stylesheet" />
      </Head>

      <Provider store={store}>
        <ConfigProvider direction="rtl">
          <ThemeProvider theme={defaultTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ConfigProvider>
      </Provider>
    </>
  );
};

export default App;
