import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'puntoPrueba';
  data='../assets/js/bestSellingProducts.json';
  product:any;
  aux=new Array();
  start=new Array();

  constructor(private http: HttpClient) {
}

  ngOnInit(){
    this.getJSON().subscribe(data => {
      this.product=data;
      var suma=0;
      var contador=0;
      data.products.forEach(p => {
        data.resenas.forEach(r => {
          if(p.id==r.id){
            contador++;
            suma+=r.stars;
          }
        });
        var auxsuma=suma/contador;
        if(!auxsuma)auxsuma=0;
        for(var x=1;x<=5;x++){
          if(x<=auxsuma){
            this.start.push({"id": p.id ,"start": true,"value":auxsuma});
          }else{
            this.start.push({"id": p.id ,"start": false,"value":auxsuma});

          }

        }
        suma=0;contador=0;
      });
      console.log(this.start);
  });
}
  public getJSON(): Observable<any> {
    return this.http.get(this.data);
  }
}