module.exports.checkBodyPatch = checkBodyPatch;

function checkBodyPatch(newAtribute, oldAtribute) {
    if (newAtribute != undefined) {
      return newAtribute;
    } else {
      return oldAtribute;
    }
}