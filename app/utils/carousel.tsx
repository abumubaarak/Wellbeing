/* eslint-disable react/react-in-jsx-scope */
import {
  Brain,
  BrainNeuro,
  BrainNeuroN,
  Dentist,
  DentistN,
  Doctor,
  Gastrology,
  Gynecology,
  GynecologyN,
  HeartOrgan,
  Lungs,
  Nephrology,
  Ophthalmology,
  Orthopedics,
  Pediatrics,
  Schedule,
  Stethoscope,
  StethoscopeN,
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

export type ISPECIALISTS = {
  name: string;
  who: string;
  summary: string;
  when: string;
};

export const SPECIALISTS_INFO: ISPECIALISTS[] = [
  {
    name: 'General',
    who: 'General Health Care Provider',
    summary:
      'General health care focuses on maintaining overall well-being by addressing a wide range of physical, mental, and preventive health needs. Primary care providers offer routine check-ups, vaccinations, health screenings, and treatment for common illnesses, serving as the first point of contact for most health concerns.',
    when: "Consult a general health care provider for annual check-ups, vaccinations, or health screenings. You should also visit if you experience persistent symptoms like fatigue, headaches, fever, or digestive issues. If you're managing chronic conditions, such as diabetes or high blood pressure, regular appointments help maintain stability and prevent complications.",
  },
  {
    name: 'Dentist',
    who: 'Dentist',
    summary:
      'Dentists specialize in the care of teeth, gums, and overall oral health. They diagnose and treat common dental issues like cavities, gum disease, and tooth infections while also focusing on preventative care through regular cleanings and check-ups. Dentists help maintain a healthy smile and prevent long-term oral health problems.',
    when: 'You should visit a dentist if you experience tooth pain, bleeding gums, sensitivity to hot or cold, or swelling in your mouth. Regular check-ups are also essential every six months to prevent dental problems, even if you aren’t experiencing symptoms. If you have persistent bad breath or difficulty chewing, early dental care can prevent further complications.',
  },
  {
    name: 'Neurology',
    who: 'Neurologist',
    summary:
      'Neurologists specialize in diagnosing and treating disorders related to the brain, spinal cord, and nervous system. They manage conditions like migraines, epilepsy, multiple sclerosis, strokes, and neurological disorders such as Parkinson’s and Alzheimer’s. Neurologists aim to improve quality of life through early diagnosis, treatment, and symptom management.',
    when: "Consult a neurologist if you experience chronic headaches, seizures, muscle weakness, numbness, memory loss, or difficulty with coordination. It's also essential to seek care if you've had a stroke or suffer from conditions like epilepsy or neurological disorders. Early intervention can help prevent progression and manage symptoms effectively.",
  },
  {
    name: 'Gynecology',
    who: 'Gynecologist',
    summary:
      "Gynecologists specialize in women's reproductive health, diagnosing and treating conditions related to the uterus, ovaries, and other parts of the reproductive system. They provide care for menstrual disorders, hormonal imbalances, fertility issues, and menopause, as well as preventive screenings like Pap smears and breast exams.",
    when: 'Consult a gynecologist for routine wellness exams, including Pap smears and breast checks. Seek care if you experience irregular periods, pelvic pain, or symptoms of menopause. A gynecologist can also assist with contraception, fertility concerns, and pregnancy care, ensuring optimal reproductive health throughout every life stage.',
  },
  {
    name: 'Cardiology',
    who: 'Cardiologist',
    summary:
      'Cardiologists specialize in diagnosing and treating conditions related to the heart and circulatory system, including heart disease, hypertension, and arrhythmias. They provide preventive care, lifestyle guidance, and medical treatments to help maintain heart health and manage symptoms effectively. Their expertise ranges from routine check-ups to advanced cardiac procedures.',
    when: 'You may need to see a cardiologist if you’re experiencing persistent chest pain, irregular heartbeats, or shortness of breath. Swelling in the legs or unexplained dizziness can also indicate heart issues requiring attention. Individuals with a family history of heart disease, high blood pressure, or diabetes are encouraged to schedule regular check-ups to stay ahead of potential risks.',
  },
  {
    name: 'Pulmonology',
    who: 'Pulmonologist',
    summary:
      'Pulmonologists specialize in diagnosing and treating diseases of the lungs and respiratory system. They manage conditions such as asthma, chronic obstructive pulmonary disease (COPD), pneumonia, and sleep apnea. Pulmonologists focus on improving lung function and respiratory health through personalized treatment and ongoing care.',
    when: "Consult a pulmonologist if you experience persistent coughing, shortness of breath, chest tightness, or wheezing. If you have conditions like asthma, COPD, or recurring lung infections, specialized care can help manage symptoms. You should also seek their expertise if you're experiencing unexplained fatigue, trouble breathing, or sleep-related breathing disorders.",
  },
  {
    name: 'Pediatrics',
    who: 'Pediatrician',
    summary:
      'Pediatricians specialize in the medical care of infants, children, and adolescents, focusing on their physical, emotional, and developmental well-being. They provide routine check-ups, vaccinations, and treatment for illnesses while monitoring growth milestones to ensure healthy development.',
    when: 'Consult a pediatrician for your child’s routine check-ups, vaccinations, and developmental screenings. You should also visit if your child has a fever, persistent cough, digestive issues, or behavioral changes. Pediatricians provide specialized care for childhood illnesses, infections, allergies, and chronic conditions, ensuring your child stays healthy and thrives throughout every stage of development.',
  },
  {
    name: 'Orthopedics',
    who: 'Orthopedist',
    summary:
      'Orthopedists specialize in diagnosing and treating conditions related to the bones, joints, muscles, and ligaments. They manage issues like fractures, arthritis, back pain, and sports injuries, focusing on restoring mobility and improving quality of life through surgical and non-surgical treatments.',
    when: "Consult an orthopedist if you experience joint pain, stiffness, swelling, or difficulty moving. If you've sustained an injury like a fracture or sprain, or have chronic conditions such as arthritis or back pain, orthopedic care can help. Seek care for mobility issues or persistent discomfort to prevent further complications and promote long-term joint health.",
  },
  {
    name: 'Gastrology',
    who: 'Gastroenterologist',
    summary:
      'Gastroenterologists specialize in diagnosing and treating conditions affecting the digestive system, including the stomach, intestines, liver, and pancreas. They manage disorders such as acid reflux, irritable bowel syndrome (IBS), ulcers, and liver diseases, focusing on improving digestive health and overall well-being.',
    when: 'Consult a gastroenterologist if you experience frequent heartburn, abdominal pain, bloating, diarrhea, or constipation. You should also seek care for persistent digestive issues, blood in your stool, or unexplained weight loss. Regular screenings, such as colonoscopies, are recommended for preventive care and early detection of gastrointestinal diseases.',
  },
  {
    name: 'Nephrology',
    who: 'Nephrologist',
    summary:
      'Nephrologists specialize in diagnosing and treating kidney-related conditions, including chronic kidney disease (CKD), kidney stones, hypertension, and electrolyte imbalances. They focus on improving kidney function, managing diseases that affect the kidneys, and providing care for patients undergoing dialysis.',
    when: 'Consult a nephrologist if you experience symptoms such as swelling in the legs or feet, persistent fatigue, high blood pressure, or changes in urination patterns. If you have conditions like diabetes or hypertension, regular nephrology care can help prevent kidney complications. Early intervention is crucial for managing chronic kidney disease and maintaining kidney health.',
  },
  {
    name: 'Ophthalmology',
    who: 'Ophthalmologist',
    summary:
      'Ophthalmologists specialize in diagnosing and treating eye-related conditions, including vision problems, eye injuries, and diseases such as glaucoma and cataracts. They provide comprehensive eye care, including routine eye exams, prescriptions for glasses or contact lenses, and surgical interventions for more serious eye conditions.',
    when: 'Consult an ophthalmologist if you experience blurred vision, persistent eye pain, redness, or changes in your vision. It’s also essential to seek care for symptoms like floaters or flashes of light, which may indicate underlying issues. Regular eye exams are important for maintaining eye health, especially for those with a family history of eye diseases or those over the age of 40.',
  },
];

export const SPECIALISTS = [
  {
    name: 'General',
    icon: <Stethoscope />,
  },
  {
    name: 'Dentist',
    icon: <Dentist />,
  },
  {
    name: 'Neurology',
    icon: <BrainNeuro />,
  },
  {
    name: 'Gynecology',
    icon: <Gynecology/>,
  },
  {
    name: 'Cardiology',
    icon: <HeartOrgan />,
  },
  {
    name: 'Pulmonology',
    icon: <Lungs />,
  },
  {
    name: 'Pediatrics',
    icon: <Pediatrics />,
  },

  {
    name: 'Orthopedics',
    icon: <Orthopedics />,
  },
  {
    name: 'Gastrology',
    icon: <Gastrology />,
  },
  {
    name: 'Nephrology',
    icon: <Nephrology />,
  },

  {
    name: 'Ophthalmology',
    icon: <Ophthalmology />,
  },
  {
    name: '',
    icon: null,
  },
];

export const SPECIALISTS_HOME = [
  {
    name: 'General',
    icon: <StethoscopeN />,
  },
  {
    name: 'Dentist',
    icon: <DentistN />,
  },
  {
    name: 'Neurology',
    icon: <BrainNeuroN />,
  },
  {
    name: 'Gynecology',
    icon: <GynecologyN />,
  },
];
