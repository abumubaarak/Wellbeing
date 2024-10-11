/* eslint-disable react/react-in-jsx-scope */
import {
  Brain,
  BrainNeuro,
  Dentist,
  Doctor,
  HeartOrgan,
  Schedule,
  Stethoscope,
  Telemedicine,
} from '../assets/svgs';

export const carouselData = [
  {
    title: 'AI Health\nAssistant',
    summary:
      'AI-powered symptom analysis tool to identify\npotential medical conditions.',
    icon: <Brain />,
  },
  {
    title: 'Discover\nDoctors',
    summary:
      "Don't settle for anything less. Connect with\nhighly skilled physicians for expert care.",

    icon: <Doctor />,
  },
  {
    title: 'Seamless\nAppointment',
    summary:
      'Book appointments directly with your doctor,\nsay goodbye to phone tag.',
    icon: <Schedule />,
  },
  {
    title: 'Virtual\nConsultation',
    summary:
      'Skip the wait and get expert healthcare\nconsultations with a quick video visit.',
    icon: <Telemedicine />,
  },
];

export const SPECIALISTS = [
  {
    name: 'Dentist',
    icon: <Dentist />,
  },
  {
    name: 'General',
    icon: <Stethoscope />,
  },

  {
    name: 'Neurologist',
    icon: <BrainNeuro />,
  },
  {
    name: 'Cardiology',
    icon: <HeartOrgan />,
  },
];
