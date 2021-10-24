const { nanoid } = require("nanoid");
const tweetsModel = require('./tweets.model');

const createTweetInUser = require('../users/users.controller').insertTweet;
const checkBodyPatch = require('../auxiliars').checkBodyPatch;

/** 
 * GET       /api/tweets           -> getAll
 * GET       /api/tweets/:id       -> getById
 * POST      /api/tweets           -> postTweet
 * DELETE    /api/tweets/:id       -> deleteTweet
 * PUT       /api/tweets/:id       -> putTweet
 * PATCH     /api/tweets/:id       -> patchTweet
 **/

module.exports = {
    getAll,
    getById,
    postTweet,
    deleteTweet,
    putTweet,
    patchTweet,
    getTweetsByUser
};


// function getAll(req, res) {
//     res.json(tweets);
// }

function getAll(req, res) {

    tweetsModel.find({},{},{lean: true}).then(tweet => {

        res.json(tweet)
    })
    .catch(e => res.status(400).send(e.message));
}


// function getById(req, res) {
//     const tweetIdParameter = req.params.id;
//     const tweetFound = tweets.find((u) => u.id == tweetIdParameter);
//     if (tweetFound == undefined) {
//         return res.status(404).send("No se ha encontrado el tweet");
//     }
//     res.json(tweetFound);
// }


function getById(req, res) {

    tweetsModel.findOne({_id: req.params.id})
        .then(tweets => {
            if (tweets == null){
                res.status(404).send("Este tweet no existe")
            }
            else{
            res.json(tweets)
            }
        })
        .catch(e => res.status(400).send(e.message));

    }

function postTweet(req, res) {

let newTweet = req.body;

    tweetsModel.create(newTweet)
    .then(createUser => res.json(createUser))
    .catch(e => res.status(400).send(e.message));
}
    // const newTweet = req.body;

    // console.log(newTweet.text);

    // let nuevoTweet = {
    //     id: nanoid(),
    //     text: newTweet.text,
    //     owner: newTweet.owner,
    //     createdAt: new Date().getTime()
    // };

    // tweets.push(nuevoTweet);

    // createTweetInUser(nuevoTweet.owner, nuevoTweet);

    // res.json(nuevoTweet);


function deleteTweet(req, res) {

    tweetsModel.findOneAndRemove(req.params._id)
    .then(eraseTweet => res.json(eraseTweet))
    .catch(e => res.status(400).send(e.message))
}
    // tweets = tweets.filter(e => e.id != req.params.id);

    // res.status(200).send("Okey");

function putTweet(req, res) {

const query = req.params.id;
const update = req.body;


    tweetsModel.findOneAndReplace(query, update, { new: true, lean: true, runValidators: true }) //el "new" sirve para que te devuelva el nuevo objeto porque por defecto sólo te pondría que se ha actualizado.
    .then (updateUser => res.json(updateUser))
    .catch(e => res.status(400).send(e.message));
}

    // const recogerId = req.params.id;
    // const newTweet = req.body;
    // const oldTweet = tweets.find(e => e.id == recogerId);

    // if (oldTweet != undefined) {
    //     newTweet.id = recogerId;
    //     newTweet.owner = oldTweet.owner;
    //     newTweet.createdAt = oldTweet.createdAt;
    //     tweets.forEach((element, index) => {
    //         if (element.id == newTweet.id) {
    //             tweets[index] = newTweet;
    //         }
    //     });
    //     res.json(newTweet);
    // } else {
    //     res.status(404).send('Este "tweet" no existe en la API');
    // }


function patchTweet(req, res) {

const query = req.params.id
const update = req.body;

tweetsModel.findByIdAndUpdate(query, update,{ new: true, runValidators: true })
.then(updateUser => res.json(updateUser))
.catch(e => res.status(400).send(e.message))
}
    // let recogerId = req.params.id;
    // const newTweet = req.body;
    // let TweetEncontrado = tweets.find((u) => u.id == recogerId);

    // if (TweetEncontrado == undefined) {
    //     return res.status(404).send('Este "tweet" no existe en la API');
    // }

    // TweetEncontrado.text = checkBodyPatch(newTweet.text, TweetEncontrado.text);

    // res.json(TweetEncontrado);


// Auxiliars

function getTweetsByUser(username) {
    const tweetsByUser = tweets.filter(e => e.owner == username);

    return tweetsByUser;
}
