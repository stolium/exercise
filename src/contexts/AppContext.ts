import React from 'react';
import {Book} from "../models/book";
import {Action} from "../reducers/AppReducer";

export type State = {
    books: Map<string, Book>;
}

export const appInitState: State = {
    books: new Map(),
};

export const AppContext = React.createContext<{
    appState: State;
    appDispatch: React.Dispatch<Action>;
}>({appState: appInitState, appDispatch: () => null});
