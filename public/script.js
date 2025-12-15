import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";

window.addEventListener("load", async () => {
  const isMini = await sdk.isInMiniApp();
  await sdk.actions.ready();
});
