const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair();

const pubKey = new PublicKey(wallet._keypair.publicKey);
const secKey = wallet._keypair.secretKey;

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(pubKey);
    console.log("Wallet balance is: ", walletBalance);
  } catch (error) {
    console.error(error);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAidropSignature = await connection.requestAirdrop(
      pubKey,
      2 * LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(fromAidropSignature);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
})();
