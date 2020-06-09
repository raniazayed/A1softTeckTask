import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../../services/users-list.service';
import { ActivatedRoute } from '@angular/router';
import { ErrService } from 'src/app/shared/components/err/err.service';

export class ResponseModel {
  data: any;
} 
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  userId: string;
  userDetails: object;
  loading: boolean;

  constructor(private userListService: UsersListService,
    private route:ActivatedRoute,
    private errService:ErrService) { }

  ngOnInit() {
    this.readRoute();
  }
  readRoute(){
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.getUserDetails(this.userId);
    });
  }
  // Get User Detail
  getUserDetails(userId) {
    return this.userListService.getUserDetails(userId).subscribe((res:ResponseModel)=>{
      this.userDetails = res.data;
    }, err => {
      this.errService.changeMessage("This user doesn't exist")
      this.loading = false;
    })
  }
  //Delete User
  deleteUser(userId){
    this.loading = true;
    return this.userListService.deleteUser(userId).subscribe(res=>{
      this.errService.changeMessage("You can't delete this user")
    }, err => {
      this.errService.changeMessage(err.error.error)
      this.loading = false;
    })
  }
}
