import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isDragover = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please Wait! Your clip is being uploaded.';
  isSubmission = false;
  percentage = 0;
  showPercentage = false;


  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ], nonNullable: true
  });
  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  storeFile($event: Event) {
    this.isDragover = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      return
    }

    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )

    this.nextStep = true;
  }

  uploadFile() {
    /* console.log('file uploaded'); */
    // for generating a random id
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please Wait! Your clip is being uploaded.';
    this.isSubmission = true;
    this.showPercentage = true;


    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    const task = this.storage.upload(clipPath, this.file);
    task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100
    })
    task.snapshotChanges().pipe(
      last()
    ).subscribe({
      next: (snapshot) => {
        this.alertColor = 'green'
        this.alertMsg = 'success! Your clips is now ready to share with the world'
        this.showPercentage = false
      },
      error: () => {
        this.alertColor = 'red'
        this.alertMsg = 'upload failed! please try again later'
        this.isSubmission = true
        this.showPercentage = false
      }
    })

  }
}
