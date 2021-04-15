import React, {useReducer} from 'react';
import './styles/App.scss';
import BookSearch from './book-search/BookSearch';
import FavoritesList from "./favorites-list/FavoritesList";
import AppReducer from "./reducers/AppReducer";
import {AppContext, appInitState} from "./contexts/AppContext";

function App() {
    const [appState, appDispatch] = useReducer(AppReducer, appInitState);

  return (
      <div>
        <header className="header">
          <div className="header--content">
            <h1>My Good Reads</h1>
          </div>
        </header>
        <main>
            <AppContext.Provider value={{ appState, appDispatch }}>
              <BookSearch/>
              <FavoritesList/>
            </AppContext.Provider>
        </main>

      </div>
  );
}

export default App;
