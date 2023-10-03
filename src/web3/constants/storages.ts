export const CONNECTOR_KEY = 'Wallet';

export const getStorageWallet = () => {
  return localStorage.getItem(CONNECTOR_KEY);
};
