const express = require("express");
const moment = require('moment');
const _ = require('lodash');
const bodyParser = require('body-parser');
const agent = require('superagent-promise')(require('superagent'), Promise);

// Create express app as usual
const app = express();
// var app = aapp.Router();
// 
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/** get alert_summary on home page  */
app.post("/api/convert",(req,res)=>{
    //Args
    const apiKey = 'AIzaSyBkoxqFTB8WUk_efG9dV-D4xuFRWnpfiTs';
    const inputData = req.body['input_json'];
    let destinationCodes = [];
    destinationCodes.push(req.body['lang']);
    const apiUrl = _.template('https://www.googleapis.com/language/translate/v2?key=<%= apiKey %>&q=<%= value %>&source=en&target=<%= languageKey %>');

    Promise.all(_.reduce(destinationCodes, (sum, languageKey) => {
        const fileName = _.template('/tmp/<%= languageKey %>-<%= timeStamp %>.json')({
            languageKey,
            timeStamp: moment().unix()
        });

        //Starts with the top level strings
        return sum.concat(_.reduce(iterLeaves(inputData, undefined, undefined, languageKey), (promiseChain, fn) => {
            return promiseChain.then(fn);
        }, Promise.resolve()).then((payload) => {
            res.send({fileName: fileName, conertedLoad: JSON.stringify(payload)});
        }).then(_.partial(console.log, 'Successfully translated all nodes, file output at ' + fileName)));
    }, [])).then(() => {
        // process.exit();
    });

    function transformResponse(res) {
        return _.get(JSON.parse(res.text), ['data', 'translations', 0, 'translatedText'], '');
    }

    function iterLeaves(value, keyChain, accumulator, languageKey) {
        accumulator = accumulator || {};
        keyChain = keyChain || [];
        if (_.isObject(value)) {
            return _.chain(value).reduce((handlers, v, k) => {
                return handlers.concat(iterLeaves(v, keyChain.concat(k), accumulator, languageKey));
            }, []).flattenDeep().value();
        } else {
            return function () {
                console.log(_.template('Translating <%= value %> to <%= languageKey %>')({value, languageKey}));

                //Translates individual string to language code
                return agent('GET', apiUrl({
                    value: encodeURI(value),
                    languageKey,
                    apiKey
                })).then(transformResponse).then((text) => {
                    //Sets the value in the accumulator
                    _.set(accumulator, keyChain, text);

                    //This needs to be returned to it's eventually written to json
                    return accumulator;
                });
            };
        }
    }
});  

app.listen(5002, () => console.log(`Example app listening on port 5002!`))
