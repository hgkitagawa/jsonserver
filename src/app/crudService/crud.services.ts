import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class crudServices{
    //postUrl = 'https://my-json-server.typicode.com/hgkitagawa/Jserver/contact';
    postUrl = 'http://localhost:3000/contact';

    constructor(private http:HttpClient){}


    create(postData){
        return this.http.post(this.postUrl,postData)
        .subscribe(responseData => {
            console.log(responseData);
        })
    }

    read(){
        var data;
        this.http.get(this.postUrl)
        .pipe(map(responseData => {
            return responseData;
        }))
        .subscribe(posts => {
            //...
            data = posts;
        });
        console.log("data",data);
    }
}