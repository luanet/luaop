import { actionTypes, ROUND_LENGTH } from '@constants';
import { getBlocks } from '@api/block';
import { getForgers } from '@api/delegate';

/**
 * Retrieves the latest blocks on the blockchain
 * The block info will be used to calculate delegate
 * forging time and status.
 *
 * @returns {Promise}
 */
export const latestBlocksRetrieved = () => async (dispatch, getState) => {
  const blocksFetchLimit = 100;
  const { network } = getState();

  const blocks = await getBlocks({ network, params: { limit: blocksFetchLimit } });

  return dispatch({
    type: actionTypes.latestBlocksRetrieved,
    data: {
      list: blocks.data,
      total: blocks.meta.total,
    },
  });
};

/**
 * Fire this action after network is set.
 * It retrieves the list of forgers in the current
 * round and determines their status as forging, missedBlock
 * and awaitingSlot.
 */
export const forgersRetrieved = () => async (dispatch, getState) => {
  const { network, blocks: { latestBlocks } } = getState();
  const forgedBlocksInRound = latestBlocks[0].height % ROUND_LENGTH;
  const remainingBlocksInRound = ROUND_LENGTH - forgedBlocksInRound;
  const { data } = await getForgers({
    network,
    params: { limit: ROUND_LENGTH },
  });
  let forgers = [];
  const indexBook = {};

  // Get the list of usernames that already forged in this round
  const haveForgedInRound = latestBlocks
    .filter((b, i) => forgedBlocksInRound >= i)
    .map(b => b.generatorUsername);

  // check previous blocks and define missed blocks
  if (data) {
    forgers = data.map((forger, index) => {
      indexBook[forger.address] = index;
      if (haveForgedInRound.indexOf(forger.username) > -1) {
        return { ...forger, state: 'forging' };
      }
      if (index < remainingBlocksInRound) {
        return { ...forger, state: 'awaitingSlot' };
      }
      return { ...forger, state: 'missedBlock' };
    });
  }

  dispatch({
    type: actionTypes.forgersRetrieved,
    data: {
      forgers,
      indexBook,
    },
  });
};
