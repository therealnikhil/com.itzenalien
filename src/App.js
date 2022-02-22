import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import Home from './screens/Home';
import './App.scss';
import { SectionNames } from './content';

export const GlobalState = createContext();
export const GlobalActions = createContext();

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return { ...state, currentPage: action.payload };
    case 'CHANGE_VIEW':
      return { ...state, lightMode: action.payload };
    default:
      return state;
  }
};

function App() {
  const getDynamicAppearance = () => {
    const currentHour = (new Date()).getHours();
    if (currentHour < 5 || currentHour > 19) return true;
    return false;
  };
  
  const [globalState, globalDispatch] = useReducer(globalReducer, {
    currentPage: null, // name of currently open section, null=no section open
    lightMode: getDynamicAppearance() // true=light, false=dark, null=auto
  });

  useEffect(getDynamicAppearance);

  useEffect(() => {
    console.log(globalState);
  }, [globalState]);

  const globalActions = useMemo(() => ({
    onClickSection: (title) => {
      if (title === SectionNames.left || title === SectionNames.right) {
        if (globalState.currentPage === title) {
          globalDispatch({ type: 'CHANGE_PAGE', payload: null });
        } else {
          globalDispatch({ type: 'CHANGE_PAGE', payload: title });
        }
      }
    },

    updateViewMode: (lightOrDark) => {
      if (lightOrDark === null || lightOrDark === true || lightOrDark === false) {
        globalDispatch({ type: 'CHANGE_VIEW', payload: lightOrDark })
      }
    }
  }), [globalState]);
  
  return (
    <div className="App">
      <GlobalActions.Provider value={globalActions}>
        <GlobalState.Provider value={globalState}>
          <Home />
        </GlobalState.Provider>
      </GlobalActions.Provider>
    </div>
  );
}

export default App;
