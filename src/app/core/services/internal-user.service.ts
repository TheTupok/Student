import {Injectable} from "@angular/core";
import {User, UsersService} from "./swagger-gen";
import {Observable, of} from "rxjs";
import {StorageUserService} from "./users-local.service";

@Injectable({providedIn: "root"})

export class InternalUserService {
  constructor(
    private userService: UsersService,
    private storageUserService: StorageUserService
  ) {
  }

  public getAllStudents(isRealServer: boolean, searchTerm: string): Observable<User[]> {
    if (isRealServer) {
      return this.userService.getAllStudents(searchTerm)
    } else {
      return of(this.storageUserService.getAll(searchTerm))
    }
  }

  public createStudent(isRealServer: boolean, data: User): Observable<number> {
    if (isRealServer) {
      return this.userService.createStudent(data)
    } else {
      return this.storageUserService.createUser(data)
    }
  }

  public editStudent(isRealServer: boolean, data: User): Observable<boolean> {
    if (isRealServer) {
      return this.userService.updateStudent(data)
    } else {
      return this.storageUserService.editUser(data)
    }
  }

  public deleteById(isRealServer: boolean, id: number): Observable<boolean> {
    if (isRealServer) {
      return this.userService.deleteStudentById(id)
    } else {
      return this.storageUserService.deleteById(id)
    }
  }
}
