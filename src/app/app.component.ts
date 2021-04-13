import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toastr: ToastrService){}
  
  itemArray: string[] = new Array(9).fill('empty');
  player: string = 'Player1';
  isCross: boolean = true;
  message: string = '';

  clickIcon(clickIndex: number){
    if(this.message){
      return this.toastr.success(this.message);
    }
    if(this.itemArray[clickIndex] == 'empty'){
      this.itemArray[clickIndex] = this.isCross ? 'cross' : 'circle';
      this.isCross = !this.isCross;
      if(this.winningLogic()){
        this.message = this.player + ' won ';
        return this.toastr.success(this.message);
      } 
      if(this.fullBoardCheck()){
        this.message = 'Tie Game';
        return this.toastr.info(this.message);
      }
      
      if(this.player == 'Player1'){
        this.player = 'Player2';
      } else {
        this.player = 'Player1';
      }
    } else {
      return this.toastr.info('Already Filled');
    }
  }
  
  winningLogic(){
    let win: Boolean = false;
    if(this.itemArray[0] != 'empty' && this.itemArray[0] == this.itemArray[1] && this.itemArray[1] == this.itemArray[2]){
      win = true;
    } else if(this.itemArray[3] != 'empty' && this.itemArray[3] == this.itemArray[4] && this.itemArray[4] == this.itemArray[5]){
      win = true;
    } else if(this.itemArray[6] != 'empty' && this.itemArray[6] == this.itemArray[7] && this.itemArray[7] == this.itemArray[8]){
      win = true;
    } else if(this.itemArray[0] != 'empty' && this.itemArray[0] == this.itemArray[3] && this.itemArray[3] == this.itemArray[6]){
      win = true;
    } else if(this.itemArray[1] != 'empty' && this.itemArray[1] == this.itemArray[4] && this.itemArray[4] == this.itemArray[7]){
      win = true;
    } else if(this.itemArray[2] != 'empty' && this.itemArray[2] == this.itemArray[5] && this.itemArray[5] == this.itemArray[8]){
      win = true;
    } else if(this.itemArray[0] != 'empty' && this.itemArray[0] == this.itemArray[4] && this.itemArray[4] == this.itemArray[8]){
      win = true;
    } else if(this.itemArray[2] != 'empty' && this.itemArray[2] == this.itemArray[4] && this.itemArray[4] == this.itemArray[6]){
      win = true;
    }
    return win;
  }

  fullBoardCheck(){
    let check: Boolean = true;
    for(let i = 0; i < this.itemArray.length; i++){
      if(this.itemArray[i] == 'empty'){
        check = false;
        break;
      }
    }
    return check;
  }

  reloadGame(){
    this.itemArray = new Array(9).fill('empty');
    this.player = 'player1';
    this.message = '';
    this.isCross = true;
  }

}
