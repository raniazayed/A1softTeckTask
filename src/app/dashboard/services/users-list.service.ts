import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private http:HttpClient) { }
  //Get users List
  getUsersList(pageNum):Observable<any>{
    return this.http.get('users' , {
      params: new HttpParams().set('page', pageNum)
  });
  }
  getUserDetails(userId){
    return this.http.get(`users/${userId}`)
  }
  addUser(userData){
    return this.http.post('users',userData)
  }
  editUser(userData){
    return this.http.put('users',userData)
  }
  deleteUser(userId){
    return this.http.delete(`users/${userId}`)
  }
}
