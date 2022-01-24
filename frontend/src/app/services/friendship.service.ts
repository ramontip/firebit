import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Friendship, User} from 'src/types';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
  }

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

  // TODO: Refactor passing in the current user instead of getting it directly
  // because currentUser.value is still undefined by the time this is called in onInit of profile friends page
  getFriendRequests() {
    return this.http.get<Friendship[]>(`/api/friendships/?auth_user=${this.userService.currentUser.value?.username ?? ""}&status=1`)

    // return this.http.get<Friendship[]>(`/api/friendships/?to_auth_user=${this.userService.currentUser.value?.id ?? ""}&status=1`)
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

  // Also does reject
  declineFriendRequest(request: Friendship) {
    // return this.http.post(`/api/friendships/${request.id}/decline/`, {})
    return this.http.delete(`/api/friendships/${request.id}/`)
  }

  // Friends

  // TODO: Refactor see getFriendRequests() above
  getFriends(currentUser: User) {
    return this.http.get<Friendship[]>(`/api/friendships/?auth_user=${currentUser?.username ?? ""}&status=2`)

    // return this.http.get<Friendship[]>(`/api/friendships/?auth_user=${this.userService.currentUser.value?.username}&status=2`)
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
