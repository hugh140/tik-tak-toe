export function Button({ symbol, onClick, index, disabled }) {
  function handleClick() {
    if (!disabled()) onClick(index);
    console.log(disabled())
  }

  return (
    <div className="matrix-button flex-center" onClick={handleClick}>
      {symbol}
    </div>
  );
}
export function TurnIndicator({ symbol, flash, winner }) {
  let classes = "flex-center turn-indicator";
  if (flash) classes += " turn-indicator-active";
  if (winner) classes += " turn-winner";

  return (
    <div className="container-turn flex-center">
      <div className={classes}>{symbol}</div>
    </div>
  );
}
export function ResetButton({ click }) {
  return (
    <>
      <br />
      <button className="reset-button" onClick={click}>
        Volver a jugar
      </button>
    </>
  );
}
