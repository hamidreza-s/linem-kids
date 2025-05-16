export const getHeightForLevel = (level: number): { cardHeight: string, optionsHeight: string } => {
  switch (level) {
    case 1: // Small shift
      return { cardHeight: "45vh", optionsHeight: "40vh" };
    case 2: // Medium shift
      return { cardHeight: "40vh", optionsHeight: "45vh" };
    case 3: // Big shift
      return { cardHeight: "35vh", optionsHeight: "50vh" };
    case 0: // Default (not expanded)
    default:
      return { cardHeight: "70vh", optionsHeight: "15vh" };
  }
}; 