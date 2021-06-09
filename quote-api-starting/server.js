const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    let randomQuote = getRandomElement(quotes);
    let formattedQuote = {
        quote: randomQuote
    }
    res.send(formattedQuote);
});

app.get('/api/quotes', (req, res, next) => {
    let resQuotes = [];
    if (!req.query.person){
        res.send({quotes: quotes});
    } else {
        let requestedPerson = req.query.person;
        for (let iterQuote of quotes) {
            if (iterQuote.person == requestedPerson){
               resQuotes.push(iterQuote)
            }
        }
        res.send({ quotes: resQuotes });
    }
});

app.post('/api/quotes', (req, res, next) => {
    const reqQuote = req.query.quote;
    const reqPerson = req.query.person;
    if (reqQuote && reqPerson) {
        quotes.push({
            quote: reqQuote,
            person: reqPerson
        })
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
