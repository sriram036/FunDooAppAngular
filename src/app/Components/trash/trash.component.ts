import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/Services/note.service';
import { UserService } from 'src/app/Services/user.service';

interface INotes {
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

interface IData {
  id: number,
  option: number
}

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(private notes: NoteService, private User: UserService) { }

  @Input() newAddedNote: INotes[] = [];

  trashList: INotes[] = [];
  
  ngOnInit(): void {
    this.trashList = this.newAddedNote.filter(data => data.isTrash == true);
    console.log(this.trashList);
  }

  token: string = '';
  
  @Output() dataEvent = new EventEmitter<IData>();

  archiveOrDelete(id: number, option: number) {
    if (option == 1) {
      this.User.newToken.subscribe(data => {
        this.token = data;
      });
      this.notes.archiveNote(id, this.token).subscribe((result) => {
        console.log(result);
      });
      let data = { 'id': id, 'option': option }
      this.dataEvent.emit(data);
    }
    else if (option == 2) {
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

  deleteForever(id:number){
    this.User.newToken.subscribe(data => {
      this.token = data;
    });
    this.notes.deleteForever(id, this.token).subscribe((result) => {
      console.log(result);
    });
    let index: number = this.newAddedNote.findIndex(data => data.notesId == id)
    this.newAddedNote.splice(index, 1);
  }
}
