// eslint-disable-next-line @typescript-eslint/no-var-requires
const hre = require('hardhat');

async function main() {
  const Token = await hre.ethers.deployContract('GLDToken');
  const token = await Token.waitForDeployment();
  const address = await token.getAddress();

  // Get address
  console.log('GLDToken deployed to:', address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
