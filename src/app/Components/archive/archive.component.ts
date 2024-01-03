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
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(private notes: NoteService, private User: UserService) { }

  @Input() newAddedNote: INotes[] = [];
  
  archiveList: INotes[]=[];
  ngOnInit(): void {
    this.archiveList = this.newAddedNote.filter(data => data.isArchive == true);
    console.log(this.archiveList);
  }

  @Output() dataEvent = new EventEmitter<IData>();
  
  token: string = '';
  
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
}
