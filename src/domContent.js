function cacheDOM() {
  const player1Board = document.getElementById("player1");
  const player2Board = document.getElementById("player2");
  const player1ShipsRemainingTxt = document.getElementById("player1-ships");
  const player2ShipsRemainingTxt = document.getElementById("player2-ships");
  const resetBtn = document.getElementById("reset-btn");
  const turnTxt = document.getElementById("turn");

  return {
    player1Board,
    player2Board,
    player1ShipsRemainingTxt,
    player2ShipsRemainingTxt,
    resetBtn,
    turnTxt,
  };
}

export { cacheDOM };
