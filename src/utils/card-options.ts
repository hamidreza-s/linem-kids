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
    { "index": 1, "option": "🐶", "codepoint": "U+1F436", "name": "Dog Face", "shortcode": ":dog:", "verb": "make it a dog" },
    { "index": 2, "option": "🐱", "codepoint": "U+1F431", "name": "Cat Face", "shortcode": ":cat_face:", "verb": "make it a cat" },
    { "index": 3, "option": "🐰", "codepoint": "U+1F430", "name": "Rabbit Face", "shortcode": ":rabbit:", "verb": "make it a rabbit" },
    { "index": 4, "option": "🐹", "codepoint": "U+1F439", "name": "Hamster", "shortcode": ":hamster:", "verb": "make it a hamster" },
    { "index": 5, "option": "🐻", "codepoint": "U+1F43B", "name": "Bear Face", "shortcode": ":bear:", "verb": "make it a bear" },
    { "index": 6, "option": "🐸", "codepoint": "U+1F438", "name": "Frog", "shortcode": ":frog:", "verb": "make it a frog" },
    { "index": 7, "option": "🦊", "codepoint": "U+1F98A", "name": "Fox Face", "shortcode": ":fox:", "verb": "make it a fox" },
    { "index": 8, "option": "🐥", "codepoint": "U+1F425", "name": "Baby Chick", "shortcode": ":chick:", "verb": "make it a chick" },
    { "index": 9, "option": "🐢", "codepoint": "U+1F422", "name": "Turtle", "shortcode": ":turtle:", "verb": "make it a turtle" },
    { "index": 10, "option": "🐴", "codepoint": "U+1F434", "name": "Horse Face", "shortcode": ":horse:", "verb": "make it a horse" },
    { "index": 11, "option": "🦄", "codepoint": "U+1F984", "name": "Unicorn Face", "shortcode": ":unicorn:", "verb": "make it a unicorn" },
    { "index": 12, "option": "🎩", "codepoint": "U+1F3A9", "name": "Top Hat", "shortcode": ":tophat:", "verb": "wear a top hat" },
    { "index": 13, "option": "👒", "codepoint": "U+1F452", "name": "Woman's Hat", "shortcode": ":womans_hat:", "verb": "wear a hat" },
    { "index": 14, "option": "🕶️", "codepoint": "U+1F576", "name": "Sunglasses", "shortcode": ":sunglasses:", "verb": "wear sunglasses" },
    { "index": 15, "option": "🏃‍♂️", "codepoint": "U+1F3C3 U+200D U+2642 U+FE0F", "name": "Man Running", "shortcode": ":running_man:", "verb": "make it run" },
    { "index": 16, "option": "🧁", "codepoint": "U+1F9C1", "name": "Cupcake", "shortcode": ":cupcake:", "verb": "add a cupcake" },
    { "index": 17, "option": "🍭", "codepoint": "U+1F36D", "name": "Lollipop", "shortcode": ":lollipop:", "verb": "add a lollipop" },
    { "index": 18, "option": "🎈", "codepoint": "U+1F388", "name": "Balloon", "shortcode": ":balloon:", "verb": "add a balloon" },
    { "index": 19, "option": "🎨", "codepoint": "U+1F3A8", "name": "Artist Palette", "shortcode": ":art:", "verb": "make it colorful" },
    { "index": 20, "option": "🛷", "codepoint": "U+1F6F7", "name": "Sled", "shortcode": ":sled:", "verb": "add a sled" },
    { "index": 21, "option": "🎠", "codepoint": "U+1F3A0", "name": "Carousel Horse", "shortcode": ":carousel_horse:", "verb": "add a carousel horse" },
    { "index": 22, "option": "🚲", "codepoint": "U+1F6B2", "name": "Bicycle", "shortcode": ":bike:", "verb": "add a bicycle" },
    { "index": 23, "option": "🌈", "codepoint": "U+1F308", "name": "Rainbow", "shortcode": ":rainbow:", "verb": "add a rainbow" },
    { "index": 24, "option": "✨", "codepoint": "U+2728", "name": "Sparkles", "shortcode": ":sparkles:", "verb": "make it sparkle" }
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