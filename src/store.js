import * as skewTAct from "./actions/skewt";
import * as soundingAct from "./actions/sounding";

import { applyMiddleware, compose, createStore } from "redux";

import { rootReducer } from "./reducers/sounding";
import thunk from "redux-thunk";

import {$} from '@windy/utils';
import windyStore from '@windy/store';

let store;

export function getStore(container) {
  if (store) {
    return store;
  }

  const middlewares = [thunk];
  const composeEnhancers =
    (process.env.NODE_ENV == "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) ||
    compose;
    // todo: check deprecated
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

  const graphWith = container.clientWidth - 10;
  const graphHeight = Math.min(graphWith, window.innerHeight * 0.7);
  store.dispatch(soundingAct.setWidth(graphWith));
  store.dispatch(soundingAct.setHeight(graphHeight));

  updateMetrics(store);

  store.dispatch(skewTAct.setPMin(400));

  return store;
}

export function updateMetrics() {
  if (store) {
    store.dispatch(soundingAct.setMetricTemp(windyStore.get("metric_temp")));
    store.dispatch(soundingAct.setMetricAltitude(windyStore.get("metric_altitude")));
    store.dispatch(soundingAct.setMetricSpeed(windyStore.get("metric_wind")));
  }
}
