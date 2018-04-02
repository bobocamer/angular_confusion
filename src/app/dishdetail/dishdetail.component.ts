import { Component, OnInit, Inject  } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})



export class DishdetailComponent implements OnInit {


dish: Dish;
dishIds: number[];
prev: number;
next: number;  

commentForm: FormGroup;
comment: Comment;

formErrors = {
  'author': '',
  'rating': '',
  'comment': '',
  'date': ''
};

validationMessages = {
  'author': {
    'required': 'Name is required',
    'minlength':  'Name must be at least 2 characters long.',
    'maxlength': 'Name cannot be more than 25 characters long.'
  },

  'comment': {
    'required': 'comment is required',
    'minlength': 'Name must be at least 2 characters long.'
  },
 'date': {} 
}

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private BaseURL) { 
              this.createForm();
              }

  createForm() {
    this.commentForm = this.fb.group ({
      author: ['', Validators.required ],
      rating: '',
      comment: ['', Validators.required]
    })

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set validation messages now

  
  }

  onValueChanged(data?: any) {
        if (!this.commentForm) { return; }
        const form = this.commentForm;
       for (const field in this.formErrors) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }

      onSubmit() {
            this.comment = this.commentForm.value;
            this.comment.date = new Date().toISOString();
            this.dish.comments.push(this.comment);
            this.commentForm.reset({
              rating: 5,
              author: '',
              comment: ''
            });

      }
  
  


  ngOnInit() {

   this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
   this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    }

    setPrevNext(dishId: number) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index -1 )%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1 )%this.dishIds.length];
    }

  goBack(): void {
    this.location.back();
  }

}


