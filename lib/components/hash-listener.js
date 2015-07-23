import React from "react";
import hasher from "hasher";
import flyd from "flyd";
import streamListener from "components/stream-listener";

const size = flyd.stream({width: window})

hasher.init();
const hash = flyd.stream(hasher.getHash());
hasher.changed.add(() => hash(hasher.getHash()));

export default streamListener(hash, "hash");
