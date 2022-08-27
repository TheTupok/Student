import {Inject, Injectable} from "@angular/core";
import {LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";
import {of} from "rxjs";
import {User} from "./swagger-gen";


@Injectable({providedIn: "root"})

export class StorageUserService {
  storageUsersKey = 'Users'

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {

  }

  getAll(term: string) {
    const allUsers = this.storage.get(this.storageUsersKey);
    if (term != '' || term != null) {
      const searchTerm = term.toLowerCase();
      return allUsers.filter(
        (user: User) =>
          user?.name?.toLowerCase().includes(searchTerm) ||
          user?.group?.toLowerCase().includes(searchTerm) ||
          user?.course?.toLowerCase().includes(searchTerm)
      );
    } else {
      return this.storage.get(this.storageUsersKey);
    }
  }

  createUser(data: User) {
    const allUsers = this.storage.get(this.storageUsersKey);

    const newId = Math.max(0, ...allUsers.map((x: any) => x.id)) + 1;
    data['id'] = newId;
    allUsers.push(data)

    this.storage.set(this.storageUsersKey, allUsers);

    return of(newId)
  }

  editUser(data: User) {
    const allUsers = this.storage.get(this.storageUsersKey);
    const user = allUsers.find((x: User) => x.id === data.id);
    for (const key in user) {
      // @ts-ignore
      user[key] = data[key];
    }
    this.storage.set(this.storageUsersKey, allUsers);

    return of(true)
  }

  deleteById(id: number) {
    const allUsers = this.storage.get(this.storageUsersKey);

    this.storage.set(this.storageUsersKey,
      allUsers.filter((x: User) => x.id != id)
    )
    return of(true)
  }
}
