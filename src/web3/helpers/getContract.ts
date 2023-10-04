import { BaseContract, Contract, ContractInterface } from "ethers";
import { Signer } from "@ethersproject/abstract-signer";

export const getContract = <T extends BaseContract>(
  abi: ContractInterface,
  address: string,
  signer?: Signer
): T => {
  return new Contract(address, abi, signer) as T;
};
