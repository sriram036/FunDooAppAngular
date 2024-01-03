import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { note: INotes }, private User: UserService, private notes: NoteService) { }
  
  ngOnInit(): void {
    console.log(this.data);
    this.title = this.data.note.title;
    this.description = this.data.note.description;
  }

  title: string = '';
  description: string = '';
  token:string = '';

  editData(){
    console.log("Edit Data Works");
    this.User.newToken.subscribe(data => {
      this.token = data;
    });
    this.data.note.title = this.title;
    this.data.note.description = this.description;
    console.log(this.data);
    this.notes.updateNote(this.data.note, this.token).subscribe((result) => {
      console.log(result);
    });
  }

}
