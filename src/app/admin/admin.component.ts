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
 *  Last updated:  29/12/2018
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
  goChangePaintings(){
    console.log("já");
    this.changePaintings = true;
    this.showAdmin = false;
    this.goCover = false; 
    this.goShowCover = false;

  }
  goChangeCv(){
    this.changeCv = true;
    this.showAdmin = false;
    this.goCover = false; 
    this.goShowCover = false;

  }
  goChangeCover(){
    this.changeCv = false;
    this.showAdmin = false; 
    this.goShowCover = false;
    this.goCover = true;
  }
  goChangeShowCover(){
    this.changeCv = false;
    this.showAdmin = false; 
    this.goShowCover = true;
    this.goCover = false;
  }
  onKeyUser(event){
    console.log(event.target.value)
    this.username = event.target.value;
  }
  onKeyPsw(event){
    console.log(event.target.value)
    this.psw = event.target.value;
  }
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
