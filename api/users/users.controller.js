const usersModel = require("./users.model");

/**
 * GET       /api/users                 -> getAll
 * GET       /api/users/:username       -> getById
 * POST      /api/users                 -> postUser
 * DELETE    /api/users/:username       -> deleteUser
 * PUT       /api/users/:username       -> putUser
 * PATCH     /api/users/:username       -> patchUser
 **/

module.exports = {
  getAll,
  getByUsername,
  postUser,
  deleteUser,
  putUser,
  patchUser,
  insertTweet,
};

const getTweetsByUser = require("../tweets/tweets.controller").getTweetsByUser;
const auxiliars = require("../auxiliars");
const checkBodyPatch = auxiliars.checkBodyPatch;

function getAll(req, res) {
  usersModel
    .find({}, { __v: false }, { lean: true })
    .then((users) => {
      res.json(users);
    })
    .catch((e) => res.status(400).send(e));
}
// const allUsers = users.map(e => {
//     const username = e.username;
//     const tweetsFound = getTweetsByUser(username);
//     e.tweetsIDs = tweetsFound.map(e => e.id);

//     return e;
// });

function getByUsername(req, res) {
  usersModel
    .findOne({ username: req.params.username })
    .then((users) => {
      if (users == null) {
        res.status(404).send("El usuario no existe");
      } else {
        res.json(users);
      }
    })
    .catch((e) => res.status(400).send(e));
}
//     const userNameParameter = req.params.username;

//     let userFound = users.find((u) => u.username == userNameParameter);

//     if (userFound == undefined) {
//         return res.status(404).send("No se ha encontrado al usuario");
//     }

//     const propietarioTweets = getTweetsByUser(userNameParameter); //encuentra todos los tweets de un propietario

//     let usuarioConTweets = {

//         ...userFound,
//         tweetsIDs: propietarioTweets.map(e => e.id)

//     }

//     res.json(usuarioConTweets);

function postUser(req, res) {
  const newUser = req.body;
  delete newUser._id;
  usersModel
    .create(newUser)
    .then((createUser) => res.json(createUser))
    .catch((e) => {
      if (e.code == 11000) {
        res.status(400).send("El usuario introducido ya existe");
      } else {
        res.status(400).send(e);
      }
    });
}

// if (users.some((element) => element.username == newUser.username)) {
//     return res.status(403).send("Este usuario ya existe");
// }

// let nuevoUsuario = {
//     username: newUser.userName,
//     name: newUser.name,
//     email: newUser.email,
// };
// users.push(nuevoUsuario);

// res.json(nuevoUsuario);

function deleteUser(req, res) {
  usersModel
    .findOneAndRemove({ username: req.params.username }, { lean: true })
    .then((userDelete) => {
      res.send(userDelete);
      console.log("hola");
    })
    .catch((e) => res.status(400).send(e));

  // users = users.filter((element) => element.username != req.params.username);
  // //Comprobar que el que se va a borrar existe ya
  // res.status(200).send("Okey");
}

function putUser(req, res) {
  //const query = { name: 'borne' };
  //Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)

  const query = { username: req.params.username };
  let update = req.body;
  delete update._id;
  update.username = req.params.username;
  usersModel
    .findOneAndReplace(query, update, { new: true, runValidators: true })
    .then((newUser) => res.json(newUser))
    .catch((e) => res.send(e));

  // let recogerUserName = req.params.username;

  // const newUserName = req.body;

  // if (users.some((u) => u.username == recogerUserName)) {
  //     newUserName.username = recogerUserName;
  //     users.forEach((element, index) => {
  //         if (element.username == newUserName.username) {
  //             users[index] = newUserName;
  //         }
  //     });
  //     res.json(newUserName);
  // } else {
  //     res.status(404).send('Este "nombre de usuario" no existe en la API');
  // }
}

function patchUser(req, res) {
  const query = { username: req.params.username };
  let update = req.body;
  delete update._id;
  delete update.username;
  usersModel
    .findOneAndUpdate(query, update, { new: true, runValidators: true })
    .then((newUser) => res.json(newUser))
    .catch((e) => res.send(e));

}

  // let recogerUserName = req.params.username;

  // const newUserName = req.body;

  // let UserNameEncontrado = users.find((u) => u.username == recogerUserName);
  // if (UserNameEncontrado == undefined) {
  //     return res.status(404).send('Este "usuario" no existe en la API');
  // }

  // let cambioUno = {
  //     username: recogerUserName,
  //     name: checkBodyPatch(newUserName.name, UserNameEncontrado.name),
  //     email: checkBodyPatch(newUserName.email, UserNameEncontrado.email),
  // };

  // users.forEach((element, index) => {
  //     if (element.username == cambioUno.username) {
  //         users[index] = cambioUno;
  //     }
  // });

  // res.json(cambioUno);


// Auxiliars

function insertTweet(user, tweet) {
  const encontrado = users.find((e) => e.username == user);

  if (encontrado != undefined) {
    encontrado.tweetsIDs.push(tweet.id);
  }
}
