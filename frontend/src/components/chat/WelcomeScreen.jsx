import '../../styles/WelcomeScreen.css';

const WelcomeScreen = () => {
  return (
    <div className="welcome-container">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">¿En qué estás trabajando?</h2>
      </div>
      <div className="arrow-group">
        <span className="arrow">↓</span>
        <span className="arrow arrow2">↓</span>
        <span className="arrow arrow3">↓</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;