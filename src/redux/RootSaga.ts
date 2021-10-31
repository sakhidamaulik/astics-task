import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { WatchProductsDashboardSagas } from "./ProductsDashboard.Sagas";

export default function* rootSaga(): SagaIterator {
  yield all([fork(WatchProductsDashboardSagas)]);
}
