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
      textTitle: 'SUR LE MONT CHAUVE',
      imgPath: 'assets/img/PROPRIETE/hamac_1920.jpg',
      link: '/monte-tezio',
      paragraphs: [
        'Sur la route de crête entre Preggio et Castel Rigone, vous pouvez admiré l’immense paysage qui s’ouvre vers la chaîne des Appenins. ',
        'Au premier plan vous apercevez le Monte Tezzio à l’allure de gros bison endormi. Chaussez vos bottines, partez tôt en été, dans le sac : eau, saucisson, pecorino, pane et gressini. Les plus valeureux monteront avec une bouteille de grechetto. ',
        'L’ascension par le petit chemin qui démarre à gauche de la maison forestière est charmant. Le paysage s’ouvre lentement et on accède au sommet décoiffé et décoiffant (les jours de vent) en maudissant les quelques excès de table auxquels vous vous êtes peut-être livrés ces derniers jours. ',
        'À chaque saison, on trouve un coin sympa, le grechetto achèvera de rendre cette journée mémorable. Tant pis si vous l’avez laissé dans le frigo à Preggio, il fera alors l’affaire au bord de la piscine.',
      ],
      imgs: [
        'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1171_1200.jpg',
        'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1223_1200.jpg',
        'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1230_1200.jpg',
        'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1236_1200.jpg',
        'assets/img/DECOUVERTES/MONTE-TEZIO/MonteTezio_IMG_1274_1200.jpg',
      ],
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
