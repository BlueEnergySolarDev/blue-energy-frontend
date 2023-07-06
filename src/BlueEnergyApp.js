import React from "react";
import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";
import { fetchConToken } from "./helpers/fetch";
import { SWRConfig } from "swr";

const fetcher = (url) => fetchConToken(url);

export const BlueEnergyApp = () => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </SWRConfig>
  );
};
