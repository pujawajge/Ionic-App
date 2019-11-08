import { Component } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage {
  card_list:any;
  cards:any;
  show_please_wait_message:boolean=false;
  hideInfiniteScroll:boolean=false;

  search_keyword:string;
  currentPage:number=1;
  perPageCard:number=12;

  constructor(private apiService: ApiService) {
    this.get_cards();
  }

  //get all cards list
  get_cards(){
    this.currentPage=1;
    this.show_please_wait_message=true;
    this.apiService.get_cards().subscribe((response)=>{
      this.show_please_wait_message=false;
      if(response['_body']){
          let data = JSON.parse(response['_body']); 
          this.card_list = data.cards;

          //add description into every card
          this.card_list.forEach(card => {
              card.descriptions="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
          });
          
          //get first 12 cards record
          this.cards=  this.card_list.slice(0, this.perPageCard);
      }
    })
  }

  //get next cards list
  nextCards(infiniteScroll){
    setTimeout(()=>{
        this.currentPage++;
        let cardsLength = this.card_list.length;

       // calculate start and end item indexes
        let startIndex = (this.currentPage - 1) * this.perPageCard;
        let endIndex = Math.min(startIndex + this.perPageCard - 1, cardsLength - 1);

        // based on start and end indexes get cards to concat
          let nextCards = this.card_list.slice(startIndex, endIndex);    
          this.cards=  this.cards.concat(nextCards);  

          //hide infinite scroll if data not exist
          if(nextCards.length<=0){
              this.hideInfiniteScroll=true;
          }else{
              this.hideInfiniteScroll=false;
          }    
        infiniteScroll.target.complete(); 
    },1000);
  }



  //seach card form cards list based on card name
   get_search_cards(event: any) {
        const val = event.target.value.toLowerCase();
        if (val) {
            this.cards = this.card_list.filter((card) => {
                if(card.suit.toLowerCase().indexOf(val) > -1 || card.value.toLowerCase().indexOf(val) > -1 || card.code.toLowerCase().indexOf(val) > -1){
                  return true;
                }else{
                  return false;
                }
            })
        }else{
          this.cards = this.card_list;
        }
    }
}
