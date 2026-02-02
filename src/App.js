import React, { useState } from 'react';
import FlashCard from './component/FlashCard/FlashCard';
import SettingsMenu from './component/SettingsMenu/SettingsMenu';
import koreanVocabulary from './koreanVocabulary';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [cardCount, setCardCount] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyWords, setStudyWords] = useState([]);
  const [isStudying, setIsStudying] = useState(false);
  const [showSettings, setShowSettings] = useState(true); // Sidebar open by default

  const startStudy = () => {
    const levelWords = koreanVocabulary[`level${selectedLevel}`];
    const selectedWords = levelWords.slice(0, cardCount);
    
    setStudyWords(selectedWords);
    setCurrentCardIndex(0);
    setIsStudying(true);
  };

  const handleNextCard = () => {
    if (currentCardIndex < studyWords.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      alert('Great job! You completed all cards! 🎉');
      setIsStudying(false);
    }
  };

  const resetStudy = () => {
    setIsStudying(false);
    setSelectedLevel(null);
    setCardCount(null);
    setStudyWords([]);
    setCurrentCardIndex(0);
    setShowSettings(true); // Show settings when going back
  };

  const settingsState = {
    selectedLevel,
    setSelectedLevel,
    cardCount,
    setCardCount,
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <SettingsMenu 
        settings={settingsState}
        onStartStudy={startStudy}
        show={showSettings}
        onHide={() => setShowSettings(false)}
      />

      {/* Main Content */}
      <div className="container py-5">
        {/* Header with Settings Button */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <button
            className="btn settings-btn position-absolute start-0 ms-3"
            onClick={() => setShowSettings(!showSettings)}
            style={{ top: '2rem', fontSize: '1.5rem', padding: '0.5rem 1rem' }}
            aria-label={showSettings ? 'Close menu' : 'Open menu'}
          >
            {showSettings ? (
              <>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faBars} /> Menu
              </>
            )}
          </button>
          <div className="text-center flex-grow-1">
            <h1 className="display-3 fw-bold mb-3 app-title">Klick Click</h1>
            <p className="lead app-subtitle">Learn Korean Vocabulary</p>
          </div>
        </div>

        {/* Study View */}
        {isStudying ? (
          <>
            <div className="d-flex justify-content-end mb-4">
              <button className="btn back-btn" onClick={resetStudy}>
                ← Back to Menu
              </button>
            </div>
            <div className="progress mb-4" style={{ height: '25px' }}>
              <div 
                className="progress-bar bg-success" 
                style={{ width: `${((currentCardIndex + 1) / studyWords.length) * 100}%` }}
              >
                {currentCardIndex + 1} / {studyWords.length}
              </div>
            </div>
            <FlashCard 
              word={studyWords[currentCardIndex]} 
              onNextCard={handleNextCard}
            />
          </>
        ) : (
          <div className="text-center">
            <p style={{ color: '#546e7a', fontSize: '1.2rem' }}>
              👈 Open settings to configure and start learning!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
