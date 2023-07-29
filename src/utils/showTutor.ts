// import { TutorInterface } from '../models/Tutor';

export interface tutorInterfaceShow {
  name: string;
  password?: string;
  phone: string;
  email: string;
  date_of_birth: string;
  zip_code: string;
}

const formatTutorToShow = (tutor: tutorInterfaceShow) => {
  const tutorShow = {
    name: tutor.name,
    phone: tutor.phone,
    email: tutor.email,
    date_of_birth: tutor.date_of_birth,
    zip_code: tutor.zip_code,
  };
  return tutorShow;
};

export { formatTutorToShow };
