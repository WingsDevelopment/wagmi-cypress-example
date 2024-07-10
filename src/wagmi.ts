import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [base],
  connectors: [
    // mock({ accounts: ["0x818DB96e1b5c64bBE6307c95473E313c743FF7d0"] }),
    // demoConnector,
    injected(),
  ],
  transports: {
    [base.id]: http(
      "https://rpc.tenderly.co/fork/5e349ab2-6c3a-4e93-bb22-a2a01742485d"
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
