/*
====================================================================
QUIETINK INTERNATIONALIZATION (i18n) & TRANSLATIONS DICTIONARY
====================================================================
FILE: src/i18n/translations.ts
PURPOSE:
Enables full customization of the website in any human language
(English, Luganda, Spanish, French, German, Swahili, etc.).

HOW TO CUSTOMIZE OR ADD A NEW LANGUAGE:
1. Copy one of the language blocks below (e.g. 'en').
2. Rename the key to your language code (e.g. 'lg' for Luganda, 'es' for Spanish, 'fr' for French, 'de' for German, 'sw' for Swahili).
3. Translate the sentences on the right-hand side.
====================================================================
*/

export type LanguageCode = 'en' | 'lg' | 'es' | 'fr' | 'sw';

export interface LanguageInfo {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'lg', label: 'Luganda', nativeName: 'Oluganda', flag: '🇺🇬' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'sw', label: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿' },
];

export const translations: Record<LanguageCode, {
  siteName: string;
  tagline: string;
  subtitle: string;
  startWriting: string;
  exploreDashboard: string;
  calmMode: string;
  solitudeMode: string;
  dailyPrompt: string;
  lettersToFutureMe: string;
  timeCapsules: string;
  myGarden: string;
  library: string;
  settings: string;
  theme: string;
  soundscape: string;
  wordsWritten: string;
  saveStatus: string;
}> = {
  en: {
    siteName: 'QuietInk',
    tagline: 'Your Journal, Your Space',
    subtitle: 'A tranquil haven away from digital noise. No notifications, no rush. Just you and your thoughts.',
    startWriting: 'Start Writing',
    exploreDashboard: 'Explore Dashboard',
    calmMode: 'Calm Mode',
    solitudeMode: 'Solitude Mode',
    dailyPrompt: 'Daily Thought',
    lettersToFutureMe: 'Letters to Future Me',
    timeCapsules: 'Time Capsules',
    myGarden: 'My Quiet Garden',
    library: 'Personal Library',
    settings: 'Settings & Privacy',
    theme: 'Theme',
    soundscape: 'Soundscape',
    wordsWritten: 'words penned',
    saveStatus: 'All thoughts saved quietly',
  },
  lg: {
    siteName: 'QuietInk',
    tagline: 'Ekitabo Kyo, Ekifo Kyo',
    subtitle: 'Ekifo eky’emirembe okusomera n’okuwandiika ebirowoozo byo mu kasirise nga tewali matabanguko.',
    startWriting: 'Tandika Okuwandiika',
    exploreDashboard: 'Laba Ebyawandiikiddwa',
    calmMode: 'Emirembe gy’Omutima',
    solitudeMode: 'Ekiseera ky’Akasirise',
    dailyPrompt: 'Ekirowoozo ky’Olunaku',
    lettersToFutureMe: 'Ebaluwa eri nze ow’ebiseera ebijja',
    timeCapsules: 'Ebikakiddwa eby’Ebiseera',
    myGarden: 'Ennimiro y’Ebirowoozo Byange',
    library: 'Etterekero Lyange',
    settings: 'Enteekateeka n’Ebyama',
    theme: 'Langi z’Omutwe',
    soundscape: 'Edoboozi ly’Obutonde',
    wordsWritten: 'ebigambo ebiwandiikiddwa',
    saveStatus: 'Buli kirowoozo kiterekeddwa mu mirembe',
  },
  es: {
    siteName: 'QuietInk',
    tagline: 'Tu Diario, Tu Espacio',
    subtitle: 'Un refugio tranquilo lejos del ruido digital. Sin notificaciones, sin prisas. Solo tú y tus pensamientos.',
    startWriting: 'Comenzar a Escribir',
    exploreDashboard: 'Explorar Panel',
    calmMode: 'Modo Calma',
    solitudeMode: 'Modo Soledad',
    dailyPrompt: 'Pregunta del Día',
    lettersToFutureMe: 'Cartas para Mi Futuro',
    timeCapsules: 'Cápsulas del Tiempo',
    myGarden: 'Mi Jardín Tranquilo',
    library: 'Biblioteca Personal',
    settings: 'Configuración y Privacidad',
    theme: 'Tema',
    soundscape: 'Sonidos Ambientales',
    wordsWritten: 'palabras escritas',
    saveStatus: 'Pensamientos guardados en silencio',
  },
  fr: {
    siteName: 'QuietInk',
    tagline: 'Votre Journal, Votre Espace',
    subtitle: 'Un havre de paix loin du tumulte numérique. Pas de notifications, pas de hâte. Juste vous et vos pensées.',
    startWriting: 'Commencer à Écrire',
    exploreDashboard: 'Explorer le Journal',
    calmMode: 'Mode Calme',
    solitudeMode: 'Mode Solitude',
    dailyPrompt: 'Pensée du Jour',
    lettersToFutureMe: 'Lettres à Mon Futur',
    timeCapsules: 'Capsules Temporelles',
    myGarden: 'Mon Jardin Paisible',
    library: 'Bibliothèque Personnelle',
    settings: 'Paramètres & Confidentialité',
    theme: 'Thème',
    soundscape: 'Ambiance Sonore',
    wordsWritten: 'mots écrits',
    saveStatus: 'Toutes vos pensées sont sauvegardées',
  },
  sw: {
    siteName: 'QuietInk',
    tagline: 'Shajara Yako, Nafasi Yako',
    subtitle: 'Nafasi tulivu mbali na kelele za kidijitali. Hakuna arifa, hakuna haraka. Wewe tu na mawazo yako.',
    startWriting: 'Anza Kuandika',
    exploreDashboard: 'Tazama Shajara',
    calmMode: 'Hali ya Utulivu',
    solitudeMode: 'Hali ya Upweke Mtulivu',
    dailyPrompt: 'Wazo la Leo',
    lettersToFutureMe: 'Barua kwa Nafsi ya Baadaye',
    timeCapsules: 'Vifurushi vya Wakati',
    myGarden: 'Bustani Yangu ya Utulivu',
    library: 'Maktaba ya Kibinafsi',
    settings: 'Mipangilio na Faragha',
    theme: 'Mandhari',
    soundscape: 'Sauti za Asili',
    wordsWritten: 'maneno yaliyoandikwa',
    saveStatus: 'Mawazo yote yamehifadhiwa kwa utulivu',
  },
};
