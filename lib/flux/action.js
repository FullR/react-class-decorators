import Rx from "rx";

export default function action(name=null) {
  const stream = new Rx.Subject();
  function emitAction(payload) {
    stream.onNext(payload);
  }
  emitAction.actionName = name;
  emitAction.stream = stream.asObservable();
  return emitAction;
};

action.many = (...keys) => {
  return keys.reduce((actionObj, key) => {
    actionObj[key] = action(key);
    return actionObj;
  }, {});
};
