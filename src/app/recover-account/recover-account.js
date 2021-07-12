var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
var RecoverAccount = /** @class */ (function () {
  function RecoverAccount(http, navCtrl, apiCtrl, platform, loading) {
      this.http = http;
      this.navCtrl = navCtrl;
      this.apiCtrl = apiCtrl;
      this.platform = platform;
      this.loading = loading;
  }
  RecoverAccount.prototype.ionViewWillEnter = function () {
  };
  RecoverAccount = __decorate([
      Component({
          selector: 'page-recover_account',
          templateUrl: 'recover_account.html',
          providers: [Api]
      }),
      __metadata("design:paramtypes", [Http,
          NavController,
          Api,
          Platform,
          LoadingController])
  ], RecoverAccount);
  return RecoverAccount;
}());
export { RecoverAccount };
//# sourceMappingURL=recover_account.js.map