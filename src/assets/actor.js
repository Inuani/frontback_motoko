const { HttpAgent, Actor } = require("@dfinity/agent");
// Canister ID (replace with your actual canister ID)
const canisterId = "bw4dl-smaaa-aaaaa-qaacq-cai";

// IDL (Interface Description Language) for the canister
const idlFactory = ({ IDL }) => {
  return IDL.Service({
    greet: IDL.Func([IDL.Text], [IDL.Text], []),
    whoAmI: IDL.Func([], [IDL.Principal], ["query"]),
  });
};

// Create an actor
const createActor = (canisterId) => {
  const agent = new HttpAgent();
  return Actor.createActor(idlFactory, { agent, canisterId });
};

// Interact with the actor and update the DOM
(async () => {
  try {
    const actor = createActor(canisterId);


    // Example: Call the `whoAmI` method and update the DOM
    const principal = await actor.whoAmI();
    const rawBalance = document.getElementById("raw-balance");
    rawBalance.innerText = `Your Principal: ${principal.toText()}`;
  } catch (err) {
    console.error("Error interacting with the actor:", err);
  }
})();
