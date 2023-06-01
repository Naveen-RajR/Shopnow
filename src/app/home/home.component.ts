import { HttpErrorResponse } from '@angular/common/http';
import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  currentTime: Date = new Date();

  ngOnInit(): void {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  accordion = [
    {
      title: 'section 1',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita alias consequuntur, provident debitis cupiditate quasi corporis iusto assumenda blanditiis libero.',
    },
    {
      title: 'section 2',
      content:
        'Get rewarded for sharing talented candidates with the company. If any individual you refer for an openposition is hired, you will be eligible to earn double the referral bonus.',
    },
    {
      title: 'section 3',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita alias consequuntur, provident debitis cupiditate quasi corporis iusto assumenda blanditiis libero.',
    },
  ];

  view_accordion = 'view_0';

  changeAccordion(ac: any) {
    this.view_accordion = ac;
  }


}

