import Rx from "rx";

export default () => {
  const revealCell = new Rx.Subject();
  const flagCell = new Rx.Subject();
  return {revealCell, flagCell};
};
