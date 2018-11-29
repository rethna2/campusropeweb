/*
 *
 * Home actions
 *
 */

import {
  DEFAULT_ACTION,
  HOME_MOUNTED,
  START_FETCHING_DATA,
  STOP_FETCHING_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function homeMounted() {
  return {
    type: HOME_MOUNTED,
  };
}

export function startFetchingData() {
  return {
    type: START_FETCHING_DATA,
  };
}

export function stopFetchingData() {
  return {
    type: STOP_FETCHING_DATA,
  };
}
