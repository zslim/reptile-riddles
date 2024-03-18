function generateHashNumber(playerCount, hashLength){
  let hash = `${playerCount}`;
  while (hash.length <hashLength){
    hash = `0${hash}`;
  }
  return `#${hash}`;
}

export {generateHashNumber}