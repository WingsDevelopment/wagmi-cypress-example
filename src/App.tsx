import { erc20Abi, parseEther } from "viem";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import { lendingPoolAddress, usdcTokenAddress } from "./contants";
import { useEffect } from "react";
// import { demoConnector } from "./demoConnector/demoConnector";
import { demoConnector } from "./demoConnector/demoConnector";
import { mock } from "wagmi/connectors";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    connect({
      // connector: mock({
      //   accounts: ["0x33EB4dEa4931e5d607531Fb08Bd393944aA01Faa"],
      // }),
      connector: demoConnector,
    });
  }, []);

  const { writeContractAsync } = useWriteContract();

  const approveAsync = async () => {
    const tx = await writeContractAsync({
      address: usdcTokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [lendingPoolAddress, parseEther("1")],
    });
    console.log({ tx });
  };

  return (
    <>
      <div data-cy="Form">
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        <div>
          <input type="text" />
          <button
            type="button"
            data-cy="approvalButton"
            onClick={() => approveAsync()}
          >
            Approve test
          </button>
          <button type="button" data-cy="actionButton" disabled>
            Enter amount
          </button>
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default App;
