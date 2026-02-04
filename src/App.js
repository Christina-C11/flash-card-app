import React, { useState } from 'react';
import FlashCard from './component/FlashCard/FlashCard';
import SettingsMenu from './component/SettingsMenu/SettingsMenu';
import koreanVocabulary from './koreanVocabulary';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


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

      {/* Hamburger Menu Button - Fixed Position */}
      <button
        className="btn settings-btn position-fixed"
        onClick={() => setShowSettings(true)}
        style={{
          fontSize: '1.2rem',
          padding: '0.4rem 0.8rem',
          top: '1rem',
          left: '1rem',
          zIndex: 1030
        }}
        aria-label="Open menu"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Main Content */}
      <div className="py-3 py-md-4" style={{ marginLeft: '0', paddingLeft: '3.2rem', paddingRight: '1rem' }}>
        <style>{`
          @media (min-width: 768px) {
            .app-container > div:last-child {
              margin-left: 320px;
              padding-left: 2rem;
            }
          }
        `}</style>

        {/* Header with Title */}
        <div className="d-flex align-items-center justify-content-center mb-5">
          {/* Title and Subtitle */}
          <div className="text-center">
            <h1 className="fw-bold mb-0 app-title">KlickClick</h1>
            <p className="lead app-subtitle mb-0">Learn Vocabulary</p>
          </div>
        </div>

        {/* Study View */}
        {isStudying ? (
          <>
            <div className="mx-auto" style={{ maxWidth: '800px' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold small">Progress</span>
                <span className="fw-bold" style={{ color: '#2c3e50' }}>
                  {currentCardIndex + 1} / {studyWords.length}
                </span>
              </div>
              <div className="progress mb-5" style={{ height: '25px' }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${((currentCardIndex + 1) / studyWords.length) * 100}%` }}
                >
                </div>
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
