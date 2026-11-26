export default function Welcome({ onStart }) {
  return (
    <div className="welcome">
      <div className="welcome-box">
        <div className="welcome-icon">⚡</div>
        <h1>Welcome EV Tunisia</h1>
        <p>Trouvez facilement les bornes de recharge pour voitures électriques en Tunisie.</p>
        <button className="start-btn" onClick={onStart}>
          Commencer
        </button>
      </div>
    </div>
  );
}