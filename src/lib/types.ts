export interface TrainingProgram {
  name: string;
  subtitle: string;
  description: string;
  durationInHours: number;
  durationInDays: number;
  trainingPedagogicalModality: number;
  trainingModality: number;
  categoryId: string;
  specialty: string;
  capacity: {
    active: boolean;
    min: number;
    max: number;
  };
  steps: {
    title: string;
    text: string;
    substeps: { text: string }[];
  }[];
  goals: { text: string }[];
  prerequisites: { text: string }[];
  assessments: { text: string }[];
  pedagogicalResources: { text: string }[];
  targets: { text: string }[];
  handicappedAccessibility: string;
  satisfactionDescription: string;
  // Champs non envoyés à l'API
  pricePerClient?: number;
  pricePerStudent?: number;
  trainer?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  startDate?: {
    isPlanned: boolean;
    date?: Date;
  };
  comment?: string;
}

export interface FormStep {
  title: string;
  validate: () => string[];
}

export interface Specialty {
  code: string;
  label: string;
}

export const SPECIALTIES: Specialty[] = [
  { code: "100", label: "Formations générales" },
  { code: "110", label: "Spécialités pluriscientifiques" },
  { code: "111", label: "Physique-chimie" },
  { code: "112", label: "Chimie-biologie, biochimie" },
  { code: "113", label: "Sciences naturelles (biologie-géologie)" },
  { code: "114", label: "Mathématiques" },
  { code: "115", label: "Physique" },
  { code: "116", label: "Chimie" },
  { code: "117", label: "Sciences de la terre" },
  { code: "118", label: "Sciences de la vie" },
  { code: "120", label: "Spécialités pluridisciplinaires, sciences humaines et droit" },
  { code: "121", label: "Géographie" },
  { code: "122", label: "Economie" },
  { code: "123", label: "Sciences sociales (y compris démographie, anthropologie)" },
  { code: "124", label: "Psychologie" },
  { code: "125", label: "Linguistique" },
  { code: "126", label: "Histoire" },
  { code: "127", label: "Philosophie, éthique et théologie" },
  { code: "128", label: "Droit, sciences politiques" },
  { code: "130", label: "Spécialités littéraires et artistiques plurivalentes" },
  { code: "131", label: "Français, littérature et civilisation française" },
  { code: "132", label: "Arts plastiques" },
  { code: "133", label: "Musique, arts du spectacle" },
  { code: "134", label: "Autres disciplines artistiques et spécialités artistiques plurivalentes" },
  { code: "135", label: "Langues et civilisations anciennes" },
  { code: "136", label: "Langues vivantes, civilisations étrangères et régionales" },
  { code: "200", label: "Technologies industrielles fondamentales" },
  { code: "201", label: "Technologies de commandes des transformations industriels" },
  { code: "210", label: "Spécialités plurivalentes de l'agronomie et de l'agriculture" },
  { code: "211", label: "Productions végétales, cultures spécialisées" },
  { code: "212", label: "Productions animales, élevage spécialisé, aquaculture, soins aux animaux" },
  { code: "213", label: "Forêts, espaces naturels, faune sauvage, pêche" },
  { code: "214", label: "Aménagement paysager (parcs, jardins, espaces verts ...)" },
  { code: "220", label: "Spécialités pluritechnologiques des transformations" },
  { code: "221", label: "Agro-alimentaire, alimentation, cuisine" },
  { code: "222", label: "Transformations chimiques et apparentées" },
  { code: "223", label: "Métallurgie" },
  { code: "224", label: "Matériaux de construction, verre, céramique" },
  { code: "225", label: "Plasturgie, matériaux composites" },
  { code: "226", label: "Papier, carton" },
  { code: "227", label: "Energie, génie climatique" },
  { code: "230", label: "Spécialités pluritechnologiques, génie civil, construction, bois" },
  { code: "231", label: "Mines et carrières, génie civil, topographie" },
  { code: "232", label: "Bâtiment : construction et couverture" },
  { code: "233", label: "Bâtiment : finitions" },
  { code: "234", label: "Travail du bois et de l'ameublement" },
  { code: "240", label: "Spécialités pluritechnologiques matériaux souples" },
  { code: "241", label: "Textile" },
  { code: "242", label: "Habillement (y compris mode, couture)" },
  { code: "243", label: "Cuirs et peaux" },
  { code: "250", label: "Spécialités pluritechnologiques mécanique-électricité" },
  { code: "251", label: "Mécanique générale et de précision, usinage" },
  { code: "252", label: "Moteurs et mécanique auto" },
  { code: "253", label: "Mécanique aéronautique et spatiale" },
  { code: "254", label: "Structures métalliques" },
  { code: "255", label: "Electricité, électronique" },
  { code: "300", label: "Spécialités plurivalentes des services" },
  { code: "310", label: "Spécialités plurivalentes des échanges et de la gestion" },
  { code: "311", label: "Transports, manutention, magasinage" },
  { code: "312", label: "Commerce, vente" },
  { code: "313", label: "Finances, banque, assurances" },
  { code: "314", label: "Comptabilité, gestion" },
  { code: "315", label: "Ressources humaines, gestion du personnel, gestion de l'emploi" },
  { code: "320", label: "Spécialités plurivalentes de la communication" },
  { code: "321", label: "Journalisme, communication" },
  { code: "322", label: "Techniques de l'imprimerie et de l'édition" },
  { code: "323", label: "Techniques de l'image et du son, métiers connexes du spectacle" },
  { code: "324", label: "Secrétariat, bureautique" },
  { code: "325", label: "Documentation, bibliothèques, administration des données" },
  { code: "326", label: "Informatique, traitement de l'information, réseaux de transmission" },
  { code: "330", label: "Spécialités plurivalentes sanitaires et sociales" },
  { code: "331", label: "Santé" },
  { code: "332", label: "Travail social" },
  { code: "333", label: "Enseignement, formation" },
  { code: "334", label: "Accueil, hôtellerie, tourisme" },
  { code: "335", label: "Animation culturelle, sportive et de loisirs" },
  { code: "336", label: "Coiffure, esthétique et autres spécialités des services" },
  { code: "341", label: "Aménagement du territoire, développement, urbanisme" },
  { code: "343", label: "Protection et développement du patrimoine" },
  { code: "344", label: "Sécurité des biens et des personnes, police, surveillance" },
  { code: "345", label: "Application des droits et statut des personnes" },
  { code: "346", label: "Spécialités militaires" },
  { code: "410", label: "Spécialités concernant plusieurs capacités" },
  { code: "411", label: "Pratiques sportives (y compris : arts martiaux)" },
  { code: "412", label: "Développement des capacités mentales et apprentissages de base" },
  { code: "413", label: "Développement des capacités comportementales et relationnelles" },
  { code: "414", label: "Développement des capacités individuelles d'organisation" },
  { code: "415", label: "Développement des capacités d'orientation, d'insertion ou de réinsertion" },
  { code: "421", label: "Jeux et activités spécifiques de loisirs" },
  { code: "422", label: "Economie et activités domestiques" },
  { code: "423", label: "Vie familiale, vie sociale et autres formations au développement personnel" },
  { code: "999", label: "Autres" }
];
