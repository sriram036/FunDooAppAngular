import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/Services/note.service';
import { UserService } from 'src/app/Services/user.service';


export interface INotes {
  notesId: number,
  title: string,
  description: string,
  reminder: string,
  colour: string,
  image: string,
  isArchive: boolean,
  isPin: boolean,
  isTrash: boolean,
  createdAt: string,
  updatedAt: string,
  userId: number
}

export class notes{
  title: string='';
  description: string='';
}
interface IData{
  id:number,
  option:number
}
@Component({
  selector: 'app-notedashboard',
  templateUrl: './notedashboard.component.html',
  styleUrls: ['./notedashboard.component.scss']
})

export class NotedashboardComponent implements OnInit {
  
  constructor(private router: Router, private note: NoteService, private User: UserService) { }

  visible: boolean = true;
  trash: boolean = false;
  archive: boolean = false;

  showhideUtility() {
    this.archive = false;
    this.visible = true;
    this.trash = false;
  }

  showArchive(){
    this.archive = true;
    this.visible = false;
    this.trash= false;
  }

  showTrash(){
    this.trash = true;
    this.visible = false;
    this.archive = false;
  }

  title:string='';
  description:string='';
  NotesList:INotes[]=[];
  allList:INotes[]=[];
  archiveList:INotes[]=[];
  trashList:INotes[]=[];
  token:string='';
  newNote?:any;
  ic=false;
  ngOnInit(): void {
    let newList:INotes[];
    this.User.newToken.subscribe(data => {
      this.token = data;
    });
    this.note.getNotes(this.token).subscribe(notes =>{
      this.allList = notes;
      console.log(this.allList);
      this.NotesList = this.allList.filter((noteObj: INotes) => noteObj.isArchive == false && noteObj.isTrash == false);
      console.log(this.NotesList);
      this.archiveList = this.allList.filter((notes: INotes) => notes.isArchive == true);
      console.log(this.archiveList);
      this.trashList = this.allList.filter((notes: INotes) => notes.isTrash == true);
      console.log(this.trashList);
    });
  }

  receiveData($event:IData){
    console.log($event);
    let note = this.allList.find(note => note.notesId == $event.id)
    if ($event.option == 1){
      if (note?.isArchive == true) {
        note.isArchive = false
        console.log(note);
        this.NotesList.push(note);
        let index: number = this.archiveList.findIndex(data => data.notesId == $event.id)
        this.archiveList.splice(index,1);
      }
      else if (note?.isArchive == false) {
        note.isArchive = true
        console.log(note);
        this.archiveList.push(note);
        let index: number = this.NotesList.findIndex(data => data.notesId == $event.id)
        this.NotesList.splice(index, 1);
      }
    }
    else if ($event.option == 2){
      let noteL = this.trashList.find(data => data.notesId == $event.id);
      if (noteL?.isTrash == true) {
        noteL.isTrash = false
        console.log(noteL);
        this.NotesList.push(noteL);
        let index: number = this.trashList.findIndex(data => data.notesId == $event.id)
        this.trashList.splice(index, 1);
      }
      else if (note?.isTrash == false) {
        note.isTrash = true
        console.log(note);
        this.trashList.push(note);
        let index: number = this.NotesList.findIndex(data => data.notesId == $event.id)
        this.NotesList.splice(index, 1);
      }
    }
  }

  dialog:boolean=false;

  onUserChange(data : boolean){
    this.ic = data;
  }
  panelOpenState = false;

  saveNote(){
    //console.log(form.value);
    this.User.newToken.subscribe(data=>{
      this.token = data;
    });
    let obj:notes = {title:this.title,description:this.description}
    this.note.saveNote(obj,this.token).subscribe((result)=>{
      console.log(result);
    });
    this.NotesList.push(<INotes>obj);
    console.log(this.NotesList);
  }

  viewSideNav(){
    if(this.ic){
      this.ic = false;
    }
    else{
      this.ic = true;
    }
  }
}
