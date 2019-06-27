import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  selectValue: any;
  constructor( public router: Router){}

  ngOnInit() {
  }
  Submit(){
    console.log(this.selectValue);

    if(this.selectValue == "" || this.selectValue== undefined){
      alert("select value");
    }
    else{
      this.router.navigate(['/home'], { queryParams: { value: this.selectValue } } );
    }
  }

}
