import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Friendship } from 'src/types';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  getFriendships() {
    return this.http.get<Friendship[]>(`/api/friendships/?auth_user=${this.userService.currentUser.value?.username}`)
  }

  getFriendship(username: string) {
    return this.http.get<Friendship[]>(`/api/friendships/?auth_user=${username}`).pipe(
      map(fs => fs.filter(f =>
        f.from_auth_user === this.userService.currentUser.value?.id ||
        f.to_auth_user === this.userService.currentUser.value?.id)
      ), // TODO: Temporary, as long as users see all friends, not just their own
      map(f => f.length ? f[0] : undefined)
    )
  }

  // Friend requests

  getFriendRequests() {
    return this.http.get<Friendship[]>(`/api/friendships/?to_auth_user=${this.userService.currentUser.value?.id}&status=1`)
  }

  getSentFriendRequests() {
    return this.http.get<Friendship[]>(`/api/friendships/?from_auth_user=${this.userService.currentUser.value?.id}&status=1`)
  }

  sendFriendRequest(userId: number) {
    // return this.http.post<Friendship>(`/api/users/${userId}/add-friend/`, { from_auth_user: this.userService.currentUser.value?.id })

    return this.http.post<Friendship>(`/api/friendships/`, {
      from_auth_user: this.userService.currentUser.value?.id,
      to_auth_user: userId,
      friendship_status: 1,
    })

  }

  acceptFriendRequest(request: Friendship) {
    return this.http.post<Friendship>(`/api/friendships/${request.id}/accept/`, {})
  }

  declineFriendRequest(request: Friendship) {
    // return this.http.post(`/api/friendships/${request.id}/decline/`, {})
    return this.http.delete(`/api/friendships/${request.id}/`)
  }

  // Friends

  getFriends() {
    return this.http.get<Friendship[]>(`/api/friendships/?auth_user=${this.userService.currentUser.value?.username}&status=2`)
  }

  getFriendsByUser(username: string) {
    return this.http.get<Friendship[]>(`/api/friendships/?auth_user=${username}&status=2`)
  }

  removeFriend(friend: Friendship) {
    return this.http.delete(`/api/friendships/${friend.id}/`)
  }


  // temp
  otherUser(friend?: Friendship) {
    const otherId = friend?.from_auth_user === this.userService.currentUser.value?.id
      ? friend?.to_auth_user : friend?.from_auth_user

    return this.userService.getUser(otherId ?? -1)
  }

}
