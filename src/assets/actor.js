import { HttpAgent, Actor } from "@dfinity/agent";

const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

const idlFactory = ({ IDL }) => {
  return IDL.Service({
    whoAmI: IDL.Func([], [IDL.Principal], ["query"]),
    get_cycle_balance: IDL.Func([], [IDL.Nat], ["query"])
  });
};

const createActor = (options = {}) => {
  const agent = new HttpAgent({
    host: "http://localhost:4943",
    ...options
  });
  // only fetch root key in local dev
  agent.fetchRootKey().catch(console.error);
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};

export const actor = createActor();
export const updateActorIdentity = (identity) => {
  return createActor({ identity });
};