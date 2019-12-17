import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';
import { AddPostService } from '../../services/add-post.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  submitted = false;
  post: Post = new Post('', '');
  @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private addPostService: AddPostService,
    private commonService: CommonService
  ) {
    this.commonService.postToEdit_Observable.subscribe(res => {
      this.setPostToEdit();
    });
    this.commonService.postToAdd_Observable.subscribe(res => {
      this.setPostToEdit();
    });
  }

  setPostToEdit() {
    this.post = this.commonService.postToEdit;
    this.postForm = this.formBuilder.group({
      title: [this.post.getTitle(), Validators.required],
      text: [this.post.getText(), Validators.required]
    });
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  get f() { return this.postForm.controls; }

  resetForm() {
    this.f.title.setValue('');
    this.f.text.setValue('');
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.postForm.invalid) {
        return;
    }

    this.post.setTitle(this.f.title.value);
    this.post.setText(this.f.text.value);

    if (this.post.getId() === '') {
      this.addPostService.addPost( this.post ).subscribe( (result) => {
        if (result['status'] === 'success') {
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        } else {
          console.log( 'Error adding post' );
        }
      });
    } else {
      this.addPostService.updatePost( this.post ).subscribe( (result) => {
        if (result['status'] === 'success') {
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        } else {
          console.log( 'Error adding post' );
        }
      });
    }
  }

}
