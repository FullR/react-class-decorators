import Rx from "rx";

export const revealCell = new Rx.Subject();
export const flagCell = new Rx.Subject();

export default {revealCell, flagCell};
