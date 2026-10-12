export interface GlossaryItem {
  id: string;
  termEn: string;
  termNo: string;
  category: 'equipment' | 'technique' | 'ingredients' | 'safety' | 'service' | 'allergens';
  definitionEn: string;
  exampleSentence: string;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  // Equipment
  {
    id: 'chinois',
    termEn: 'Chinois / Fine Mesh Strainer',
    termNo: 'Kinesisk sil / spiss-sil',
    category: 'equipment',
    definitionEn: 'A conical sieve with an extremely fine mesh used for straining stocks, sauces, and purées to achieve a silky texture.',
    exampleSentence: 'Pass the velouté sauce through a chinois to remove any lumps.'
  },
  {
    id: 'mandoline',
    termEn: 'Mandoline Slicer',
    termNo: 'Mandolin',
    category: 'equipment',
    definitionEn: 'A flat culinary utensil with an adjustable blade used for fast, uniform slicing and julienning of vegetables.',
    exampleSentence: 'Always use the safety guard when slicing radishes with the mandoline.'
  },
  {
    id: 'spider-skimmer',
    termEn: 'Spider Skimmer',
    termNo: 'Edderkoppsil / hullsleiv',
    category: 'equipment',
    definitionEn: 'A wide wire mesh basket with a long handle used to lift delicate blanched vegetables or fried items from hot liquids.',
    exampleSentence: 'Use the spider skimmer to remove the blanched asparagus from boiling salted water.'
  },
  {
    id: 'gastronorm',
    termEn: 'Gastronorm Pan (GN)',
    termNo: 'Kantinedel / gastronorm-bakke',
    category: 'equipment',
    definitionEn: 'Standardized food pan size system (e.g. GN 1/1, GN 1/2) used globally in professional kitchens, ovens, and bain-maries.',
    exampleSentence: 'Prep the julienne carrots into a half-deep GN 1/3 container.'
  },
  {
    id: 'palette-knife',
    termEn: 'Offset Palette Knife / Spatula',
    termNo: 'Vinkelpalett',
    category: 'equipment',
    definitionEn: 'An angled, flexible flat metal blade used for spreading purées, lifting delicate fish fillets, and plating.',
    exampleSentence: 'Use the offset spatula to swipe the parsnip purée across the plate.'
  },
  {
    id: 'bain-marie',
    termEn: 'Bain-Marie',
    termNo: 'Vannbad',
    category: 'equipment',
    definitionEn: 'A heated water bath used to gently keep sauces warm or gently cook delicate mixtures without burning.',
    exampleSentence: 'Keep the hollandaise warm over a gentle bain-marie.'
  },

  // Techniques
  {
    id: 'blanch',
    termEn: 'Blanch & Refresh',
    termNo: 'Forvelle / kupere',
    category: 'technique',
    definitionEn: 'Plunging vegetables briefly into boiling salted water, then immediately transferring them to ice water to stop cooking and preserve color.',
    exampleSentence: 'Blanch the green beans for 90 seconds, then shock them in ice water.'
  },
  {
    id: 'julienne',
    termEn: 'Julienne',
    termNo: 'Julienne (fine strimler)',
    category: 'technique',
    definitionEn: 'Cutting vegetables into long, very thin matchstick-shaped strips (approx. 2mm × 2mm × 4cm).',
    exampleSentence: 'Julienne the leeks and carrots for the Nordic fish soup garnish.'
  },
  {
    id: 'brunoise',
    termEn: 'Brunoise',
    termNo: 'Brunoise (fine terninger)',
    category: 'technique',
    definitionEn: 'A culinary knife cut where the food item is first julienned and then turned a quarter turn and diced finely (approx. 2mm cubes).',
    exampleSentence: 'Dice the shallots into a precise fine brunoise.'
  },
  {
    id: 'sear',
    termEn: 'Sear',
    termNo: 'Bruning / svi på høy varme',
    category: 'technique',
    definitionEn: 'Cooking meat or fish at high temperature in a hot pan until a caramelized, flavorful brown crust forms (Maillard reaction).',
    exampleSentence: 'Sear the salmon skin-side down until crispy and golden.'
  },
  {
    id: 'simmer',
    termEn: 'Simmer',
    termNo: 'Syde / småkoke',
    category: 'technique',
    definitionEn: 'To cook gently in liquid just below the boiling point (around 85°C to 96°C) with tiny bubbles lazily breaking the surface.',
    exampleSentence: 'Lower the heat and let the fish stock simmer for 25 minutes; never boil vigorously.'
  },
  {
    id: 'deglaize',
    termEn: 'Deglaze',
    termNo: 'Kok ut pannen (deglasere)',
    category: 'technique',
    definitionEn: 'Pouring liquid (wine, stock, or water) into a hot pan to dissolve caramelized browned food residue left on the bottom.',
    exampleSentence: 'Deglaze the pan with apple cider to make a glossy pan sauce.'
  },
  {
    id: 'mise-en-place',
    termEn: 'Mise en place',
    termNo: 'Mise en place (klargjøring)',
    category: 'technique',
    definitionEn: 'Having all ingredients peeled, measured, chopped, and equipment ready at your station before cooking starts.',
    exampleSentence: 'A clean mise en place guarantees a smooth and stress-free rush service.'
  },

  // Food Safety
  {
    id: 'cross-contamination',
    termEn: 'Cross-Contamination',
    termNo: 'Kryssforurensning',
    category: 'safety',
    definitionEn: 'The transfer of harmful bacteria or allergens from one food surface, board, or hands to another food item.',
    exampleSentence: 'Never place cooked chicken on a cutting board previously used for raw poultry without sanitizing.'
  },
  {
    id: 'danger-zone',
    termEn: 'Temperature Danger Zone',
    termNo: 'Faresonen for temperatur',
    category: 'safety',
    definitionEn: 'The temperature range between 4°C and 60°C where harmful pathogens and food-borne bacteria multiply rapidly.',
    exampleSentence: 'Cool hot sauces quickly through the danger zone within two hours.'
  },
  {
    id: 'haccp',
    termEn: 'HACCP (Hazard Analysis Critical Control Point)',
    termNo: 'HACCP / internkontroll',
    category: 'safety',
    definitionEn: 'A systematic preventive approach to food safety from biological, chemical, physical, and allergen hazards.',
    exampleSentence: 'Record the core cooking temperature in the HACCP digital log.'
  },
  {
    id: 'fifo',
    termEn: 'FIFO (First In, First Out)',
    termNo: 'FIFO (først inn, først ut)',
    category: 'safety',
    definitionEn: 'Storage rotation rule where older stock with closer expiry dates is used before newer shipments.',
    exampleSentence: 'Rotate the dairy crates according to FIFO principles to eliminate waste.'
  },

  // Customer Service & Service Phrases
  {
    id: 'behind',
    termEn: '"Behind!" / "Corner!"',
    termNo: '"Bak deg!" / "Sving!"',
    category: 'service',
    definitionEn: 'Standard verbal callouts used in fast-paced professional kitchens to alert teammates when moving behind them or around blind corners.',
    exampleSentence: 'Call "Behind, hot pot!" whenever you pass a station carrying heated stock.'
  },
  {
    id: 'eighty-six',
    termEn: '86 (Eighty-Six)',
    termNo: 'Utsolgt / tomt på menyen',
    category: 'service',
    definitionEn: 'Restaurant jargon meaning an item is sold out or no longer available for service.',
    exampleSentence: 'Notify front-of-house that the halibut is 86 for the rest of tonight.'
  },
  {
    id: 'pass',
    termEn: 'The Pass',
    termNo: 'Utleveringen (passet)',
    category: 'service',
    definitionEn: 'The central counter in the kitchen where chefs finish plates and servers collect food for delivery to dining tables.',
    exampleSentence: 'The head chef inspects every plate at the pass before it leaves the kitchen.'
  },

  // Allergens
  {
    id: 'celiac',
    termEn: 'Celiac Disease / Gluten-free',
    termNo: 'Cøliaki / glutenfritt',
    category: 'allergens',
    definitionEn: 'An autoimmune reaction to gluten protein (found in wheat, barley, rye) requiring zero cross-contact in pans and fryers.',
    exampleSentence: 'Use a freshly sanitized pan and separate utensils for the gluten-free risotto.'
  },
  {
    id: 'cross-contact',
    termEn: 'Allergen Cross-Contact',
    termNo: 'Allergenkrysskontakt',
    category: 'allergens',
    definitionEn: 'When an allergen is unintentionally transferred to food that does not naturally contain that allergen (e.g. sharing fryer oil).',
    exampleSentence: 'Even a microscopic crumb of wheat can trigger an adverse reaction in a guest with celiac disease.'
  }
];
