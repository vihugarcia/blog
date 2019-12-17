import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

    public postToAdd_Observable = new Subject();

    public postAdded_Observable = new Subject();

    public postToEdit_Observable = new Subject();

    public postToDelete_Observable = new Subject();

    postToEdit: Post;
    postToDelete: Post;

    constructor() {
      this.postToEdit = new Post('', '');
    }

    notifyPostToAdd() {
        this.postToAdd_Observable.next();
    }

    notifyPostAddition() {
      this.postAdded_Observable.next();
    }

    notifyPostEdit() {
      this.postToEdit_Observable.next();
    }

    notifyPostDelete() {
      this.postToDelete_Observable.next();
    }

    setPostToAdd() {
      this.postToEdit = new Post('', '');
      this.postToEdit.setId('');
      this.notifyPostToAdd();
    }

    setPostToEdit(post) {
        this.postToEdit = new Post(post.title, post.text);
        this.postToEdit.setId(post._id);
        this.notifyPostEdit();
    }

    setPostToDelete(post) {
      this.postToDelete = new Post('', '');
      this.postToDelete.setId(post._id);
      this.notifyPostDelete();
    }
}
