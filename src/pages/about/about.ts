import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public quotes = [
    `“Adventure is worthwhile.” – Aesop`,
    `“For my part, I travel not to go anywhere, but to go. I travel for travel’s sake. The great affair is to move.” – Robert Louis Stevenson`,
    `“Traveling – it leaves you speechless, then turns you into a storyteller.” – Ibn Battuta`,
    `“We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin`,
    `“A journey is best measured in friends, rather than miles.” – Tim Cahill`,
    `“The gladdest moment in human life, me thinks, is a departure into unknown lands.” – Sir Richard Burton`,
    `“No place is ever as bad as they tell you it’s going to be.” – Chuck Thompson`,
    `“I am not the same, having seen the moon shine on the other side of the world.” – Mary Anne Radmacher`,
    `“Travel makes one modest. You see what a tiny place you occupy in the world.” – Gustave Flaubert`,
    `“To awaken alone in a strange town is one of the pleasantest sensations in the world.” – Freya Stark`,
    `“The life you have led doesn’t need to be the only life you have.” – Anna Quindlen`,
    `“The world is a book, and those who do not travel read only one page.” – Saint Augustine`,
    `“Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did do.” – Mark Twain`,
    `“Travel and change of place impart new vigor to the mind.” – Seneca`
  ];

  public quoteOfTheDay;

  constructor(public navCtrl: NavController) {
    this.quoteOfTheDay = this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }

}
