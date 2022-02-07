import { Component, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  faClock= faClock;
  private daysArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  private date = new Date();
  public hour: any;
  public minute?: string;
  public second?: string;
  public day?: string;
  public ampm?: string;

  today= new Date();
  jstoday = '';
  constructor() { 
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+01');
  }

  ngOnInit(): void {
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);
    this.day = this.daysArray[this.date.getDay()]
  }

  updateDate(date: any){
    const hours = date.getHours(); //get hr from Date method
    this.ampm = hours >= 12 ? 'PM': 'AM';

    this.hour = hours % 12; // convert to 12hr

    this.hour = this.hour ? this.hour : 12; //if hr is 0 , add 120

    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;
    
    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' +  minutes : minutes.toString();

    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' +  seconds : seconds.toString();
  }
}
