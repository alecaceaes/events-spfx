import { IModule, module } from "angular";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import HomeController from "./HomeController";
import TestDataService from "./testData.service";
import ProdDataService from "./prodData.service";

const eventsapp: IModule = module('eventsapp', []);

if (Environment.type == EnvironmentType.Local) {
  eventsapp
  .controller('HomeController', HomeController)
  .service('DataService', TestDataService);
}
else {
  eventsapp
    .controller('HomeController', HomeController)
    .service('DataService', ProdDataService);
}
