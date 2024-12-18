const en = {
  translation: [
    {
      title: 'AI Health Assistant',
      summary:
        'AI-powered symptom analysis tool to identify potential medical conditions.',
    },
    {
      title: 'Discover Doctors',
      summary:
        "Don't settle for anything less. Connect with\nhighly skilled physicians for expert care.",
    },
    {
      title: 'Seamless\nAppointment',
      summary:
        'Book appointments directly with your doctor, say goodbye to phone tag.',
    },
    {
      title: 'Virtual\nConsultation',
      summary:
        'Skip the wait and get expert healthcare\nconsultations with a quick video visit.',
    },
  ],
  login: 'Login',
  getStarted: 'Get Started',
  arabic: 'Arabic',
  selectLng: 'Select Language',
  lngTip: 'Tip: You can change this later in settings.',
  authMessage:
    'Experience convenient healthcare! Use our AI symptom checker, connect with top-rated\nphysicians and much more.',
  withGoogle: 'Continue with Google',
  withApple: 'Continue with Apple',
  enableMic: 'Enable microphone',
  allow: 'Allow',
  enableMicSummary:
    'Please enable microphone access so the AI can analyze your symptoms, and recommend\npotential conditions and medications.',
  symptoms: 'Please, describe\nyour symptoms',
  analyse: 'Analyse',
  analysing: 'Analysing your symptoms',
  done: 'Done',
  gotIt: 'Got it',
  advice:
    'This app does not replace doctors. Always consult with a qualified physician for any health concerns.',
};

export default en;
export type Translations = typeof en;
export type Translation = typeof en.translation;

export type LNGCODE = 'en' | 'ar' | 'es';
