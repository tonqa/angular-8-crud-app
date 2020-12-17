import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Tutorial } from 'src/app/services/tutorial';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  tutorial = new Tutorial('', '', false);
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit() {
  }

  saveTutorial() {
    const data = new Tutorial(
      this.tutorial.title,
      this.tutorial.description,
      this.tutorial.published
    );

    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial() {
    this.submitted = false;
    this.tutorial = new Tutorial('', '', false);
  }

}
