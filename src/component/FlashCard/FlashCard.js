import React, { useState } from 'react';
import './FlashCard.css';

function FlashCard({word, onNextCard}){
    const [showAnswer, setShowAnswer] = useState(false);
    
    const handleClick = () => {
        if(!showAnswer){
            //First click: show pronunciation and translation
            setShowAnswer(true);
        }
        else{
            //Second click: move to next card
            setShowAnswer(false);
            onNextCard();
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight:'400px'}}>
            <div className="card shadow-lg rounded-4 flash-card-custom"
                 onClick={handleClick}
                 style={{maxWidth:'800px', minHeight:'350px', cursor:'pointer', width:'100%'}}
            >
                <div className ="card-body d-flex flex-column justify-content-center text-center">
                    <div className ="korean-word">{word.korean}</div>
                        {showAnswer && (
                            //Doesn't add extra elements to the DOM
                            <>
                                <div className="pronunciation text-primary fst-italic mt-3">[{word.pronunciation}]</div>
                                <div className="english-meaning text-success fw-medium mt-3">{word.english}</div>
                            </>
                        )}
                </div>
                <div className="text-center mt-4">
                    {!showAnswer ?
                      (<small className="text-muted">Click to reveal answer</small>)
                      :
                      (<small className="text-muted">Click again for next card</small>)}
                </div>
            </div>
        </div>
    );
}

export default FlashCard;