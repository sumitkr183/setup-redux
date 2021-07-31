import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify((state));
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e)
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

// store is created
const store = createStore(rootReducers,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
);

// save state every time when store values changes.
store.subscribe(()=>saveToLocalStorage(store.getState()));
export default store;
