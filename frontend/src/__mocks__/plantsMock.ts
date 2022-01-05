import { Plant } from "../types";

const plantsMock: Plant[] = [
  {
    id: 1,
    name: "Monstera Deliciosa - Swiss Cheese Plant",
    image: "/images/monstera_deliciosa.jpg",
    price: "70.00",
    potSize: "24 cm",
    description:
      "Monstera Deliciosa is a hugely popular plant and has been for a long time. Commonly known as the Swiss Cheese plant due to the holes in its beautiful leaves. With its lush foliage, this is the ultimate tropical plant, ideal for anyone from beginner to plant pro. Monstera Deliciosa's are easy-going and an avid grower when looked after. \r\n\r\nKnown for its “Swiss cheese” style holes in its leaves - these plants leaves will grow as normal, and over time the tallest reaching one's will develop holes to allow light to travel through the plant to the underneath foliage.\r\n\r\nNative to South America, and part of Araceae, the aroid family. It can reach up to 70ft in its natural environment!",
    countInStock: 3,
    filterByPlantSize: "Large",
    filterByLightRequirements: "Bright Indirect",
    light:
      "Requires a bright, well-lit space but can handle moderate light. Avoid direct sunlight which may harm the leaves.",
    water:
      "Allow the soil to dry out slightly in between waterings. You can use your fingers to feel how dry the soil is before watering. On average once every 1-2  weeks, and increased in the warmer months.",
    tips: "You can maintain your Monstera’s growth by using a stake or tying the stalks up together. \r\n\r\nThis will help train the plant in the direction you want.",
    toxicity:
      "This plant is toxic if ingested so keep away from small children and pets.",
    createdAt: "2021-12-06T00:37:09.984338Z",
    userId: 1,
  },
  {
    id: 2,
    name: "Aloe Vera - Petite",
    image: "/images/aloe_vera_6_cm.jpg",
    price: "5.00",
    potSize: "6 cm",
    description:
      "Our petite plants are a charming little version of the larger varieties. \r\n\r\nAloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant’s central stem. The margin of the leaf is serrated with small teeth.",
    countInStock: 10,
    filterByPlantSize: "petite",
    filterByLightRequirements: "bright direct",
    light:
      "Place in bright direct sunlight. A southern or western window is ideal. Aloe veras that are kept in low light often grow leggy.",
    water:
      "Water aloe plant about every 2-3 weeks in the spring and summer and even more sparingly during the fall and winter. One rule of thumb for fall and winter watering is to roughly double the amount of time between waterings - if you water every two weeks in summer, water every four weeks in winter.",
    tips: "Aloe vera does best in temperatures between 13 and 27°C. The temperatures of most homes and apartments are ideal. From May to September, you can bring your plant outdoors without any problems, but do bring it back inside in the evening if nights are cold.",
    toxicity:
      "Aloe vera is mildly toxic to dogs and cats when ingested, which may result in vomiting and diarrhea.",
    createdAt: "2021-12-08T16:56:54.860480Z",
    userId: 1,
  },
  {
    id: 3,
    name: "Aloe Vera",
    image: "/images/aloe_vera_9_cm.jpg",
    price: "15.00",
    potSize: "9 cm",
    description:
      "Aloe vera is a succulent plant species of the genus Aloe. The plant is stemless or very short-stemmed with thick, greenish, fleshy leaves that fan out from the plant’s central stem. The margin of the leaf is serrated with small teeth.",
    countInStock: 10,
    filterByPlantSize: "small",
    filterByLightRequirements: "bright direct",
    light:
      "Place in bright direct sunlight. A southern or western window is ideal. Aloe veras that are kept in low light often grow leggy.",
    water:
      "Water aloe plant about every 2-3 weeks in the spring and summer and even more sparingly during the fall and winter. One rule of thumb for fall and winter watering is to roughly double the amount of time between waterings - if you water every two weeks in summer, water every four weeks in winter.",
    tips: "Aloe vera does best in temperatures between 13 and 27°C. The temperatures of most homes and apartments are ideal. From May to September, you can bring your plant outdoors without any problems, but do bring it back inside in the evening if nights are cold.",
    toxicity:
      "Aloe vera is mildly toxic to dogs and cats when ingested, which may result in vomiting and diarrhea.",
    createdAt: "2021-12-08T17:08:04.181133Z",
    userId: 1,
  },
  {
    id: 4,
    name: "Aloe Vera Mix",
    image: "/images/aloe_vera_spike.jpg",
    price: "10.00",
    potSize: "6 cm",
    description:
      "Our petite plants are a charming little version of the larger varieties. \r\n\r\nThis dwarf version of Aloe has strong sturdy leaves arranged in rosettes with fine yellow-white serrations. Originates from Africa; this amazing plant is also known as the medicine plant due to the healing powers of the sap in its succulent leaves. Aloe also makes a great houseplant, it is very easy to grow and will thrive on any sunny windowsill with the minimum of effort.",
    countInStock: 10,
    filterByPlantSize: "petite",
    filterByLightRequirements: "bright direct",
    light:
      "Medium to high. As bright as you can get without direct sunlight, that could burn their leaves.",
    water:
      "Rare and plenty. Like other succulents it doesn't need a lot of water - let the soil dry out completely before you water again. Try to avoid leaves when watering.",
    tips: "The temperatures of most homes and apartments are ideal. From May to September, you can bring your plant outdoors without any problems, but do bring it back inside in the evening if nights are cold.",
    toxicity:
      "Aloe vera is mildly toxic to dogs and cats when ingested, which may result in vomiting and diarrhea.",
    createdAt: "2021-12-08T17:23:02.888882Z",
    userId: 1,
  },
  {
    id: 5,
    name: "Chamaedorea Elegans - Parlour Palm (9 cm)",
    image: "/images/chamaedorea_elegans_9cm.jpg",
    price: "11.00",
    potSize: "9 cm",
    description:
      "Parlour Palms are one of the most popular houseplants worldwide. Its easy maintenance and elegant appearance help us understand why. \r\n\r\nIts dainty, long fronds and light green appearance brighten up any space. They gained popularity in Victorian times, being displayed in the Parlor room alongside other finery. \r\n\r\nNative to the rainforests of Southern Mexico and Guatemala, they are a species of a small Palm tree.\r\n\r\nAn excellent beginner plant, as they are very tolerable. Parlour Palms are a true vintage gem.\r\n\r\nParlor Palm is part of our pet-friendly range and is not toxic for people or pets.",
    countInStock: 10,
    filterByPlantSize: "small",
    filterByLightRequirements: "shade",
    light:
      "They require a bright, well-lit space but can tolerate low lighting conditions. Just be sure to avoid direct sunlight.",
    water:
      "Water when the soil starts to feel dry, but avoid overwatering. Soil is best kept moist, not drenched. Mist occasionally",
    tips: "A slow-growing plant but it can reach 150cm in height. We advise feeding this plant with fertilizer occasionally during the summer growing period, but not during the winter.",
    toxicity:
      "Parlour Plam is child and pet-friendly and is not toxic for people or pets.",
    createdAt: "2021-12-08T17:28:06.374466Z",
    userId: 1,
  },
  {
    id: 6,
    name: "Chamaedorea Elegans - Parlour Palm - Medium",
    image: "/images/chamaedorea_elegans.jpg",
    price: "40.00",
    potSize: "17 cm",
    description:
      "Parlor Palms are one of the most popular houseplants worldwide. Its easy maintenance and elegant appearance help us understand why. \r\n\r\nIts dainty, long fronds and light green appearance brighten up any space. They gained popularity in Victorian times, being displayed in the Parlor room alongside other finery. \r\n\r\nNative to the rainforests of Southern Mexico and Guatemala, they are a species of a small Palm tree. An excellent beginner plant, as they are very tolerable. Parlor Palm is a true vintage gem.",
    countInStock: 10,
    filterByPlantSize: "medium",
    filterByLightRequirements: "shade",
    light:
      "They require a bright, well-lit space but can tolerate low lighting conditions. Just be sure to avoid direct sunlight.",
    water:
      "Water when the soil starts to feel dry, but avoid overwatering. Soil is best kept moist, not drenched. Mist occasionally",
    tips: "A slow-growing plant but it can reach 1.5m in height. We advise feeding this plant with fertilizer occasionally during the summer growing period, but not during the winter.",
    toxicity:
      "Parlour Plam is child and pet-friendly and is not toxic for people or pets.",
    createdAt: "2021-12-08T17:30:31.573904Z",
    userId: 1,
  },
  {
    id: 7,
    name: "Dracaena Marginata Tricolor - Dragon Tree",
    image: "/images/dracaena_marginata_tricolor.jpg",
    price: "15.00",
    potSize: "15 cm",
    description:
      "Hailing from tropical Africa, the Dragon Tree is an iconic house plant worthy of any collection. Long sword-like leaves with red edges make this an eye-catching structural plant. Many species of the Dragon Tree family produce a red sap, known as 'dragon's blood' hence this plant's striking name. \r\n\r\nThese indoor plants are an excellent option for beginners looking for a plant to add life to a home office, bathroom or living room.\r\n\r\nDragon Tree is the type of plant that will not mind being forgotten about for a few weeks.",
    countInStock: 10,
    filterByPlantSize: "medium",
    filterByLightRequirements: "moderate",
    light:
      "These house plants prefer a bright spot but can tolerate lower light conditions. Avoid direct sunlight as the leaves are prone to browning.",
    water:
      "The Dragon tree is very drought tolerant and only needs to be watered when the top half of the soil is dry, which can take 3 weeks or more depending on the environment it resides in. Avoid overwatering this plant; brown leaf tips are often a sign of overwatering.",
    tips: "While not a necessity, Dragon trees prefer to be misted occasionally or kept in more humid environments such as a bathroom.\r\n\r\nDragon trees are a very slow-growing plant that can reach roughly 6ft tall.",
    toxicity: "This plant is toxic if ingested.",
    createdAt: "2021-12-08T17:48:53.222054Z",
    userId: 1,
  },
];

export default plantsMock;
