import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable()
export class EmailTaken implements AsyncValidator {
    constructor(private angularFireAuth: AngularFireAuth) { }

    validate(control: AbstractControl<any, any>): Promise<ValidationErrors> | Observable<ValidationErrors> {
        throw new Error("Method not implemented.");
    }

}


