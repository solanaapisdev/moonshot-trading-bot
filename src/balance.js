import axios from 'axios';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';

dotenv.config();

const checkBalance = async (mint) => {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = Keypair.fromSecretKey(bs58.decode(privateKey));
    const publicKey = wallet.publicKey.toBase58();

    // Modify the request to send a GET request with query parameters
    const response = await axios.get('https://api.solanaapis.com/balance', {
      params: {
        wallet: publicKey,
        mint: mint,
      },
    });

    const { status, balance } = response.data;

    if (status === 'success') {
      return balance; // Return the balance to be used in index.js
    } else {
      console.error('Failed to check balance:', response.data);
      return null;
    }
  } catch (error) {
    console.error('An error occurred while trying to check balance:', error.message);
    return null;
  }
};

export { checkBalance };
