import React from 'react';

function SettingsMenu({ settings, onStartStudy, show, onHide }) {
  const { selectedLevel, setSelectedLevel, cardCount, setCardCount } = settings;

  return (
    <>
      {/* Backdrop */}
      {show && (
        <div 
          className="offcanvas-backdrop fade show" 
          onClick={onHide}
          style={{ zIndex: 1040 }}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`offcanvas offcanvas-start ${show ? 'show' : ''}`}
        tabIndex="-1"
        style={{ 
          visibility: show ? 'visible' : 'hidden',
          zIndex: 1045,
          width: '320px'
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Settings</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onHide}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-4">
            <h6 className="mb-3">Choose Level</h6>
            <div className="d-grid gap-2">
              <button 
                className={`btn ${selectedLevel === 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedLevel(1)}
              >
                Level 1 - Beginner
              </button>
              <button 
                className={`btn ${selectedLevel === 2 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedLevel(2)}
              >
                Level 2 - Intermediate
              </button>
              <button 
                className={`btn ${selectedLevel === 3 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedLevel(3)}
              >
                Level 3 - Advanced
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="mb-3">Number of Cards</h6>
            <div className="d-grid gap-2">
              <button 
                className={`btn ${cardCount === 10 ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setCardCount(10)}
              >
                10 Cards
              </button>
              <button 
                className={`btn ${cardCount === 20 ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setCardCount(20)}
              >
                20 Cards
              </button>
            </div>
          </div>

          <button 
            className="btn btn-primary w-100"
            disabled={!selectedLevel || !cardCount}
            onClick={() => {
              onStartStudy();
              onHide();
            }}
          >
            Start Learning
          </button>
        </div>
      </div>
    </>
  );
}

export default SettingsMenu;
