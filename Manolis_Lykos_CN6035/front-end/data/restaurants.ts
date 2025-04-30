export interface Restaurant {
  restaurant_id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
}

export const restaurants: Restaurant[] = [
  {
    restaurant_id: "1",
    name: "Bella Italia",
    description:
      "Authentic Italian cuisine with fresh pasta and wood-fired pizzas. Family-owned since 1982.",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Via Nino Bonnet, 11a, 20154 Milano MI, Italy",
  },
  {
    restaurant_id: "2",
    name: "Sakura Sushi",
    description:
      "Premium Japanese sushi and sashimi. All seafood is delivered fresh daily from local markets.",
    imageUrl:
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location:
      "Japan, 〒170-0001 Tokyo, Toshima City, Nishisugamo, 2 Chome−29 グリーンハイツ",
  },
  {
    restaurant_id: "3",
    name: "Spice Garden",
    description:
      "Flavorful Indian dishes with authentic spices. Vegetarian and vegan options available.",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Rue de l'Union 45, 1210 Saint-Josse-ten-Noode, Belgium",
  },
  {
    restaurant_id: "4",
    name: "Le Bistro",
    description:
      "Classic French cuisine with a modern twist. Enjoy our seasonal menu and extensive wine list.",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "7-1 Rue Léon Cosnard, 75017 Paris, France",
  },
  {
    restaurant_id: "5",
    name: "Taco Fiesta",
    description:
      "Authentic Mexican street food. Our handmade tortillas and fresh salsas will transport you to Mexico.",
    imageUrl:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    location: "Cam. Real, 98400 Los Ramírez, Zac., Mexico",
  },
];
