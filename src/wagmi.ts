import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { mock } from "wagmi/connectors";
import { demoConnector } from "./demoConnector/demoConnector";

export const config = createConfig({
  chains: [base],
  connectors: [
    // mock({ accounts: ["0x33EB4dEa4931e5d607531Fb08Bd393944aA01Faa"] }),
    demoConnector,
  ],
  transports: {
    [base.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
