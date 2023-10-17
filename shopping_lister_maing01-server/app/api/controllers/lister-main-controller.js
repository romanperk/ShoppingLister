"use strict";
const ListerMainAbl = require("../../abl/lister-main-abl.js");

class ListerMainController {
  init(ucEnv) {
    return ListerMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ListerMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ListerMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ListerMainController();
