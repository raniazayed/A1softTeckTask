import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../../services/users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  pageNum: number = 0;
  total: number = 0;
  loading: boolean;
  usersList: any=[];
  constructor(private userslistService: UsersListService) { }

  ngOnInit() {
    this.getUsersList();
  }
  getUsersList(pageNum?) {
    this.pageNum = pageNum || 0;
    this.loading = true;
    this.userslistService.getUsersList(this.pageNum).subscribe(res=>{
      this.usersList = res.data;
      this.total = res.total;
      this.loading = false;
    }, err => {
      this.loading = false;
        throw err;
    })
  }
}
