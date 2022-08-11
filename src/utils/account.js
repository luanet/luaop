/* eslint-disable */
import { regex } from '@constants';

/**
 * Returns a shorter version of a given address
 * by replacing characters by ellipsis except for
 * the first and last 3.
 * @param {String} address LSk or BTC address
 * @param {String?} size An option of small and medium
 * @returns {String} Truncated address
 */
export const truncateAddress = (address, size = 'small') => {
  if (!address) return address;
  const reg = size === 'small' ? regex.lskAddressTrunk : regex.btcAddressTrunk;
  return address.replace(reg, '$1...$3');
};

export const getActiveTokenAccount = (state) => state.account;
