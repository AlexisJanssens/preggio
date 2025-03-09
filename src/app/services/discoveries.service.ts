import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ce service est disponible dans toute l'application
})
export class DiscoveriesService {
  discoveriesList = [
    {
      title: 'Umbria Jazz',
      imgPath: 'assets/img/PROPRIETE/hamac_1920.jpg',
      link: '/umbria-jazz',
      content:
        'Umbria Jazz is a music festival that takes place in Perugia, Italy, and has been held annually since 1973. It is one of the most important jazz festivals in the world.',

      paragraphes: [
        { title: 'lkjlk', content: 'qlksjdflkjqslkdfj' },
        { title: 'lkjlk', content: 'qlksjdflkjqslkdfj' },
      ],
    },
    {
      title: 'Monte Tezio',
      imgPath: 'assets/img/PROPRIETE/hamac_1920.jpg',
      link: '/monte-tezio',
      content:
        'Monte Tezio is a mountain in the Apennines, located in the Umbria region of Italy. It is known for its beautiful views and hiking trails.',
    },
    {
      title: 'Fra Angelico',
      imgPath: 'assets/img/PROPRIETE/hamac_1920.jpg',
      link: '/fra-angelico',
      content:
        'Fra Angelico was an Italian painter of the Early Renaissance, known for his frescoes and altarpieces. He was a Dominican friar and is considered one of the greatest artists of his time.',
    },
    {
      title: 'Funghi Porcini',
      imgPath: 'assets/img/PROPRIETE/hamac_1920.jpg',
      link: '/funghi-porcini',
      content:
        'Funghi Porcini are a type of mushroom that is highly prized in Italian cuisine. They have a rich, meaty flavor and are often used in pasta dishes, risottos, and sauces.',
    },
  ];

  constructor() {}

  getDiscoveries() {
    return this.discoveriesList;
  }

  getDiscoveryByLink(link: string) {
    return this.discoveriesList.find((d) => d.link === `/${link}`);
  }
}
