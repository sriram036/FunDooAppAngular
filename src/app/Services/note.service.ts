import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  tokenLocal: string = '';
  
  constructor(private http : HttpClient) { }

  getNotes(token : string){
    this.tokenLocal = localStorage.getItem('FunDooToken') || '';
    console.log(this.tokenLocal);
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenLocal}`
      })
    }
    return this.http.get<any>('https://localhost:44370/api/Notes/GetNotesById',header);
  }

  saveNote(data:any,token:string){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenLocal}`
      })
    }
    return this.http.post('https://localhost:44370/api/Notes/CreateNote',data,header);
  }

  pinNote(data:number,token:string){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenLocal}`
      })
    }
    return this.http.put('https://localhost:44370/api/Notes/PinNote?notesid=' + data , null, header);
  }

  archiveNote(data:number,token:string){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenLocal}`
      })
    }
    return this.http.put('https://localhost:44370/api/Notes/ArchiveNote?notesid='+data,null,header);
  }

  updateNote(note:INotes, token:string){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenLocal}`
      })
    }
    console.log(note);
    return this.http.put('https://localhost:44370/api/notes/UpdateNote?notesid='+note.notesId, note, header);
  }

  addColour(data:number, color:string, token: string){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenLocal}`
      })
    }
    console.log(color);
    let noteModel={'notesId':data,'colour':color};
    let url: string = 'https://localhost:44370/api/notes/AddColour';
    return this.http.put(url,noteModel,header);
  }

  deleteForever(data:number,token:string){
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenLocal}`
      })
    }
    console.log(data);
    return this.http.delete('https://localhost:44370/api/Notes/DeleteNote?notesid=' + data, header);
  }

  trashNote(data: number, token: string) {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenLocal}`
      })
    }
    return this.http.put('https://localhost:44370/api/Notes/TrashNote?notesid=' + data, null, header);
  }
}
