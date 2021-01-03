import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ConnectionService } from '../connection.service';


/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:  The admin component. When not logged in the login input is shown
 *                otherwise render to other components depends on what is chosen. 
 *
 *  Written:       11/12/2020
 *  Last updated:  29/12/2020 
 *
 *
 **************************************************************************** */

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  changePaintings: boolean = false;
  changeCv: boolean = false;
  showAdmin: boolean = true;
  isLogedIn: boolean = false; 
  goCover: boolean = false;
  goShowCover: boolean = false;
  username: string;
  psw: string;
  errorLogin: boolean = false;
  constructor(
    private connectionService : ConnectionService,
  ) { }

  ngOnInit(): void {
  }
  /*
 * Change boolean variables which component shall be shown, not render to.
 */
  goChangePaintings(){
    console.log("já");
    this.changePaintings = true;
    this.showAdmin = false;
    this.goCover = false; 
    this.goShowCover = false;

  }
  /*
 * Change boolean variables which component shall be shown, not render to.
 */
  goChangeCv(){
    this.changeCv = true;
    this.showAdmin = false;
    this.goCover = false; 
    this.goShowCover = false;

  }
  /*
 * Change boolean variables which component shall be shown, not render to.
 */
  goChangeCover(){
    this.changeCv = false;
    this.showAdmin = false; 
    this.goShowCover = false;
    this.goCover = true;
  }
  /*
 * Change boolean variables which component shall be shown, not render to.
 */
  goChangeShowCover(){
    this.changeCv = false;
    this.showAdmin = false; 
    this.goShowCover = true;
    this.goCover = false;
  }
  /*
 * Saves the input to username without have to push some save button 
 */
  onKeyUser(event){
    console.log(event.target.value)
    this.username = event.target.value;
  }
  /*
 * Saves the input to pasword without have to push some save button, just for sec.
 */
  onKeyPsw(event){
    console.log(event.target.value)
    this.psw = event.target.value;
  }
  /*
 * this is the register function. We don't use it but better to have the option. 
 */
  /*
  register(){
    console.log("register");
    let user = {
      'name': this.username,
      'psw': this.psw
    }
    this.connectionService.register(user).subscribe(t => {
      console.log(t);
    })
    this.username = "";
    this.psw = "";

  }*/
  /*
 * the login function, talks to the connection service. Clear the pasword. 
 */
  login(){
    this.errorLogin = false;
    let user = {
      "name": this.username,
      "psw": this.psw,
    }
    this.connectionService.login(user).subscribe( t=> {
      console.log(t);
      if(t == this.username){
        this.isLogedIn = true;
      }else{
        this.errorLogin = true;
      }
      this.psw = "";
    })
  }
 
}
