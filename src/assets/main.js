import { AuthClient } from "@dfinity/auth-client";
import { actor, updateActorIdentity } from './actor.js';
import { updateBalance } from './cycles-balance.js';

let currentActor = actor;
let authClient;

const updatePrincipalDisplay = async (isAuthenticated = false) => {
  const displayElement = document.getElementById('principal-display');
  if (displayElement) {
    try {
      const principal = await currentActor.whoAmI();
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
  currentActor = updateActorIdentity(identity);
  await updatePrincipalDisplay(true);
  updateAuthButton(true);
};

const init = async () => {
    authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      await handleAuthenticated(authClient);
    } else {
      await updatePrincipalDisplay(false);
      updateAuthButton(false);
    }
    await updateBalance();
  
    // Add click handler for auth button
    document.getElementById('auth-button').addEventListener('click', async () => {
      if (await authClient.isAuthenticated()) {
        // Sign out
        await authClient.logout();
        currentActor = actor;  // Reset to default actor
        await updatePrincipalDisplay(false);
        updateAuthButton(false);
      } else {
        // Sign in
        try {
          await new Promise((resolve, reject) => {
            authClient.login({
              identityProvider: process.env.DFX_NETWORK === "ic" 
                ? "https://identity.ic0.app"
                : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
              onSuccess: resolve,
              onError: (error) => {
                console.log("Login error:", error);
                reject(error);
              },
              windowOpenerFeatures: `
                width=400,
                height=500,
                left=${window.screen.width / 2 - 200},
                top=${window.screen.height / 2 - 250},
                toolbar=0,
                location=0,
                menubar=0,
                status=0
              `.replace(/\s/g, ''),
            });
          }).catch((error) => {
            // Handle user cancellation or other authentication errors
            if (error?.message === "UserInterrupt") {
              return; 
            }
            // Log other errors but don't throw
            console.warn("Authentication error:", error);
          });
  
          // Only proceed with authentication if we have a valid authClient state
          if (await authClient.isAuthenticated()) {
            await handleAuthenticated(authClient);
          }
        } catch (error) {
          updateAuthButton(false);
        }
      }
    });
  };

init().catch(console.error);