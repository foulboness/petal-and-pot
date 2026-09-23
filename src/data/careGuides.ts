import { CareGuide } from '../types';

export const CARE_GUIDES_DATA: CareGuide[] = [
  {
    id: 'art-of-watering',
    title: 'The Gentle Art of Plant Hydration',
    category: 'watering',
    readTime: '4 min read',
    iconName: 'Droplets',
    excerpt: 'Overwatering is the #1 plant heartbreak. Learn how to do the "knuckle test", master bottom-watering, and read thirst cues.',
    fullContent: `Most houseplant parents don't lose plants from neglect—they love them a little too enthusiastically with the watering can! Here is our mindful greenhouse methodology for keeping roots plump and rot-free.`,
    steps: [
      {
        step: 1,
        title: 'The Two-Inch Knuckle Test',
        detail: 'Insert your index finger 2 inches into the soil. If it feels cool and damp like a wrung-out sponge, wait a few days. If it is dry and crumbly, it is time for a soothing drink.'
      },
      {
        step: 2,
        title: 'The Magic of Bottom Watering',
        detail: 'Place your potted plant inside a shallow tray filled with 1 inch of tepid water. The soil will capillary-drink only what it needs from the drainage hole over 30 minutes, keeping fungus gnats away from the dry topsoil.'
      },
      {
        step: 3,
        title: 'Room Temperature Water Only',
        detail: 'Cold tap water shocks tender tropical roots. Let tap water sit out overnight in your watering can so chlorine evaporates and it warms to room temperature.'
      }
    ]
  },
  {
    id: 'sunlight-decoded',
    title: 'Sunlight Decoded: Direct, Bright Indirect & Low Light',
    category: 'sunlight',
    readTime: '3 min read',
    iconName: 'Sun',
    excerpt: 'What does "bright indirect light" actually mean? A simple shadow-test trick to map every window in your home.',
    fullContent: `Light is plant food! Understanding your home's natural sun compass ensures your plants don't get sunburned or slowly starved of photosynthesis.`,
    steps: [
      {
        step: 1,
        title: 'The Hand Shadow Test',
        detail: 'Hold your hand 12 inches above a piece of white paper near your plant at midday. A sharp, crisp shadow means bright direct light. A soft-edged, diffused shadow is the holy grail: bright indirect light. Barely any shadow means low light.'
      },
      {
        step: 2,
        title: 'Window Orientation Compass',
        detail: 'South-facing windows get intense afternoon sun (great for cacti, lavender, jade). East windows give gentle morning gold (ideal for calatheas and ferns). North windows provide mellow, steady cool light (perfect for snake plants and pothos).'
      },
      {
        step: 3,
        title: 'Sheer Curtains are Your Plant’s Best Friend',
        detail: 'A simple linen or voile curtain softens scorching midday rays into beautiful, dappled light without sacrificing lumens.'
      }
    ]
  },
  {
    id: 'repotting-101',
    title: 'Mindful Repotting: When, Why & How',
    category: 'repotting',
    readTime: '5 min read',
    iconName: 'Sparkles',
    excerpt: 'Recognize the telltale signs of a root-bound plant, learn how to size up pots properly, and blend our fluffy cottage soil recipe.',
    fullContent: `Spring and early summer are the magical seasons for repotting as plants awaken with active growth. Follow this guide to avoid transplant shock.`,
    steps: [
      {
        step: 1,
        title: 'Signs It Is Time to Size Up',
        detail: 'Roots poking out through the bottom drainage holes, water rushing straight through without absorbing, or growth slowing down despite feeding.'
      },
      {
        step: 2,
        title: 'The Golden Rule of Sizing',
        detail: 'Only increase pot diameter by 1 to 2 inches! Jumping to a giant pot holds too much damp unrooted soil, inviting root rot.'
      },
      {
        step: 3,
        title: 'The Petal & Pot Cottage Soil Recipe',
        detail: 'Mix 2 parts coco coir / peat-free base, 1 part perlite or pumice for aeration, and 1 part horticultural orchid bark for drainage.'
      }
    ]
  },
  {
    id: 'plant-doctor-troubleshooting',
    title: 'The Plant Doctor: Symptom & Cure Guide',
    category: 'troubleshooting',
    readTime: '6 min read',
    iconName: 'Stethoscope',
    excerpt: 'Yellowing leaves? Crispy tips? Drooping stems? Don’t panic—here is how to diagnose and gently nurse your plant back to radiant health.',
    fullContent: `Plants talk to us through their leaves. Here is our greenhouse emergency triage guide for the most common indoor ailments.`,
    symptoms: [
      {
        symptom: 'Yellowing lower leaves with soggy soil',
        cause: 'Overwatering and suffocating roots.',
        cure: 'Stop watering immediately. Check drainage hole for blockages. Aerate soil with a wooden chopstick and let the top 3 inches dry out before next drink.'
      },
      {
        symptom: 'Crispy, dry brown leaf edges & tips',
        cause: 'Dry indoor air / low humidity, or mineral salt buildup from hard tap water.',
        cure: 'Switch to filtered water, cluster your plants together to create a micro-humidity bubble, or run a cool mist humidifier nearby.'
      },
      {
        symptom: 'Pale leaves with extra long, leggy stems',
        cause: 'Reaching desperately for light (etiolation).',
        cure: 'Gently prune the leggy tops to promote bushier growth, and move the pot 2-3 feet closer to an unshaded window.'
      },
      {
        symptom: 'Dramatic full-plant limp drooping',
        cause: 'Thirst shock (especially common with Peace Lilies & Fittonias).',
        cure: 'Give a generous thorough soaking until water drains freely from the bottom. They usually bounce back upright in 3-4 hours!'
      },
      {
        symptom: 'Tiny black gnats hovering around topsoil',
        cause: 'Fungus gnats thriving in perpetually damp organic soil.',
        cure: 'Let top 2 inches of soil dry completely between watering. Sprinkle a 1/4 inch layer of horticultural sand or diatomaceous earth on top.'
      }
    ]
  }
];

export const PLANT_PROBLEMS = [
  {
    id: 'yellow-leaves',
    title: 'Yellow Leaves',
    quickFix: 'Check soil moisture: if wet, let dry out; if bone dry, give a deep drink.'
  },
  {
    id: 'brown-tips',
    title: 'Crispy Brown Tips',
    quickFix: 'Increase room humidity with misting or use filtered room-temperature water.'
  },
  {
    id: 'drooping',
    title: 'Limp Drooping Foliage',
    quickFix: 'Check for thirst or root-bound distress. Water thoroughly if soil is dry.'
  },
  {
    id: 'pests-gnats',
    title: 'Tiny Soil Gnats',
    quickFix: 'Bottom-water to keep surface dry, and apply organic neem oil spray.'
  }
];
