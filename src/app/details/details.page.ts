import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss']
})

export class DetailsPage {
  cards:any;  

  card_code:number;
  cardDetails:any={
    code: "",
    descriptions: "",
    image: "",
    images:"",
    suit: "",
    value: ""
  }

  show_please_wait_message:boolean=false;

 constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.params.subscribe( params => {
        this.card_code = params.cardCode;
    });
 }

 //when this will load
  ionViewWillEnter(){     
    this.get_cards();

    setTimeout(()=>{
      this.get_card_details();
    },500);
  }

 //get all cards list
  get_cards(){
    this.apiService.get_cards().subscribe((response)=>{
      if(response['_body']){
          let data = JSON.parse(response['_body']); 
          this.cards=data.cards;

          //add description into every card
          this.cards.forEach(card => {
              card.descriptions="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
          });
      }
    })
  }


 //get card details based on card id
 get_card_details(){
    this.show_please_wait_message=true;

    setTimeout(()=>{
        this.show_please_wait_message=false;
        for(let card of this.cards) {
            if (card.code == this.card_code) {
                this.cardDetails=card;
            }
        };
    },500);
 }
}
