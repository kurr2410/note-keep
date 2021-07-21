import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.css']
})
export class NoteCardsComponent implements OnInit {

  @Input() note: any = [];
  @Output() deleteId: EventEmitter<any> = new EventEmitter();
  @Output() editNote: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  delete(id) {
    this.deleteId.emit(id);
  }
  edit(note) {
    this.editNote.emit(note);
  }
}
