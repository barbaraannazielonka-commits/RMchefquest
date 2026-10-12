import { LevelData } from '../types/game';
import { IMAGES } from '../assets/images';

export const LEVELS_DATA: LevelData[] = [
  // ----------------------------------------------------
  // LEVEL 1: THE NORWEGIAN KITCHEN APPRENTICE
  // ----------------------------------------------------
  {
    id: 1,
    title: 'The Norwegian Kitchen Apprentice',
    norwegianTitle: 'Lærlingen på det norske kjøkkenet',
    location: 'Oslo Harbour Restaurant',
    country: 'Norway',
    flag: '🇳🇴',
    summary: 'Master fundamental kitchen equipment, essential culinary verbs, and clear English communication in a modern Nordic kitchen.',
    storyContext: 'You have just started your apprenticeship at a renowned modern waterfront restaurant in Oslo. Your head chef, Chef Kristin, welcomes you. An exchange chef from Ireland has just arrived and speaks only English. Can you guide them, master the tools, and prepare a classic Norwegian salmon dish?',
    image: IMAGES.norwegian,
    badgeAwarded: {
      id: 'nordic_apprentice',
      title: 'Nordic Apprentice Star',
      description: 'Mastered essential professional kitchen tools, cooking verbs, and English equipment directions.',
      icon: 'Award',
      category: 'technique'
    },
    tasks: [
      {
        id: '1-1',
        title: 'Task 1: Essential Kitchen Equipment Match',
        subtitle: 'Match professional tools with their names and English functions',
        instructions: 'In an international kitchen, every tool has a precise name. Click a tool card, then select its matching English name and function.',
        type: 'matching',
        points: 100,
        norwegianHint: 'Lær navnene på utstyret på engelsk slik at du kan hjelpe kolleger og følge internasjonale oppskrifter.',
        vocabularyList: [
          { term: 'Mandoline slicer', norwegian: 'Mandolin', definition: 'A flat tool with a sharp razor blade for uniform thin slices.' },
          { term: 'Chinois', norwegian: 'Kinesisk sil / spiss-sil', definition: 'A conical fine-mesh strainer for silky smooth sauces.' },
          { term: 'Spider skimmer', norwegian: 'Edderkoppsil / hullsleiv', definition: 'Wire mesh skimmer for scooping food from hot oil or boiling water.' },
          { term: 'Gastronorm pan', norwegian: 'Kantinedel / gastronormbakke', definition: 'Standardized stainless steel containers used throughout kitchens.' },
          { term: 'Offset spatula', norwegian: 'Vinkelpalett', definition: 'An angled palette knife used for spreading purées and delicate plating.' }
        ],
        items: [
          {
            id: 'item-chinois',
            term: 'Chinois (Conical Strainer)',
            norwegian: 'Kinesisk sil',
            definition: 'Used to strain stocks and purées to create an ultra-smooth, lump-free texture.',
            category: 'Straining'
          },
          {
            id: 'item-mandoline',
            term: 'Mandoline Slicer',
            norwegian: 'Mandolin',
            definition: 'Used with a safety hand-guard to cut vegetables into paper-thin, uniform slices.',
            category: 'Prep'
          },
          {
            id: 'item-spider',
            term: 'Spider Skimmer',
            norwegian: 'Edderkoppsil',
            definition: 'A wide wire mesh tool to lift blanched vegetables or fried items safely out of hot liquid.',
            category: 'Hot Line'
          },
          {
            id: 'item-gastronorm',
            term: 'Gastronorm (GN) Pan',
            norwegian: 'Gastronorm-bakke',
            definition: 'Standard-dimension metal containers fitted for ovens, warmers, and prep stations.',
            category: 'Storage'
          },
          {
            id: 'item-offset',
            term: 'Offset Palette Spatula',
            norwegian: 'Vinkelpalett',
            definition: 'A flexible angled blade for lifting delicate fish fillets and precision plate swiping.',
            category: 'Plating'
          }
        ]
      },
      {
        id: '1-2',
        title: 'Task 2: Cooking Verbs & Norwegian Ingredients',
        subtitle: 'Pair actions with authentic Norwegian seasonal produce',
        instructions: 'Match each culinary verb to the exact cooking process applied to authentic Norwegian ingredients.',
        type: 'matching',
        points: 100,
        norwegianHint: 'Husk forskjellen på "sear" (steke raskt på høy varme) og "simmer" (småkoke/syde).',
        vocabularyList: [
          { term: 'Sear', norwegian: 'Bruning / svi på sterk varme', definition: 'Cook quickly on high heat to develop a rich golden crust.' },
          { term: 'Simmer', norwegian: 'Småkoke / syde', definition: 'Cook liquid gently just below boiling point (85–95°C).' },
          { term: 'Julienne', norwegian: 'Skjære i fine strimler', definition: 'Cut into long thin matchstick strips (approx. 2mm).' },
          { term: 'Deglaze', norwegian: 'Koke ut pannen', definition: 'Add liquid to a hot pan to dissolve browned juices.' }
        ],
        items: [
          {
            id: 'item-sear',
            term: 'Sear (Skin-side down)',
            norwegian: 'Steke på høy varme',
            definition: 'Brown fresh Norwegian fjord salmon in hot clarified butter until crisp.',
            category: 'Cooking Verb'
          },
          {
            id: 'item-julienne',
            term: 'Julienne (Matchsticks)',
            norwegian: 'Finstykke i strimler',
            definition: 'Cut crisp root vegetables like Norwegian parsnip and carrots into 2mm matchsticks.',
            category: 'Knife Technique'
          },
          {
            id: 'item-simmer',
            term: 'Simmer (Gentle heat)',
            norwegian: 'Syde / småkoke',
            definition: 'Cook fish fumet and cream with fresh dill and juniper berries gently without boiling.',
            category: 'Cooking Verb'
          },
          {
            id: 'item-deglaze',
            term: 'Deglaze (Pan sauce)',
            norwegian: 'Deglasere pannen',
            definition: 'Pour cold Hardanger apple cider into the hot pan to dissolve caramelized flavors.',
            category: 'Sauce Making'
          }
        ]
      },
      {
        id: '1-3',
        title: 'Task 3: Recipe Sequencing: Seared Salmon & Herb Potatoes',
        subtitle: 'Arrange the recipe instructions in the correct culinary order',
        instructions: 'Read the instructions carefully. Put the steps into the correct chronological order so the dish is prepared properly.',
        type: 'sequencing',
        points: 120,
        recipeName: 'Pan-Seared Fjord Salmon with Crushed Potatoes & Dill Emulsion',
        servings: 4,
        norwegianHint: 'Mise en place og forberedelser kommer alltid først! Ikke stek fisken før garnityret er nesten klart.',
        steps: [
          {
            id: 'step-1',
            order: 1,
            text: 'Gather mise en place: weigh ingredients, wash dill, peel baby potatoes, and pat salmon fillets dry with paper towels.',
            verb: 'Gather & Prep',
            culinaryReason: 'Moisture on salmon skin prevents crisping; dry fish produces a superior golden sear.'
          },
          {
            id: 'step-2',
            order: 2,
            text: 'Boil potatoes in salted water until knife-tender; drain thoroughly and keep warm.',
            verb: 'Boil & Drain',
            culinaryReason: 'Potatoes take longest (15-20 min), so start them before cooking quick-firing salmon.'
          },
          {
            id: 'step-3',
            order: 3,
            text: 'Whisk the dill emulsion: combine egg yolk, Dijon mustard, lemon juice, and slowly drizzle in rapeseed oil.',
            verb: 'Whisk & Emulsify',
            culinaryReason: 'Emulsions can be made ahead and rested at cool room temperature before service.'
          },
          {
            id: 'step-4',
            order: 4,
            text: 'Heat heavy stainless skillet over medium-high heat. Add oil and sear salmon skin-side down for 4 minutes without moving it.',
            verb: 'Sear & Crisp',
            culinaryReason: 'Allowing the skin to sear undisturbed prevents tearing and builds a crunchy texture.'
          },
          {
            id: 'step-5',
            order: 5,
            text: 'Flip salmon, baste with butter and thyme for 60 seconds, rest fish for 2 minutes, and plate with crushed potatoes and dill sauce.',
            verb: 'Baste & Plate',
            culinaryReason: 'Resting allows juices to redistribute so the salmon remains succulent and tender.'
          }
        ]
      },
      {
        id: '1-4',
        title: 'Task 4: Assisting an English-Speaking Colleague',
        subtitle: 'Use professional English to guide a new kitchen teammate',
        instructions: 'Liam, an apprentice from Dublin, is looking for equipment during prep. Choose the clearest, most professional English response.',
        type: 'dialogue',
        points: 100,
        context: 'Liam is standing at the prep island looking confused with a crate of root vegetables.',
        initialDialogue: [
          {
            speaker: 'colleague',
            name: 'Liam',
            text: 'Excuse me! Chef Kristin asked me to julienne 5 kilos of parsnips and strain the fish stock, but I have no idea where the mandoline and the fine conical strainer are kept here!'
          }
        ],
        options: [
          {
            id: 'opt-1',
            playerResponse: 'Over there in the cupboard maybe. Go look around the back.',
            isOptimal: false,
            colleagueReaction: 'Umm... that was not very helpful. Which cupboard do you mean?',
            feedback: 'Too vague and unhelpful. In a professional kitchen, clear directions save valuable prep time.',
            professionalEnglishNote: 'Always specify exact locations: "On the top rack above the prep sink".',
            points: 20
          },
          {
            id: 'opt-2',
            playerResponse: 'Hi Liam! The mandoline is on the tool rack right above Station 2, make sure to grab the safety guard. The conical strainer—the chinois—is hanging above the dishwashing sink.',
            isOptimal: true,
            colleagueReaction: 'Brilliant! Thanks a million, I will grab the safety guard right away.',
            feedback: 'Excellent! Clear, precise directions, friendly tone, and you reminded him about the essential safety guard.',
            professionalEnglishNote: 'Professional kitchen teamwork emphasizes speed, clarity, and safety reminders.',
            points: 100
          },
          {
            id: 'opt-3',
            playerResponse: 'I am too busy right now with my salmon, you should ask Chef Kristin yourself.',
            isOptimal: false,
            colleagueReaction: 'Oh... sorry to bother you then.',
            feedback: 'Unfriendly. Kitchen brigades succeed as a team. Assisting peers fosters a cooperative workplace culture.',
            professionalEnglishNote: 'Even during busy moments, use polite phrases: "I am finishing this pan, give me 30 seconds to show you."',
            points: 10
          }
        ]
      }
    ],
    reflection: {
      q1: 'Which kitchen equipment name in English was newest or most interesting to you?',
      q2: 'Why is patting salmon dry before searing essential for both cooking quality and safety?',
      q3: 'What English phrase would you use in a real restaurant if a colleague asks where a tool is?'
    }
  },

  // ----------------------------------------------------
  // LEVEL 2: KITCHEN SAFETY MISSION
  // ----------------------------------------------------
  {
    id: 2,
    title: 'Kitchen Safety Mission',
    norwegianTitle: 'Oppdrag: Kjøkkensikkerhet og hygiene',
    location: 'Metropolitan Bistro Rush',
    country: 'International Brigade',
    flag: '🛡️',
    summary: 'Identify critical hazards, prevent cross-contamination, understand Mattilsynet temperature rules, and handle kitchen emergencies safely.',
    storyContext: 'You are now working during a high-octane lunch rush. Orders are flying in, tickets are printing non-stop, and steam is rising. The head chef is testing your vigilance: safety and hygiene must never be sacrificed for speed!',
    image: IMAGES.hero,
    badgeAwarded: {
      id: 'safety_sentinel',
      title: 'Safety Sentinel',
      description: 'Zero food-safety violations! Mastered temperature danger zones and emergency kitchen protocols.',
      icon: 'ShieldCheck',
      category: 'safety'
    },
    tasks: [
      {
        id: '2-1',
        title: 'Task 1: Interactive Kitchen Hazard Spotter',
        subtitle: 'Identify dangerous safety violations in the kitchen',
        instructions: 'Examine the 4 reported workplace situations. For each hazard, identify the risk, select the correct professional action, and learn why it matters according to food hygiene standards (Mattilsynet).',
        type: 'hazard_spotter',
        points: 120,
        norwegianHint: 'Husk Mattilsynets krav til temperaturer, kryssforurensning og sklisikring.',
        hazards: [
          {
            id: 'hz-1',
            title: 'Raw Poultry Stored on Top Shelf of Walk-In Cooler',
            locationDescription: 'Walk-In Refrigerator Shelf #1',
            danger: 'Raw chicken juices contain Salmonella / Campylobacter bacteria and could drip onto ready-to-eat salad greens stored below.',
            correctAction: 'Immediately relocate raw poultry to the bottom shelf inside sealed, labeled GN pans with drip trays.',
            whyItMatters: 'Gravity causes drips; raw poultry must ALWAYS occupy the lowest shelf in commercial refrigeration.',
            mattilsynetRule: 'Mattilsynet hygiene regulation: raw and cooked foods must be strictly separated vertically.'
          },
          {
            id: 'hz-2',
            title: 'Chef Knife Left Soaking in a Sink of Soapy Water',
            locationDescription: 'Pot Wash Sink Station',
            danger: 'A dishwasher or cook reaching into opaque bubbly water cannot see the blade and risks severe lacerations / cut tendon.',
            correctAction: 'Never leave knives submerged in sinks. Wash knives individually by hand immediately, dry them, and place on magnetic rack.',
            whyItMatters: 'Submerged knives are one of the most common causes of workplace emergency room visits in restaurants.',
            mattilsynetRule: 'Workplace safety (Arbeidstilsynet): Sharp tools must never be obscured in wash basins.'
          },
          {
            id: 'hz-3',
            title: 'Hot Chicken Soup Cooling on Room Temperature Prep Table for 4 Hours',
            locationDescription: 'Central Island Workstation',
            danger: 'Holding cooked food in the Temperature Danger Zone (4°C to 60°C) allows bacterial spores (e.g., Bacillus cereus, Clostridium perfringens) to rapidly multiply and produce heat-stable toxins.',
            correctAction: 'Discard the soup if past safe limits (>2 hours in danger zone), or use an ice-bath blast chiller to cool from 60°C to ≤4°C within 2 hours.',
            whyItMatters: 'Toxins produced by spore-forming bacteria cannot be destroyed by simply reheating.',
            mattilsynetRule: 'Kjølekrav: Varm mat skal kjøles ned fra 60°C til under 10°C (og videre til ≤4°C) innen 2 timer.'
          },
          {
            id: 'hz-4',
            title: 'Water and Cooking Oil Puddle Beside the Deep Fryer',
            locationDescription: 'Hot Line Floor Station',
            danger: 'Severe slip-and-fall risk near 180°C hot oil vats, creating severe burn and catastrophic injury hazards.',
            correctAction: 'Place yellow caution cone immediately, use degreasing absorbent powder/mop, and ensure non-slip kitchen shoes are worn.',
            whyItMatters: 'Kitchen burns from falling into or splashing deep fryers are life-threatening.',
            mattilsynetRule: 'Sklisikring: Gulv ved frityr og kokesoner skal holdes tørre og sklisikre til enhver tid.'
          }
        ]
      },
      {
        id: '2-2',
        title: 'Task 2: Color-Coded Chopping Board Standard',
        subtitle: 'Match food categories with internationally recognized board colors',
        instructions: 'Cross-contamination destroys customer trust. Match each food type with the correct color-coded cutting board used in commercial kitchens.',
        type: 'matching',
        points: 100,
        norwegianHint: 'Gult for fjærfe, Rødt for rått kjøtt, Blått for rå fisk, Grønt for salat/frukt, Brunt for uvaskede rotgrønnsaker, Hvitt for brød/meieriprodukter.',
        items: [
          {
            id: 'cb-yellow',
            term: 'Yellow Cutting Board',
            norwegian: 'Gult skjærebrett',
            definition: 'Raw Poultry & Chicken only (prevents Salmonella cross-contamination).',
            category: 'Chopping Board'
          },
          {
            id: 'cb-red',
            term: 'Red Cutting Board',
            norwegian: 'Rødt skjærebrett',
            definition: 'Raw Red Meat (Beef, Pork, Venison, Lamb).',
            category: 'Chopping Board'
          },
          {
            id: 'cb-blue',
            term: 'Blue Cutting Board',
            norwegian: 'Blått skjærebrett',
            definition: 'Raw Fish & Seafood (Cod, Salmon, Shellfish).',
            category: 'Chopping Board'
          },
          {
            id: 'cb-green',
            term: 'Green Cutting Board',
            norwegian: 'Grønt skjærebrett',
            definition: 'Salad greens, fresh fruits, and ready-to-eat washed herbs.',
            category: 'Chopping Board'
          },
          {
            id: 'cb-white',
            term: 'White Cutting Board',
            norwegian: 'Hvitt skjærebrett',
            definition: 'Bakery, dairy products, cheeses, and sliced sandwich bread.',
            category: 'Chopping Board'
          }
        ]
      },
      {
        id: '2-3',
        title: 'Task 3: Emergency Incidents: The Cut and The Grease Fire',
        subtitle: 'Respond with calm, professional SOPs when emergencies occur',
        instructions: 'An apprentice gashes their thumb with a slicing knife while prep is running. Choose the correct immediate workplace procedure.',
        type: 'dialogue',
        points: 100,
        context: 'Blood is present on the cutting board and the apprentice looks faint.',
        initialDialogue: [
          {
            speaker: 'colleague',
            name: 'Apprentice Maya',
            text: 'Ouch! The knife slipped... my thumb is bleeding heavily onto the cutting board! What should I do?!'
          }
        ],
        options: [
          {
            id: 'cut-opt-1',
            playerResponse: 'Just wipe it on your apron and put on a plastic glove quickly so the chef does not get mad.',
            isOptimal: false,
            colleagueReaction: 'No way! That is stinging and bleeding through, and my apron is dirty!',
            feedback: 'Extremely dangerous and unsanitary. Blood must never touch aprons or food, and wounds must be sanitized and bandaged.',
            professionalEnglishNote: 'Never hide injuries. Food contaminated with blood must be discarded immediately.',
            points: 0
          },
          {
            id: 'cut-opt-2',
            playerResponse: 'Step back from the food station immediately. Apply firm direct pressure with a clean sterile gauze, elevate your hand above your heart, wash under cool running water, apply a blue waterproof plaster and food-safe glove, and discard all contaminated food and board on your station.',
            isOptimal: true,
            colleagueReaction: 'Thank you! Pressing the sterile pad now. The bleeding is slowing down.',
            feedback: 'Spot on! Immediate first aid, blue waterproof plaster (visible in kitchens), and discarding contaminated food protects both the worker and guests.',
            professionalEnglishNote: '"Apply direct pressure" and "Step away from food contact surfaces" are essential SOP phrases.',
            points: 100
          },
          {
            id: 'cut-opt-3',
            playerResponse: 'Go home right now, we will finish your work.',
            isOptimal: false,
            colleagueReaction: 'Wait, I need first aid before I can go anywhere!',
            feedback: 'First aid must be rendered immediately before assessing if medical attention or leave is required.',
            professionalEnglishNote: 'Always render first aid and control bleeding first.',
            points: 30
          }
        ]
      }
    ],
    reflection: {
      q1: 'Why is raw poultry always placed on the lowest shelf in the walk-in refrigerator?',
      q2: 'What is the exact temperature range of the "Temperature Danger Zone", and why is it perilous?',
      q3: 'Why do commercial kitchens use bright blue waterproof plasters instead of skin-colored ones?'
    }
  },

  // ----------------------------------------------------
  // LEVEL 3: THE INTERNATIONAL FOOD EXPLORER
  // ----------------------------------------------------
  {
    id: 3,
    title: 'The International Food Explorer',
    norwegianTitle: 'Den internasjonale matsafarien',
    location: 'Global Culinary Pavilion',
    country: 'Italy, Japan, Mexico, India & France',
    flag: '🌍',
    summary: 'Explore authentic global food traditions, respect cultural dietary laws, and design an international festival menu.',
    storyContext: 'You have been selected to represent the Academy at an International Culinary Exchange. You will travel through culinary traditions from Italy to Japan, Mexico, India, and France. Learn that culinary respect means understanding history, regional ingredients, and cultural significance.',
    image: IMAGES.international,
    badgeAwarded: {
      id: 'flavour_diplomat',
      title: 'Flavour Diplomat',
      description: 'Honoured global culinary traditions, dietary etiquette, and curated an authentic international menu.',
      icon: 'Globe',
      category: 'technique'
    },
    tasks: [
      {
        id: '3-1',
        title: 'Task 1: Global Signatures & Authentic Techniques',
        subtitle: 'Connect famous dishes with their defining culinary method',
        instructions: 'Match each international dish with its authentic culinary principle and cultural origin.',
        type: 'matching',
        points: 100,
        norwegianHint: 'Knytt retten til riktig teknikk og tradisjon for å vise respekt for råvarene.',
        items: [
          {
            id: 'tech-italy',
            term: 'Risotto alla Milanese (Italy)',
            norwegian: 'Mantecatura-teknikk',
            definition: 'Finished with "mantecatura" – beating cold butter and Grana Padano vigorously off heat for a creamy wave (all’onda).',
            category: 'Italian Cuisine'
          },
          {
            id: 'tech-japan',
            term: 'Dashi & Miso Soup (Japan)',
            norwegian: 'Umami-kraft (Dashi)',
            definition: 'Infusing kombu kelp and katsuobushi flakes gently to extract natural glutamates and umami without boiling.',
            category: 'Japanese Cuisine'
          },
          {
            id: 'tech-mexico',
            term: 'Mole Poblano (Mexico)',
            norwegian: 'Tørkede chili og kakao',
            definition: 'Complex sauce blending charred dried chilies (ancho, pasilla), spices, pumpkin seeds, and dark Mexican cacao.',
            category: 'Mexican Cuisine'
          },
          {
            id: 'tech-india',
            term: 'Hyderabadi Dum Biryani (India)',
            norwegian: 'Dum-metoden (leirelokk)',
            definition: 'Layered spiced basmati rice and marinated meat sealed with dough and slow-steamed over gentle coals ("dum").',
            category: 'Indian Cuisine'
          },
          {
            id: 'tech-france',
            term: 'Classic Velouté & Roux (France)',
            norwegian: 'Roux og reduksjon',
            definition: 'White stock thickened gently with equal parts cooked butter and flour (blond roux), simmered to a velvety sheen.',
            category: 'French Cuisine'
          }
        ]
      },
      {
        id: '3-2',
        title: 'Task 2: Ingredient Substitution Dilemma',
        subtitle: 'Solve kitchen inventory shortages with culinary intelligence',
        instructions: 'You are preparing authentic Japanese Chicken Teriyaki and Thai Green Curry, but your supplier was out of Mirin (sweet rice wine) and fresh Lemongrass. Choose the most respectful, balanced culinary alternative.',
        type: 'dialogue',
        points: 100,
        context: 'You need to explain your substitution choice to Chef Kenji.',
        initialDialogue: [
          {
            speaker: 'chef',
            name: 'Chef Kenji',
            text: 'Apprentice, the delivery van arrived without mirin for our teriyaki glaze, and the lemongrass is missing for the curry paste. What is your proposal?'
          }
        ],
        options: [
          {
            id: 'sub-opt-1',
            playerResponse: 'Just dump in normal white sugar and malt vinegar, nobody can tell the difference in the dining room anyway.',
            isOptimal: false,
            colleagueReaction: 'Malt vinegar is far too harsh and will ruin the delicate aromatics of Japanese teriyaki.',
            feedback: 'Poor culinary judgement. Harsh vinegars overwhelm delicate dishes and show disregard for cuisine authenticity.',
            professionalEnglishNote: 'Explain flavour profiles: "Malt vinegar is too acidic; we need gentle acidity and gentle sweetness."',
            points: 10
          },
          {
            id: 'sub-opt-2',
            playerResponse: 'For the mirin, we can combine dry white wine (or sake) with a touch of dissolved raw sugar (3:1 ratio) to mimic the mild acidity, sweetness, and gloss. For the lemongrass, we can use fresh kaffir lime zest combined with a squeeze of fresh lime juice and fresh grated ginger to preserve the bright citrus-herbal note.',
            isOptimal: true,
            colleagueReaction: 'Sublime thinking! The wine and sugar recreate the sweetness and shine, while the kaffir zest brings the authentic citrus brightness. Proceed!',
            feedback: 'Outstanding culinary chemistry! You understood the function of the missing ingredient (sweetness, acidity, gloss, citrus aroma) and used respectful substitutes.',
            professionalEnglishNote: 'Using words like "mimic the mouthfeel", "preserve citrus-herbal profile", and "ratio" demonstrates professional English.',
            points: 100
          },
          {
            id: 'sub-opt-3',
            playerResponse: 'We should cancel both dishes from tonight’s menu right now.',
            isOptimal: false,
            colleagueReaction: 'Canceling our two most popular dishes over two missing aromatics without trying a substitution?',
            feedback: 'A professional chef is a problem solver. Before 86-ing core menu items, evaluate viable culinary substitutions.',
            professionalEnglishNote: 'State alternatives first: "Before we 86 the dish, let us test this viable substitution."',
            points: 30
          }
        ]
      },
      {
        id: '3-3',
        title: 'Task 3: Cultural Dietary Laws & Etiquette',
        subtitle: 'Respect Halal, Kosher, and Vegan culinary standards',
        instructions: 'Match the cultural dietary framework with its strict international preparation requirement.',
        type: 'matching',
        points: 100,
        norwegianHint: 'Forstå forskjellene mellom Halal, Kosher og veganske prinsipper for å unngå feil på kjøkkenet.',
        items: [
          {
            id: 'diet-halal',
            term: 'Halal Dining Standards',
            norwegian: 'Halal-regler',
            definition: 'Requires certified meat slaughtered according to Islamic law; strictly zero pork, bacon, or alcohol in cooking or sauces.',
            category: 'Religious Dietary Law'
          },
          {
            id: 'diet-kosher',
            term: 'Kosher Dietary Rules (Kashrut)',
            norwegian: 'Kosher-krav',
            definition: 'Strict separation of meat and dairy products; requires separate prep equipment, cookware, and dishware.',
            category: 'Religious Dietary Law'
          },
          {
            id: 'diet-jain',
            term: 'Jain Vegetarianism (India)',
            norwegian: 'Jain-vegetarisme',
            definition: 'Strict lacto-vegetarian that excludes all root vegetables (no onions, garlic, potatoes) to protect subterranean organisms.',
            category: 'Spiritual Dietary Tradition'
          },
          {
            id: 'diet-sushi',
            term: 'Japanese Edomae Etiquette',
            norwegian: 'Japansk sushi-kultur',
            definition: 'Never submerge seasoned sushi rice into soy sauce; dip the fish topping lightly to preserve the chef’s vinegar balance.',
            category: 'Cultural Etiquette'
          }
        ]
      }
    ],
    reflection: {
      q1: 'Why is it important for chefs to avoid stereotypes when serving international cuisines?',
      q2: 'What is the role of "umami" in Japanese dashi broth, and how does it differ from Western bouillon cubes?',
      q3: 'How would you explain to an English-speaking guest that your kitchen strictly separates meat and dairy for kosher preferences?'
    }
  },

  // ----------------------------------------------------
  // LEVEL 4: THE MASTER CHEF CHALLENGE
  // ----------------------------------------------------
  {
    id: 4,
    title: 'The Master Chef Challenge',
    norwegianTitle: 'Mesterkokkens utfordring: Matematikk og koordinering',
    location: 'Metropolitan Grand Brasserie',
    country: 'International Service',
    flag: '⏱️',
    summary: 'Master kitchen mathematics, recipe yield scaling, rush service timelines, and real-time crisis management under pressure.',
    storyContext: 'Welcome to the hot line! Tonight the restaurant is booked with 48 covers. A VIP party of 12 just arrived unannounced, the convection oven on Station 1 has blown a thermal fuse, and you need to scale recipes accurately and coordinate cooking times down to the minute.',
    image: IMAGES.banquet,
    badgeAwarded: {
      id: 'culinary_strategist',
      title: 'Culinary Strategist',
      description: 'Scaled high-volume recipes accurately, managed service timelines, and resolved equipment breakdowns.',
      icon: 'Timer',
      category: 'mastery'
    },
    tasks: [
      {
        id: '4-1',
        title: 'Task 1: Recipe Scaling & Kitchen Calculations',
        subtitle: 'Scale a recipe from 8 portions up to 48 portions accurately',
        instructions: 'Calculate the required ingredient quantities for tonight’s 48 guests. The base recipe is calculated for 8 portions (scaling factor: 48 ÷ 8 = 6). Calculate the exact amounts.',
        type: 'kitchen_math',
        points: 120,
        norwegianHint: 'Multipliser mengdene i grunnoppskriften med 6 (48 / 8 = 6). Vær nøye med gram og liter!',
        recipeTitle: 'Velvety Nordic Fish Velouté with Saffron & Leeks',
        problems: [
          {
            id: 'math-1',
            scenario: 'The base recipe for 8 portions requires 400g of fresh cod fillets.',
            question: 'How many kilograms (kg) of fresh cod do you need for 48 guests?',
            baseAmount: '400g',
            baseYield: 8,
            targetYield: 48,
            correctAnswer: 2.4,
            unit: 'kg',
            tolerance: 0.05,
            hint: '400g × 6 = 2,400g. Convert grams to kilograms by dividing by 1,000.',
            explanation: '400g × 6 = 2,400g = 2.4 kg of cod fillet.'
          },
          {
            id: 'math-2',
            scenario: 'The base recipe calls for 1.2 litres of concentrated fish stock (fumet).',
            question: 'How many litres of fish stock do you need for 48 guests?',
            baseAmount: '1.2 litres',
            baseYield: 8,
            targetYield: 48,
            correctAnswer: 7.2,
            unit: 'litres',
            tolerance: 0.1,
            hint: 'Multiply 1.2 litres by the scaling factor 6.',
            explanation: '1.2 L × 6 = 7.2 litres of stock.'
          },
          {
            id: 'math-3',
            scenario: 'The blond roux uses 60g of unsalted butter and 60g of flour for 8 portions.',
            question: 'How many total grams of butter are required for 48 portions?',
            baseAmount: '60g',
            baseYield: 8,
            targetYield: 48,
            correctAnswer: 360,
            unit: 'grams',
            tolerance: 5,
            hint: '60g × 6 = ?',
            explanation: '60g × 6 = 360 grams of butter.'
          }
        ]
      },
      {
        id: '4-2',
        title: 'Task 2: Rush Service Cooking Sequence',
        subtitle: 'Coordinate cooking times so hot and cold courses land together',
        instructions: 'Put the cooking tasks in order so that Table 12 receives their hot pan-seared scallops, hot steak with pommes fondant, and cold dessert in a seamless flow without food dying on the pass.',
        type: 'sequencing',
        points: 120,
        recipeName: 'Service Flow Coordination: 3-Course Order for Table 12',
        servings: 4,
        norwegianHint: 'Husk at biff må hvile i 5-7 minutter etter steking, og kamskjell stekes på bare 90 sekunder!',
        steps: [
          {
            id: 'seq-1',
            order: 1,
            text: 'Fire Table 12 appetizers: sear scallops in smoking hot pan (90 seconds per side), plate immediately on pea purée, and send to the pass.',
            verb: 'Fire Appetizer',
            culinaryReason: 'Delicate scallops must be served searingly hot straight off the pan.'
          },
          {
            id: 'seq-2',
            order: 2,
            text: 'When servers report Table 12 is halfway through appetizers, sear beef tenderloins and transfer to oven with butter and rosemary.',
            verb: 'Fire Mains',
            culinaryReason: 'Timing beef to coincide with appetizer clearing ensures guests wait no longer than 12-15 minutes between courses.'
          },
          {
            id: 'seq-3',
            order: 3,
            text: 'Pull beef at 52°C internal temperature and rest on warm rack for 6 minutes while glazing fondant potatoes and reducing jus.',
            verb: 'Rest Beef',
            culinaryReason: 'Resting redistributes internal juices; cutting un-rested meat causes moisture loss and dry steaks.'
          },
          {
            id: 'seq-4',
            order: 4,
            text: 'Slice rested beef, assemble hot sides, wipe rim of plates, and ring service bell: "Service Table 12, Mains away!"',
            verb: 'Plate & Call Service',
            culinaryReason: 'Clean plate rims and a clear verbal callout ensure swift food runner delivery.'
          },
          {
            id: 'seq-5',
            order: 5,
            text: 'Check table status for dessert; quenelle chilled cloudberry mousse and garnish with toasted tuile right before serving.',
            verb: 'Garnish Dessert',
            culinaryReason: 'Chilled mousses and delicate tuiles will soften if plated too early in a warm kitchen.'
          }
        ]
      },
      {
        id: '4-3',
        title: 'Task 3: Crisis Resolution: Oven Breakdown at 19:45',
        subtitle: 'Decide under pressure when an oven stops working during rush',
        instructions: 'The main combi-oven has just displayed Error E04 (fan failure) with 14 roasts inside. Choose the most effective head chef decision.',
        type: 'dialogue',
        points: 100,
        context: 'Station 1 oven has shut down completely and service is at peak volume.',
        initialDialogue: [
          {
            speaker: 'chef',
            name: 'Sous-Chef Marcus',
            text: 'Chef! Combi-Oven 1 died! We have 14 beef fillets and roasted root vegetables trapped inside, and Table 6 and 8 are expecting their mains in 10 minutes! What is our play?'
          }
        ],
        options: [
          {
            id: 'cr-1',
            playerResponse: 'Panic! Tell the front of house to kick the customers out!',
            isOptimal: false,
            colleagueReaction: 'Are you serious?! We cannot do that!',
            feedback: 'Never panic or lose composure in front of the kitchen brigade.',
            professionalEnglishNote: 'Maintain calm, authoritative composure.',
            points: 0
          },
          {
            id: 'cr-2',
            playerResponse: 'Stay calm brigade. Check core temperature of the 14 roasts immediately with a probe. Transfer the beef immediately into the pastry combi-oven on Station 3. For the vegetables, fire heavy cast-iron skillets on the induction burners to finish searing and caramelizing them. Marcus, notify front of house there is a 5-minute hold on Table 8 with complimentary amuse-bouche.',
            isOptimal: true,
            colleagueReaction: 'Yes Chef! Probing now, transferring to Oven 3, and lighting the cast-iron pans. Front of house notified!',
            feedback: 'Brilliant leadership! You assessed product temperature, utilized alternative equipment (Station 3 & cast iron), and managed customer expectations through the floor manager.',
            professionalEnglishNote: '"Transfer immediately", "fire heavy cast-iron", and "complimentary amuse-bouche" represent true professional kitchen management.',
            points: 100
          },
          {
            id: 'cr-3',
            playerResponse: 'Leave the oven door closed and hope the residual heat finishes the cooking.',
            isOptimal: false,
            colleagueReaction: 'Chef, residual heat without fan circulation will steam the meat and drop below safe temperature!',
            feedback: 'Unsafe and unpredictable. Food temperatures will drop and ruin texture.',
            professionalEnglishNote: 'Decisive action is required when equipment fails.',
            points: 20
          }
        ]
      }
    ],
    reflection: {
      q1: 'Why is recipe scaling calculation crucial for both portion consistency and food cost control?',
      q2: 'What is the culinary reason for resting seared red meat before slicing and plating?',
      q3: 'What English phrase can a head chef say to calm their brigade during a rush hour equipment failure?'
    }
  },

  // ----------------------------------------------------
  // LEVEL 5: THE CUSTOMER IS ALWAYS DIFFERENT
  // ----------------------------------------------------
  {
    id: 5,
    title: 'The Customer Is Always Different',
    norwegianTitle: 'Gjesten i sentrum: Kommunikasjon og service',
    location: 'Metropolitan International Dining Room',
    country: 'Global Service',
    flag: '🤝',
    summary: 'Master polite English communication, handle severe allergies, de-escalate customer complaints, and explain culinary nuances.',
    storyContext: 'A restaurant lives and dies by its guests. Tonight you are working at the chef’s counter where international guests interact directly with the kitchen brigade. You will encounter food allergies, dietary questions, and high-expectation diners.',
    image: IMAGES.hero,
    badgeAwarded: {
      id: 'service_ambassador',
      title: 'Service Ambassador',
      description: 'Handled complex allergies with zero cross-contact and resolved guest complaints with consummate professionalism.',
      icon: 'Smile',
      category: 'communication'
    },
    tasks: [
      {
        id: '5-1',
        title: 'Task 1: Severe Food Allergy Dialogue (Table 4)',
        subtitle: 'Protect a guest with severe celiac disease and peanut allergies',
        instructions: 'A guest informs you that they have severe celiac disease (gluten) and a peanut allergy. Choose the most professional response.',
        type: 'dialogue',
        points: 100,
        context: 'An American tourist walks up to the counter looking anxious about the tasting menu.',
        initialDialogue: [
          {
            speaker: 'customer',
            name: 'Guest (Sarah)',
            text: 'Hello chef! I would love to order the 5-course tasting menu, but I have severe celiac disease and an anaphylactic peanut allergy. Can your kitchen accommodate me safely, or is there a risk of cross-contamination?'
          }
        ],
        options: [
          {
            id: 'all-1',
            playerResponse: 'Yeah, I think our food has no peanuts. You can just pick out the bread croutons from the soup.',
            isOptimal: false,
            colleagueReaction: 'Excuse me? "Picking out croutons" will cause a severe allergic reaction!',
            feedback: 'Potentially fatal mistake! Celiac disease triggers severe autoimmune damage even from microscopic bread crumbs.',
            professionalEnglishNote: 'Never suggest "picking out" allergenic items.',
            points: 0
          },
          {
            id: 'all-2',
            playerResponse: 'Thank you for letting us know right away, Sarah. We take food allergies very seriously. Our kitchen is completely peanut-free. For your celiac disease, we will prepare your dishes using dedicated clean pans, fresh sanitized utensils, and certified gluten-free stocks. I will personally supervise your courses at the pass to ensure zero cross-contact.',
            isOptimal: true,
            colleagueReaction: 'What a relief! Thank you so much for your thoroughness and reassurance, chef.',
            feedback: 'Outstanding! Empathetic, highly specific regarding kitchen SOPs (dedicated sanitized pans, separate utensils), and gives total peace of mind.',
            professionalEnglishNote: '"Zero cross-contact", "dedicated sanitized pans", and "personally supervise" build immense guest trust.',
            points: 100
          },
          {
            id: 'all-3',
            playerResponse: 'I am not sure, you should just order bottled water and a plain salad to be safe.',
            isOptimal: false,
            colleagueReaction: 'Oh... well, that is disappointing. I was hoping for a nice dining experience.',
            feedback: 'Unhelpful hospitality. A skilled international chef accommodates allergies with delicious, safe culinary alternatives.',
            professionalEnglishNote: 'Offer positive solutions rather than turning guests away unnecessarily.',
            points: 25
          }
        ]
      },
      {
        id: '5-2',
        title: 'Task 2: Handling a Cold Food Complaint',
        subtitle: 'Turn a dissatisfied guest into an enthusiastic regular',
        instructions: 'A guest calls the chef over, stating that their roasted cod and beurre blanc sauce arrived lukewarm. Choose the ideal de-escalation response.',
        type: 'dialogue',
        points: 100,
        context: 'Table 7 has their plates pushed aside and the guest looks frustrated.',
        initialDialogue: [
          {
            speaker: 'customer',
            name: 'Guest (Mr. Harrison)',
            text: 'Excuse me chef. We have been waiting 25 minutes, and when this cod finally arrived, the fish and sauce were barely lukewarm. For these prices, this is unacceptable!'
          }
        ],
        options: [
          {
            id: 'comp-1',
            playerResponse: 'Well, the air conditioning in the dining room is cold, and our servers were busy, so it is not my fault.',
            isOptimal: false,
            colleagueReaction: 'Blaming your service staff and air conditioning? That is very unprofessional!',
            feedback: 'Never make excuses or blame teammates. Take ownership of the guest experience immediately.',
            professionalEnglishNote: 'Do not defend; apologize, take ownership, and provide swift resolution.',
            points: 0
          },
          {
            id: 'comp-2',
            playerResponse: 'I sincerely apologize, Mr. Harrison. You are absolutely right—our food must arrive piping hot at the peak of quality. Please let me replace this immediately with fresh fillets cooked right now. In the meantime, may I offer your table complimentary drinks while I prepare your fresh dish myself?',
            isOptimal: true,
            colleagueReaction: 'I appreciate your honest apology and swift action, chef. Thank you, that sounds wonderful.',
            feedback: 'Perfect hospitality leadership! Sincere apology, validation of the guest’s feelings, immediate replacement, and a generous gesture.',
            professionalEnglishNote: '"I sincerely apologize", "You are absolutely right", and "Please let me replace this immediately" are golden service phrases.',
            points: 100
          },
          {
            id: 'comp-3',
            playerResponse: 'I can put it in the microwave for 30 seconds for you if you want.',
            isOptimal: false,
            colleagueReaction: 'Microwave a delicate fresh cod in a fine dining restaurant?! Absolutely not!',
            feedback: 'Never microwave delicate fish or emulsified butter sauces; it breaks the emulsion and ruins the texture.',
            professionalEnglishNote: 'Always refire fresh food rather than reheating fine dining dishes.',
            points: 10
          }
        ]
      },
      {
        id: '5-3',
        title: 'Task 3: Explaining a Nordic Specialty in English',
        subtitle: 'Describe textures, flavours, and origin appealingly',
        instructions: 'An international guest asks: "What is Gravlax and Rømmegrøt?" Choose the most mouth-watering, culturally rich culinary explanation.',
        type: 'dialogue',
        points: 100,
        context: 'A food critic from London is inquiring about the heritage tasting menu.',
        initialDialogue: [
          {
            speaker: 'customer',
            name: 'Food Critic (Helena)',
            text: 'Could you describe the Nordic heritage course on your menu? How do you cure the salmon, and what makes the sour cream porridge so distinctive?'
          }
        ],
        options: [
          {
            id: 'exp-1',
            playerResponse: 'It is raw dead fish with salt and grass, and heavy porridge made of fat sour milk.',
            isOptimal: false,
            colleagueReaction: 'That sounds utterly unappetizing! What a dreadful description.',
            feedback: 'Terrible choice of words! "Dead fish" and "fat sour milk" destroy guest appetite.',
            professionalEnglishNote: 'Use sensory vocabulary: "silkily cured", "aromatic herbs", "rich velvet porridge".',
            points: 0
          },
          {
            id: 'exp-2',
            playerResponse: 'Our Gravlax is pristine Norwegian fjord salmon cured gently for 36 hours in sea salt, raw sugar, crushed juniper berries, and fresh dill, giving it a melt-in-your-mouth silky texture with subtle herbal notes. We pair it with artisanal Rømmegrøt—a heritage sour cream porridge simmered slowly until rich and velvety, dusted with cinnamon sugar and golden melted farmhouse butter.',
            isOptimal: true,
            colleagueReaction: 'That sounds absolutely exquisite! You have sold me, I will definitely order it.',
            feedback: 'Magnificent culinary storytelling! Precise culinary terms (cured, crushed juniper, melt-in-your-mouth, velvety, artisanal) that celebrate Norwegian food culture.',
            professionalEnglishNote: 'Descriptive sensory language engages diners’ imagination and justifies fine dining quality.',
            points: 100
          },
          {
            id: 'exp-3',
            playerResponse: 'It is just traditional food that my grandmother used to make in the village.',
            isOptimal: false,
            colleagueReaction: 'A nice sentiment, but does not tell me anything about the cooking techniques or flavors.',
            feedback: 'Too generic. International guests appreciate learning about techniques and flavours.',
            professionalEnglishNote: 'Combine heritage story with precise culinary technique description.',
            points: 40
          }
        ]
      }
    ],
    reflection: {
      q1: 'Why is it unacceptable in culinary hospitality to blame waitstaff or equipment when a guest complains?',
      q2: 'What are three sensory English adjectives you can use to describe food appealingly (e.g., crispy, velvety, aromatic)?',
      q3: 'Why must celiac disease be treated as an absolute medical condition and not an optional preference?'
    }
  },

  // ----------------------------------------------------
  // LEVEL 6: SUSTAINABILITY AND THE FUTURE OF FOOD
  // ----------------------------------------------------
  {
    id: 6,
    title: 'Sustainability and the Future of Food',
    norwegianTitle: 'Bærekraft og fremtidens gastronomi',
    location: 'Nordic Eco-Lab Restaurant',
    country: 'Trondheim & Lofoten',
    flag: '🌱',
    summary: 'Design seasonal zero-waste menus, minimize carbon food miles, utilize local Norwegian produce, and integrate smart kitchen tech.',
    storyContext: 'At the world-renowned Nordic Eco-Lab, cooking is guided by respect for nature. You must design a winter menu using local seasonal ingredients, turn kitchen food waste into culinary gold, and balance environmental impact with realistic kitchen budgets.',
    image: IMAGES.norwegian,
    badgeAwarded: {
      id: 'eco_champion',
      title: 'Eco-Gastronomy Champion',
      description: 'Mastered zero-waste upcycling, seasonal Nordic sourcing, and food-cost economics.',
      icon: 'Leaf',
      category: 'sustainability'
    },
    tasks: [
      {
        id: '6-1',
        title: 'Task 1: Norwegian Seasonal Produce Selector (Winter)',
        subtitle: 'Distinguish authentic Norwegian winter produce from high-carbon flown imports',
        instructions: 'Select the ingredients that are authentically in season and available locally in Norway during the cold winter/early spring months (low carbon footprint).',
        type: 'matching',
        points: 100,
        norwegianHint: 'Hvilke råvarer er i sesong i Norge på vinteren? Tenk rotgrønnsaker, skrei og lagrede bær!',
        items: [
          {
            id: 'sn-skrei',
            term: 'Arctic Skrei (Winter Cod)',
            norwegian: 'Norsk skrei (vintertorsk)',
            definition: 'Seasonal Arctic cod migrating from Barents Sea to Lofoten between January and April; peak firm texture.',
            category: 'Peak Nordic Winter'
          },
          {
            id: 'sn-parsnip',
            term: 'Cellar-Stored Root Vegetables',
            norwegian: 'Lagrede rotgrønnsaker',
            definition: 'Norwegian parsnips, rutabagas, and carrots sweetened by winter frost; stored in local root cellars.',
            category: 'Peak Nordic Winter'
          },
          {
            id: 'sn-berries',
            term: 'Preserved Lingonberries & Sea Buckthorn',
            norwegian: 'Tyttebær og tindved',
            definition: 'Wild hand-foraged berries preserved through lacto-fermentation, drying, or pickling for winter acidity.',
            category: 'Peak Nordic Winter'
          },
          {
            id: 'sn-berries-import',
            term: 'Air-Flown Fresh Strawberries (Peru/Chile)',
            norwegian: 'Langtransporterte jordbær',
            definition: 'Flown thousands of miles in winter; high fossil fuel emissions and water footprint. Avoid on sustainable menus.',
            category: 'High-Impact Import'
          }
        ]
      },
      {
        id: '6-2',
        title: 'Task 2: Upcycling Food Scraps (Zero Waste)',
        subtitle: 'Turn kitchen trimmings into delicious, high-value culinary assets',
        instructions: 'In a modern restaurant, throwing away peelings and trimmings is throwing away profit and planetary resources. Match the scrap ingredient with its high-end culinary upcycling technique.',
        type: 'matching',
        points: 100,
        norwegianHint: 'Bruk alt av råvaren: fiskebein til kraft, tørt surdeigsbrød til sprø krutonger, grønnsaksskall til urtesalt.',
        items: [
          {
            id: 'up-fish',
            term: 'Cod & Halibut Heads and Bones',
            norwegian: 'Fiskebein og avskjær',
            definition: 'Simmered with leek greens, fennel trimmings, and white wine for 25 minutes into a rich, gelatinous fish fumet.',
            category: 'Zero Waste Solution'
          },
          {
            id: 'up-bread',
            term: 'Stale Sourdough & Rye Bread',
            norwegian: 'Gammelt surdeigsbrød',
            definition: 'Sliced paper-thin and baked into crisp crackers (pangrattato), or ground into sourdough miso fermentation.',
            category: 'Zero Waste Solution'
          },
          {
            id: 'up-veggie',
            term: 'Carrot, Parsnip & Leek Peelings',
            norwegian: 'Rotgrønnsaksskall',
            definition: 'Dehydrated at 65°C and blitzed with sea salt and dried wild thyme into an umami-rich finishing salt.',
            category: 'Zero Waste Solution'
          },
          {
            id: 'up-apple',
            term: 'Apple Cores & Peelings',
            norwegian: 'Epleskall og kjerner',
            definition: 'Fermented with water and sugar into raw artisanal apple cider vinegar for salads and pickles.',
            category: 'Zero Waste Solution'
          }
        ]
      },
      {
        id: '6-3',
        title: 'Task 3: Food Cost Economics & Waste % Calculation',
        subtitle: 'Calculate food cost percentage and stop financial leakage',
        instructions: 'A sustainable restaurant must also be economically viable. Calculate food cost percentage and waste margins to keep the restaurant operating profitably.',
        type: 'kitchen_math',
        points: 120,
        norwegianHint: 'Varekostnadsprosent = (Varekostnad / Salgspris) × 100. Målet i restaurantbransjen er normalt 28–32%.',
        recipeTitle: 'Sustainable Menu Economics: Roasted Skrei with Brown Butter & Parsnip',
        problems: [
          {
            id: 'fc-1',
            scenario: 'The cost of ingredients for one portion of roasted skrei is 90 NOK. The menu sales price is 300 NOK (excluding VAT).',
            question: 'What is the food cost percentage (Varekostnadsprosent) for this dish?',
            baseAmount: '90 NOK cost / 300 NOK price',
            baseYield: 1,
            targetYield: 1,
            correctAnswer: 30,
            unit: '%',
            tolerance: 0.5,
            hint: 'Formula: (Cost ÷ Selling Price) × 100 = (90 ÷ 300) × 100.',
            explanation: '(90 ÷ 300) × 100 = 30%. This sits right in the optimal restaurant target bracket of 28–32%!'
          },
          {
            id: 'fc-2',
            scenario: 'A whole 10 kg Arctic cod costs 600 NOK. After butchering, you yield 6 kg of clean fillets and 4 kg of bones/heads.',
            question: 'If you discard the bones, what is the cost per kilogram of the usable fillet?',
            baseAmount: '600 NOK for 6 kg fillet',
            baseYield: 10,
            targetYield: 6,
            correctAnswer: 100,
            unit: 'NOK/kg',
            tolerance: 1,
            hint: 'Divide total fish cost (600 NOK) by the usable fillet weight (6 kg).',
            explanation: '600 NOK ÷ 6 kg = 100 NOK per kilogram. When you upcycle the 4 kg bones into fish fumet soup, your yield economy improves substantially!'
          }
        ]
      }
    ],
    reflection: {
      q1: 'Why is food waste reduction both an environmental victory and a financial necessity for restaurants?',
      q2: 'How does celebrating local seasonal Norwegian produce tell a more authentic culinary story than relying on imports?',
      q3: 'What English terms can you use on a menu to describe sustainable culinary techniques (e.g., "foraged", "upcycled", "lacto-fermented")?'
    }
  },

  // ----------------------------------------------------
  // LEVEL 7: HEAD CHEF – THE FINAL MISSION
  // ----------------------------------------------------
  {
    id: 7,
    title: 'Head Chef – The Final Mission',
    norwegianTitle: 'Kjøkkensjefen – Den store finalen',
    location: 'Global Culinary Academy Grand Gala',
    country: 'International Academy Summit',
    flag: '👑',
    summary: 'Lead the entire kitchen brigade for a 20-guest international gala banquet. Master menu creation, dietary management, budgeting, and crisis leadership to graduate!',
    storyContext: 'This is the moment you have worked towards throughout your journey. Tonight, the Global Kitchen Academy hosts its annual International Diplomatic Banquet for 20 distinguished guests. You are the Head Chef. You will design the menu, accommodate complex allergies, calculate yields, maintain food safety, handle an unexpected crisis, write the English menu descriptions, and defend your choices to the Academy Board.',
    image: IMAGES.banquet,
    badgeAwarded: {
      id: 'head_chef_grand',
      title: 'International Head Chef',
      description: 'Graduated with highest culinary honours! Proved mastery of cooking, leadership, English communication, and ethics.',
      icon: 'Crown',
      category: 'mastery'
    },
    tasks: [
      {
        id: '7-1',
        title: 'The Final Head Chef Examination',
        subtitle: 'The 9-Stage Master Culinary Leadership Challenge',
        instructions: 'Complete all 9 executive leadership steps: Menu Curation, Dietary Planning, Exact Yield Calculations, Timeline Sequencing, Food Safety Verification, Cost Control, Crisis Management, Professional English Writing, and General Manager Presentation.',
        type: 'head_chef_grand_challenge',
        points: 500,
        norwegianHint: 'Bruk alt du har lært fra de seks foregående nivåene. Tenk som en ekte kjøkkensjef!',
        vocabularyList: [
          { term: 'Executive Chef', norwegian: 'Kjøkkensjef', definition: 'The leader responsible for menu design, kitchen budget, brigade management, and quality control.' },
          { term: 'Amuse-bouche', norwegian: 'Appetittvekker', definition: 'A bite-sized complimentary hors d’œuvre served before the meal to showcase the chef’s creativity.' },
          { term: 'Critical Control Point (CCP)', norwegian: 'Kritisk styringspunkt', definition: 'A step where control can be applied to prevent or eliminate a food safety hazard.' }
        ]
      }
    ],
    reflection: {
      q1: 'Looking back on your journey from apprentice to Head Chef, what skill grew the most: cooking, English, or leadership?',
      q2: 'How will mastering professional kitchen English help your career when working internationally or on cruise lines?',
      q3: 'What culinary philosophy will you take with you into your future kitchen career?'
    }
  }
];
