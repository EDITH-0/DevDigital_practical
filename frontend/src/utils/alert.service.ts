import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

const alertSubject = new Subject();
const defaultId = "default-alert";

export const alertService = {
  onAlert,
  alert,
  clear,
};

export const AlertType = {
  Success: "Success",
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

export const AlertPosition = {
  LeftTop: "left-top",
  RightTop: "right-top",
};

// enable subscribing to alerts observable

function onAlert(id = defaultId) {
  return alertSubject.asObservable().pipe(filter((x: any) => x && x.id === id));
}

// core alert method

function alert(alertData: any) {
  alertData.id = alertData.id || defaultId;
  alertData.position = alertData.position || "right-top";
  alertData.header = alertData.header || alertData.type;
  alertData.autoClose = alertData.autoClose || true;
  alertData.keepAfterRouteChange = alertData.keepAfterRouteChange || true;
  alertSubject.next(alertData);
}

// clear alerts

function clear(id = defaultId) {
  alertSubject.next({ id });
}
