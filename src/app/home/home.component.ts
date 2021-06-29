import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog , MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'show-dialog',
  templateUrl : './add-edit-list.html' 
})
export class DialogComponent {

  taskName : string = '';
  selectedList : any ;
  lists : any = [{ name : 'Started' , value : 2 } , { name : 'To Do' , value :1 }, { name : 'Done' , value :3 }];

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>, private dataService : DataService) {}

    addToList(form: NgForm)
    {
      if(this.selectedList==1){
       var check =  this.checkDuplicate(this.dataService.todo , this.taskName);
       if(check == true)
        this.dataService.todo.push(this.taskName);
       else  alert('Duplicates not allowed');
        
      }
      else if(this.selectedList==2)
      {
        var check =  this.checkDuplicate(this.dataService.started , this.taskName);
        if(check == true)
         this.dataService.todo.push(this.taskName);
        else  alert('Duplicates not allowed');
      }
      else
      var check =  this.checkDuplicate(this.dataService.done , this.taskName);
      if(check == true)
       this.dataService.todo.push(this.taskName);
      else 
        alert('Duplicates not allowed');

    }

    checkDuplicate(list :any , taskName : string)
    {
      for(var item of list)
      {
        if(item.toLowerCase() == taskName.toLowerCase())
          return false;
      }
      return true;

    }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  editTask:boolean = false;

  constructor(public matDialog : MatDialog,private dataService : DataService) { }

  open(){
    this.matDialog.open(DialogComponent,{
        height: '400px',
        width : '500px'
    })
  }

  edit(item : any)
  {
    console.log('edit',item);
  }

  todo = this.dataService.todo;
  done= this.dataService.done;
  started=  this.dataService.started;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,  event.container.data,  event.previousIndex,
                        event.currentIndex);
    }
  }

  ngOnInit(): void {
  }

}