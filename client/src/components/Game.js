import React, { useState } from 'react';
import axios from 'axios';
import './Game.css';

const Game = () => {
    const [guess, setGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [result, setResult] = useState(null);
    //const [revealedChar, setRevealedChar] = useState(null); // Variable for debugging

    const handleGuess = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/game/guess', { name: guess });
            const newGuess = {
                name: guess,
                data: response.data
            };
            setGuesses([...guesses, newGuess]); // Add the new guess to the guesses array
            setResult(response.data);
        } catch (error) {
            console.error(error);
            setResult({ error: 'Character not found' });
        }
    };

    ///// Debugging Functions /////
    /*const generateIds = async () => {
        try {
            await axios.post('http://localhost:5000/api/game/generateNewIds');
        } catch (error) {
            console.error(error);
        }
    }
    const revealHiddenCharacter = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/game/reveal');
            setRevealedChar(response.data);
        } catch (error) {
            console.error(error);
        }
    }*/


    return (
        <div className='game'>
            <h1>PokePeepdle</h1>

            {/* Debugging Buttons */}
            {/*<button className="newCharacter" onClick={generateIds}>&#8634;</button>*/}
            {/*<button className="reveal" onClick={revealHiddenCharacter}>Reveal</button>*/}

            {/* Guess Field */}
            <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Guess the character"
            />
            <button onClick={handleGuess}>Guess</button>

            {/* More Debugging */}
            {/*{revealedChar && (*/}
            {/*    <div>{revealedChar.name}</div>*/}
            {/*)}*/}

            {/* Results */}
            {result && result.correct && <div style={{ color: 'green', fontWeight: 'bold', fontSize: '26px' }}>Congratulations! You guessed it right.</div>}
            {result && result.error && <div style={{ color: 'red' }}>{result.error}</div>}

            {/* Headers */}
            <div className="grid-container">
                {/*<div className="header Image">Image</div>*/} {/* Remove character images until fixed */}
                <div className="header name">Name</div>
                <div className="header gender">Gender</div>
                <div className="header eye-colour">Eye Colour</div>
                <div className="header hair-colour">Hair Colour</div>
                <div className="header hometown">Hometown</div>
                <div className="header region">Region</div>
                <div className="header affiliation">Affiliation</div>

                {/* Map over guesses to display them */}
                {guesses.map((guessObj, index) => (
                    <React.Fragment key={index}>
                        {/*<div className="img">*/}
                            {/*<img*/} {/* Remove character images until fixed */}
                            {/*    src={guessObj.data.img}*/}
                            {/*    alt={guessObj.data.name}*/}
                            {/*    style={{*/}
                            {/*        width: `100px`,*/}
                            {/*        maxWidth: '100%',*/}
                            {/*        height: 'auto',*/}
                            {/*        color: 'black',*/}
                            {/*    }}*/}
                            {/*/>*/}
                        {/*</div>*/}
                        <div className="name" style={{ color: guessObj.data.name_match ? 'green' : 'red' }}>{guessObj.data.name}</div>
                        <div className="gender" style={{ color: guessObj.data.gender_match ? 'green' : 'red' }}>{guessObj.data.gender}</div>
                        <div className="eye-colour" style={{ color: guessObj.data.eye_colour_match ? 'green' : 'red' }}>{guessObj.data.eye_colour}</div>
                        <div className="hair-colour" style={{ color: guessObj.data.hair_colour_match ? 'green' : 'red' }}>{guessObj.data.hair_colour}</div>
                        <div className="hometown" style={{ color: guessObj.data.hometown_match ? 'green' : 'red' }}>{guessObj.data.hometown}</div>
                        <div className="region" style={{ color: guessObj.data.region_match ? 'green' : 'red' }}>{guessObj.data.region}</div>
                        <div className="affiliation" style={{ color: guessObj.data.affiliation_match ? 'green' : 'red' }}>{guessObj.data.affiliation}</div>
                    </React.Fragment>
                ))}
            </div>


            {/* Unprofessional To-do list */}
            <div style={{ color: 'white' }}>
                <div>To Do:</div>
                <div>Make correct guess a popup</div>
                <div>Fix Images</div>
                <div>Add auto-complete to guesses</div>
                <div>Limit guesses to 5 and add fail state</div>
                <div>Endless mode</div>
            </div>

        </div>

    );
};

export default Game;
