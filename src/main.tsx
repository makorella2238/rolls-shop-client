import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./components/Redux/redux-store.ts";
import './index.css';
import AppContainer from "./components/AppContainer.tsx";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
        </QueryClientProvider>
    </BrowserRouter>,
);