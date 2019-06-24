function sleep(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}

describe("NearPlace", function() {
  let contract;
  let accountId;

  // Contains all the steps that are necessary to
  //    establish a connection with a dev instance
  //    of the blockchain.
  beforeAll(async function() {
      const config = await nearlib.dev.getConfig();
      near = await nearlib.dev.connect();
      accountId = nearlib.dev.myAccountId;
      const url = new URL(window.location.href);
      config.contractName = url.searchParams.get("contractName");
      console.log("nearConfig", config);
      await sleep(1000);
      contract = await near.loadContract(config.contractName, {
        // NOTE: This configuration only needed while NEAR is still in development
        viewMethods: ["getMap"],
        changeMethods: ["setCoords"],
        sender: accountId
      });
  });

  describe("getMap", function() {
    it("can get the board state", async function() {
      const viewResult = await contract.getMap({});
      expect(viewResult.length).toBe(100); // board is 10 by 10
    });
  });

  describe("setCoords", function() {
    it("modifies the board state", async function() {
      const setResult = await contract.setCoords({
        coords: "0,0",
        value: "111111"});
      console.log(setResult);
      const viewResult = await contract.getMap({});
      expect(viewResult.length).toBe(100); // board is 10 by 10
      // entry 0,0 should be 111111!
      expect(viewResult[0]).toBe("111111")
    });
  });
});