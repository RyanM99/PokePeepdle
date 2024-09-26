const express = require('express');
const router = express.Router();
const characters = require('../data/characters.json');

// Logic for the Character of the Day
// Currently just random each time the server launches
//let hiddenCharacter = characters[Math.floor(Math.random() * characters.length)]; // Fully Random each time the server starts


/*
// set constant date at load
const now = Date.now();
console.log('date now: ', now);
// now MOD 86400000 (24hrs in millis) = no. of millis since midnight
const sinceMidnight = now % 86400000;
console.log('ms since midnight: ', sinceMidnight);
// now - no. of millis = time at midnight (always the same value until the next day)
const atMidnight = now - sinceMidnight;
console.log('ms at midnight: ', atMidnight);
// time at midnight MOD no. of entries
const IdOfTheDay = atMidnight % characters.length; // result should be different enough to return a unique character regularly
console.log('Id of the day: ', IdOfTheDay);
let hiddenCharacter = characters[IdOfTheDay];
console.log('Character of the Day: ', hiddenCharacter);

// not really working
*/

// new plan

// fill an array with numbers 1 - characters.length
// for each character give them an ID value
// get a random number between 1 and array length
// give the next character the id in this array slot
// remove said array slot
// essentially removing that ID from the pool of possible IDs
// at the end of for each, each character will have a unique ID between 1 and characters length
// then just use the days since epoch % characters.length to retrieve character with this ID

// that way the IDs can be regenerated whenever
// and while the days will be sequential, the characters retrieved wont be
// as the order i add characters to the json will likely be obvious (alphabetical or by series), so players would have a chance to be able to guess based on the previous days character


const getHiddenCharacter = () => {
    // Determine # of days since midnight at the start of 1970
    const epoch = Math.floor(Date.now() / 86400000);
    console.log('days Since 1970 start: ', epoch);

    // Iterate IdOfTheDay each day (without exceeding characters.length)
    const IdOfTheDay = epoch % characters.length;
    console.log('Id of the Day', IdOfTheDay);

    // Find character with the appropriate Id
    let characterOfTheDay = null;
    characters.forEach(char => {
        if (char.id === IdOfTheDay) {
            console.log('Character with id found');
            characterOfTheDay = char;
        }
    });

    if (characterOfTheDay === null) {
        characterOfTheDay = characters[0];
    }
    console.log('Character of the Day', characterOfTheDay);
    return characterOfTheDay;
}

router.get('/character', (req, res) => {
    res.json({ message: "Guess the hidden character!" });
});

router.post('/guess', (req, res) => {
    const { name } = req.body;
    const guessedCharacter = characters.find(char => char.name.toLowerCase() === name.toLowerCase());

    if (!guessedCharacter) {
        console.log('Character not found');
        return res.status(404).json({ error: "Character not found" });
    }

    const hiddenCharacter = getHiddenCharacter();

    console.log('Guessed Character: ', guessedCharacter);
    console.log('Hidden Character: ', hiddenCharacter);

    const comparison = {
        name: guessedCharacter.name,
        name_match: guessedCharacter.name === hiddenCharacter.name,
        img: guessedCharacter.img,
        gender: guessedCharacter.gender,
        gender_match: guessedCharacter.gender === hiddenCharacter.gender,
        eye_colour: guessedCharacter.eye_colour,
        eye_colour_match: guessedCharacter.eye_colour === hiddenCharacter.eye_colour,
        hair_colour: guessedCharacter.hair_colour,
        hair_colour_match: guessedCharacter.hair_colour === hiddenCharacter.hair_colour,
        hometown: guessedCharacter.hometown,
        hometown_match: guessedCharacter.hometown === hiddenCharacter.hometown,
        region: guessedCharacter.region,
        region_match: guessedCharacter.region === hiddenCharacter.region,
        affiliation: guessedCharacter.affiliation,
        affiliation_match: guessedCharacter.affiliation === hiddenCharacter.affiliation,
        // add more attributes as needed
    };

    if (guessedCharacter.name === hiddenCharacter.name) {
        comparison.correct = true;
    }

    res.json(comparison);
});


router.post('/generateNewIds', (req, res) => {
    const response = generateNewIds();
    return response;
});

const generateNewIds = () => {
    let availableIds = [];
    let i = 0;

    // fill an array with an ID for each character
    console.log('filling array with ids');
    characters.forEach(char => {
        availableIds.push(i);
        i++;
    });
    console.log('available ids array: ', availableIds);

    // Loop again to assign a new ID to each character
    characters.forEach(char => {
        const next = Math.floor(Math.random() * availableIds.length);
        const newId = availableIds[next];
        char.id = newId;
        console.log(`Added ${newId} id to ${char.name}`);

        availableIds = availableIds.filter(id => id != newId);
        console.log(`id ${newId} removed from available Ids: `, availableIds);
    });
    console.log('new characters json:', characters);

    hiddenCharacter = getHiddenCharacter();

    const success = true;
    return success;
};

// Generate New IDs for each character when the server starts
// This randomises the order in which the characters appear to avoid players' pattern recognition
generateNewIds();

router.post('/reveal', (req, res) => {
    const hiddenChar = getHiddenCharacter();

    res.json(hiddenChar);
});

module.exports = router;
