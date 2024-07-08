import React from "react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducers from "./src/redux/reducers";
import Route from "./src/navigation/main";
import { QueryClient, QueryClientProvider } from "react-query";
const store = createStore(rootReducers, applyMiddleware(thunk));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      staleTime: Infinity,
    },
  },
});
export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>
    </Provider>
  );
}