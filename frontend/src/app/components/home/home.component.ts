import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[];

  constructor( private authService: AuthService, private router: Router, private postService: PostService ) { }

  ngOnInit() {
    this.getPosts();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  getPosts() {
    this.postService.getAllPost().subscribe((result) => {
      this.posts = result['data'];
      console.log( this.posts );
    });
  }

}
