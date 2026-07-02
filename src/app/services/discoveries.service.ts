import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Discovery } from '../models/discovery.model';

const DISCOVERIES: Discovery[] = [
  {
    title: 'Umbria Jazz',
    imgPath: 'assets/img/PROPRIETE/hamac_1920.jpg',
    link: 'umbria-jazz',
    content:
      'Umbria Jazz is a music festival that takes place in Perugia, Italy, and has been held annually since 1973. It is one of the most important jazz festivals in the world.',
    order: 0,
  },
  {
    title: 'Monte Tezio',
    textTitle: 'SUR LE MONT CHAUVE',
    imgPath: 'assets/img/PROPRIETE/hamac_1920.jpg',
    link: 'monte-tezio',
    paragraphs: [
      "Sur la route de crête entre Preggio et Castel Rigone, vous pouvez admiré l'immense paysage qui s'ouvre vers la chaîne des Appenins.",
      "Au premier plan vous apercevez le Monte Tezzio à l'allure de gros bison endormi. Chaussez vos bottines, partez tôt en été, dans le sac : eau, saucisson, pecorino, pane et gressini.",
      "L'ascension par le petit chemin qui démarre à gauche de la maison forestière est charmant. Le paysage s'ouvre lentement et on accède au sommet décoiffé et décoiffant.",
      "À chaque saison, on trouve un coin sympa, le grechetto achèvera de rendre cette journée mémorable.",
    ],
    imgs: [
      'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1171_1200.jpg',
      'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1223_1200.jpg',
      'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1230_1200.jpg',
      'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1236_1200.jpg',
      'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1274_1200.jpg',
    ],
    order: 1,
  },
  {
    title: 'Fra Angelico',
    imgPath: 'assets/img/PROPRIETE/hamac_1920.jpg',
    link: 'fra-angelico',
    content:
      'Fra Angelico was an Italian painter of the Early Renaissance, known for his frescoes and altarpieces. He was a Dominican friar and is considered one of the greatest artists of his time.',
    order: 2,
  },
  {
    title: 'Funghi Porcini',
    imgPath: 'assets/img/PROPRIETE/hamac_1920.jpg',
    link: 'funghi-porcini',
    content:
      'Funghi Porcini are a type of mushroom that is highly prized in Italian cuisine. They have a rich, meaty flavor and are often used in pasta dishes, risottos, and sauces.',
    order: 3,
  },
];

@Injectable({ providedIn: 'root' })
export class DiscoveriesService {
  getDiscoveries(): Observable<Discovery[]> {
    return of([...DISCOVERIES].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
  }

  getDiscoveryByLink(link: string): Observable<Discovery | undefined> {
    return this.getDiscoveries().pipe(map((list) => list.find((d) => d.link === link)));
  }
}
