import Bep20ABI from "../abis/bep20.json";
import { useContract } from "../contracts/useContract";

export const useBep20Contract = (address: string): any | null => {
  return useContract<any>(Bep20ABI, address);
};
