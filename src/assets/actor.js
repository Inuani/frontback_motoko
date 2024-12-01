import { HttpAgent, Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client"
import { updateBalance } from './cycles-balance.js';  

const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

const idlFactory = ({ IDL }) => {
    return IDL.Service({
        whoAmI: IDL.Func([], [IDL.Principal], ["query"])
    });
};

const createActor = (canisterId, options = {}) => {
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

let actor = createActor(canisterId);
let authClient;

const updatePrincipalDisplay = async (actor, isAuthenticated = false) => {
    const displayElement = document.getElementById('principal-display');
    if (displayElement) {
        try {
            const principal = await actor.whoAmI();
            const principalText = principal.toText();
            displayElement.textContent = `${principalText}`;
        } catch (error) {
            console.error("Error getting principal:", error);
            displayElement.textContent = "Error fetching principal";
        }
    }
};

const updateAuthButton = (isAuthenticated) => {
    const button = document.getElementById('auth-button');
    if (button) {
        button.textContent = isAuthenticated ? 'Sign Out' : 'Sign in';
    }
};

const handleAuthenticated = async (authClient) => {
    const identity = authClient.getIdentity();
    actor = createActor(canisterId, { identity });
    await updatePrincipalDisplay(actor, true);
    updateAuthButton(true);
};

const init = async () => {
    authClient = await AuthClient.create();
    
    if (await authClient.isAuthenticated()) {
        await handleAuthenticated(authClient);
    } else {
        await updatePrincipalDisplay(actor, false);
        updateAuthButton(false);
    }
    await updateBalance();

    // Add click handler for auth button
    document.getElementById('auth-button').addEventListener('click', async () => {
        if (await authClient.isAuthenticated()) {
            // Sign out
            await authClient.logout();
            actor = createActor(canisterId);
            await updatePrincipalDisplay(actor, false);
            updateAuthButton(false);
        } else {
            // Sign in
            await new Promise((resolve, reject) => {
                authClient.login({
                    identityProvider: `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
                    onSuccess: resolve,
                    onError: reject,
                });
            });
            await handleAuthenticated(authClient);
        }
    });
};

init().catch(console.error);