import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataForm: FormGroup;
  value: any
  dis: boolean = false;
  public basicdata: any = [];
  public premiumdata: any = [];
  constructor(public router: ActivatedRoute, public fb: FormBuilder) { }

  ngOnInit() {
    this.dataForm = this.fb.group({
      data: ['', [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)]]
    })
    this.router.queryParams.subscribe(params => {
      this.value = params['value'];
    });
    if(localStorage.getItem('basicdata')){
      this.basicdata = localStorage.getItem('basicdata');
    }
    if(localStorage.getItem('premiumdata')){
      this.premiumdata = localStorage.getItem('premiumdata');
    }
    console.log(this.basicdata);
    console.log(this.premiumdata);
  }
  submit(){
    if(this.dataForm.invalid){
      alert("invalid data");
    }
    else{
      if(this.value == 'basic'){
        if(this.basicdata.length < 5){
          this.basicdata.push(JSON.stringify(this.dataForm.value.data))
          // localStorage.setItem('basicdata', this.basicdata)
          
          this.dataForm.reset();
        }
        else{
          alert("limit crossed");
        }
      }
      else{
        if(this.premiumdata.length < 10){
          this.premiumdata.push(this.dataForm.value.data)
          // localStorage.setItem('premiumdata', JSON.stringify(this.premiumdata))
          this.dataForm.reset();
        }
        else{
          alert("limit crossed");
        }
      }
    }

    
  }
  fun(){
    if(this.dataForm.invalid){
      this.dis = false;
    }
    else{
      this.dis = true;
    }
  }

  save(){
    alert("data storing inprocess");
    if(this.value == 'basic'){
      if(this.basicdata.length < 5){
        if(!this.dataForm.invalid){
          this.basicdata.push([this.dataForm.value.data])
        }
      }
      localStorage.setItem('basicdata', this.basicdata)
    }
    else{
      if(this.premiumdata.length < 10){
        if(!this.dataForm.invalid){
          let a =[];
          a.push(this.dataForm.value.data)
          console.log(a);
          this.premiumdata.push(this.dataForm.value.data)
        }
      }
      localStorage.setItem('premiumdata', this.premiumdata)
    }
  }

  delete(i){
    if(this.value == 'basic'){
      this.basicdata.splice(i,1);
    }
    else{
      this.premiumdata.splice(i,1);
    }
  }

}
