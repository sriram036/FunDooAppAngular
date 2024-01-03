import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from 'src/app/Services/note.service';
import { UserService } from 'src/app/Services/user.service';
import { EditComponent } from '../edit/edit.component';

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

interface IColor{
  name:string,
  color: string
}
interface IData{
  id : number,
  option : number
}
@Component({
  selector: 'app-notes-buttons',
  templateUrl: './notes-buttons.component.html',
  styleUrls: ['./notes-buttons.component.scss']
})
export class NotesButtonsComponent implements OnInit {
  
  constructor(private notes: NoteService, private User: UserService, public dialog: MatDialog) { }

  colors: IColor[] = [
    { name: 'coral', color: '#FF7F50' },
    { name: 'peach', color:'#FFE5B4'},
    { name: 'sand', color:'#C2B280'},
    { name: 'mint', color:'#3EB489'},
    { name: 'sage', color:'#B2AC88'},
    { name: 'fog', color:'#D7D0FF'},
    { name: 'storm', color:'#708187'}
  ];

  @Input() newAddedNote: INotes[]=[];

  token: string = '';

  edit:boolean=false;
  noteList?: INotes[];
  filterList:any[]=[];
  ngOnInit(): void {
    this.noteList = this.newAddedNote;
    console.log(this.noteList);

    this.colors.push()
  }
  getNotes(token:string){
    //console.log(this.newAddedNote);
    //console.log(token);
    
  }
  @Output() dataEvent = new EventEmitter<IData>();
  @Output() noteData = new EventEmitter<INotes>();

  archiveOrDelete(id:number, option : number){
    this.edit = false;
    console.log(this.edit);
    if(option == 1){
      this.User.newToken.subscribe(data => {
        this.token = data;
      });
      this.notes.archiveNote(id, this.token).subscribe((result) => {
        console.log(result);
      });
      let data = {'id':id,'option':option}
      this.dataEvent.emit(data);
    }
    else if(option == 2 ){
      this.User.newToken.subscribe(data => {
        this.token = data;
      });
      this.notes.trashNote(id, this.token).subscribe((result) => {
        console.log(result);
      });
      let data = { 'id': id, 'option': option }
      this.dataEvent.emit(data);
    }
  }

  changeColor(color:string, note:INotes){
    this.edit = false;
    console.log(this.edit);
    console.log(note);
    note.colour = color;
    this.User.newToken.subscribe(data => {
      this.token = data;
    });
    this.notes.addColour(note.notesId,color,this.token).subscribe((result) => {
      console.log(result);
    });
  }
  openEdit(note:INotes){
    this.edit = true;
    console.log("EditWorks")
    if(this.edit){
      this.dialog.open(EditComponent, { data: { note } });
    }
  }
}
