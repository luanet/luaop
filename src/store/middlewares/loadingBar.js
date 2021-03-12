import actionsType from 'constants';

const ignoredLoadingActionKeys = [
  'transactions',
];

const loadingBarMiddleware = () => next => (action) => {
  switch (action.type) {
    case actionsType.loadingStarted:
    case actionsType.loadingFinished:
      if (ignoredLoadingActionKeys.indexOf(action.data) === -1) {
        next(action);
      }
      break;
    default:
      next(action);
      break;
  }
};

export default loadingBarMiddleware;
