import { Provider } from "react-redux";
import { SWRConfig } from "swr";

import { store } from "./store/store";
import { fetchConToken } from "./helpers/fetch";
import { AppRouter } from "./router/AppRouter";

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
