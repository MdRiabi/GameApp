import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable()
export class EmailTaken implements AsyncValidator {
    constructor(private angularFireAuth: AngularFireAuth) { }

    validate(control: AbstractControl): Promise<ValidationErrors | null> {
        return this.angularFireAuth.fetchSignInMethodsForEmail(control.value).then(
            response => response.length ? { emailTaken: true } : null

        )
    }

}

