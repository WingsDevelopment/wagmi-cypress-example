import { describe, beforeEach } from "mocha";

describe("Test SUPPLY SPEC", () => {
  const name = "Test";
  const amount = 1;
  const isMaxAmount = false;
  const hasApproval = false;

  // configEnvWithTenderly({});
  beforeEach(() => {
    cy.visit("/");
    localStorage.setItem("demo", String(true));
  });
  it(`Open ${name} supply popup view`, () => {
    cy.wait(3000);
    cy.setAmount(amount, isMaxAmount);
    cy.doConfirm(hasApproval);
  });
});
