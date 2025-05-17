'use client'

export const EMOJI_SIZE = "3xl"; // Can be: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl

export type Option = {
    index: number;
    option: string;
    codepoint: string;
    name: string;
    shortcode: string;
    verb: string;
}
export const options: Option[] = [
    { "index": 1, "option": "🐶", "codepoint": "U+1F436", "name": "Dog Face", "shortcode": ":dog:", "verb": "add a cute dog to the image" },
    { "index": 2, "option": "🐱", "codepoint": "U+1F431", "name": "Cat Face", "shortcode": ":cat_face:", "verb": "add a playful cat to the image" },
    { "index": 3, "option": "🐰", "codepoint": "U+1F430", "name": "Rabbit Face", "shortcode": ":rabbit:", "verb": "add a fluffy rabbit to the image" },
    { "index": 4, "option": "🐹", "codepoint": "U+1F439", "name": "Hamster", "shortcode": ":hamster:", "verb": "add a tiny hamster to the image" },
    { "index": 5, "option": "🐻", "codepoint": "U+1F43B", "name": "Bear Face", "shortcode": ":bear:", "verb": "add a friendly bear to the image" },
    { "index": 6, "option": "🐸", "codepoint": "U+1F438", "name": "Frog", "shortcode": ":frog:", "verb": "add a green frog to the image" },
    { "index": 7, "option": "🦊", "codepoint": "U+1F98A", "name": "Fox Face", "shortcode": ":fox:", "verb": "add a sly fox to the image" },
    { "index": 8, "option": "🐥", "codepoint": "U+1F425", "name": "Baby Chick", "shortcode": ":chick:", "verb": "add a yellow chick to the image" },
    { "index": 9, "option": "🐢", "codepoint": "U+1F422", "name": "Turtle", "shortcode": ":turtle:", "verb": "add a slow turtle to the image" },
    { "index": 10, "option": "🐴", "codepoint": "U+1F434", "name": "Horse Face", "shortcode": ":horse:", "verb": "add a majestic horse to the image" },
    { "index": 11, "option": "🦄", "codepoint": "U+1F984", "name": "Unicorn Face", "shortcode": ":unicorn:", "verb": "add a magical unicorn to the image" },
    // { "index": 12, "option": "🎩", "codepoint": "U+1F3A9", "name": "Top Hat", "shortcode": ":tophat:", "verb": "add a fancy top hat to the image" },
    // { "index": 13, "option": "👒", "codepoint": "U+1F452", "name": "Woman's Hat", "shortcode": ":womans_hat:", "verb": "add a stylish hat to the image" },
    // { "index": 14, "option": "🕶️", "codepoint": "U+1F576", "name": "Sunglasses", "shortcode": ":sunglasses:", "verb": "add cool sunglasses to the image" },
    // { "index": 15, "option": "🏃‍♂️", "codepoint": "U+1F3C3 U+200D U+2642 U+FE0F", "name": "Man Running", "shortcode": ":running_man:", "verb": "add a running figure to the image" },
    // { "index": 16, "option": "🧁", "codepoint": "U+1F9C1", "name": "Cupcake", "shortcode": ":cupcake:", "verb": "add a delicious cupcake to the image" },
    // { "index": 17, "option": "🍭", "codepoint": "U+1F36D", "name": "Lollipop", "shortcode": ":lollipop:", "verb": "add a colorful lollipop to the image" },
    // { "index": 18, "option": "🎈", "codepoint": "U+1F388", "name": "Balloon", "shortcode": ":balloon:", "verb": "add a floating balloon to the image" },
    // { "index": 19, "option": "🎨", "codepoint": "U+1F3A8", "name": "Artist Palette", "shortcode": ":art:", "verb": "add colorful paint splashes to the image" },
    // { "index": 20, "option": "🛷", "codepoint": "U+1F6F7", "name": "Sled", "shortcode": ":sled:", "verb": "add a winter sled to the image" },
    // { "index": 21, "option": "🎠", "codepoint": "U+1F3A0", "name": "Carousel Horse", "shortcode": ":carousel_horse:", "verb": "add a carousel horse to the image" },
    // { "index": 22, "option": "🚲", "codepoint": "U+1F6B2", "name": "Bicycle", "shortcode": ":bike:", "verb": "add a bicycle to the image" },
    // { "index": 23, "option": "🌈", "codepoint": "U+1F308", "name": "Rainbow", "shortcode": ":rainbow:", "verb": "add a beautiful rainbow to the image" },
    // { "index": 24, "option": "✨", "codepoint": "U+2728", "name": "Sparkles", "shortcode": ":sparkles:", "verb": "add sparkles and glitter to the image" }
];

// Get a random option from the list
export const getRandomOption = () => {
    return options[Math.floor(Math.random() * options.length)];
};

// Get multiple random options
export const getRandomOptions = (count: number) => {
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

// Get options for a specific card (deterministic based on cardId)
export const getOptionsForCard = (cardId: number, count: number) => {
    const shuffled = [...options].sort(() => {
        const seed = cardId + Math.random();
        return Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);
    });
    return shuffled.slice(0, count);
};

export const shuffle = <T>(array: T[]): T[] => {
    const result = [...array]; // Create a copy to avoid mutating the original
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  export const getShuffledOptions = (count: number) => {
    const shuffled = shuffle(options);
    return shuffled.slice(0, count);
  }