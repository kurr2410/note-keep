import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Note } from '../noteModel';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("inputToFocus") inputElement: ElementRef;
  public content: any;
  public note: any = {};
  public arr: Array<any> = [];
  public url: any = "http://192.168.29.155:3000";
  public flag: boolean;

  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.fetch();
  }

  add() {
    if (this.content.trim()) {
      this.note = new Note();
      this.note["id"] = Math.random();
      this.note["content"] = this.content.trim();
      this.content = "";

      this.dataService.postData(this.url, this.note).subscribe(data => {
        this.arr = data;
      })
    }
    else {
      this.fetch();
    }
  }

  fetch() {
    this.dataService.getData(this.url).subscribe(data => {
      console.log(data)
      this.arr = data;
    })
  }

  delete(id) {
    this.dataService.deleteData(this.url, id).subscribe(data => {
      this.arr = data;
    })
  }

  edit(note) {
    this.content = note.content
    this.dataService.deleteData(this.url, note.id).subscribe(data => {
      // this.arr = data;
    })

    // this.dataService.editData(this.url, note.id).subscribe(data => {
    //   this.content=data.content  
    // })

    this.inputElement.nativeElement.focus()   // for autofocus when clicked on edit
  }


}
