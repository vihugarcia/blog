import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() read = true;
  @Input() admin = false;

  constructor( private commonService: CommonService ) { }

  ngOnInit() {
  }

  setPostToEdit(post) {
    this.commonService.setPostToEdit(post);
  }

  setPostToDelete(post) {
    this.commonService.setPostToDelete(post);
  }

}
