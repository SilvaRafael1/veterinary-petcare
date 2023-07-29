// import { StatusCodes } from 'http-status-codes';
// import Tutor from '../models/Tutor';
// import tutorService from '../services/tutor.service';
// import petController from './pet.controller';
// import { Request, Response, response } from 'express';

// let tutor_Id: string;

describe('Pet Controller', () => {
  describe('Create Pet', () => {
    it('Should be create a new pet', async () => {
      // Tentativa 1
      // const tutorData = new Tutor({
      //     name: 'jean',
      //     password: 'jean123',
      //     phone: '559999999',
      //     email: 'jean@gmail.com',
      //     date_of_birth: '2000-01-12',
      //     zip_code: '98726000',
      // });
      // await tutorService.createTutor(tutorData);
      // const tutor = await Tutor.findOne({email: 'jean@gmail.com'})
      // tutor_Id = tutor?._id;
      // async function CreatePet(data: any, status: any) {
      //     const req: Request = data;
      //     const res: Response = status;
      //     const newPet = await petController.createPet(req, res)
      //     return newPet
      // }
      // const pet = {
      //     name: "Lilo",
      //     species: "dog",
      //     carry: "p",
      //     weight: 5,
      //     date_of_birth: "1993-12-12 10:10"
      // }
      // CreatePet({
      //     body: { pet },
      //     params: { tutor_Id }
      // }, StatusCodes.CREATED);
      // expect('a').toEqual(pet)
      // ------------------------------------------------------------
      // Tentativa 2
      // async (req: Request, res: Response) => {
      //     const tutorData = new Tutor({
      //         name: 'jean',
      //         password: 'jean123',
      //         phone: '559999999',
      //         email: 'jean@gmail.com',
      //         date_of_birth: '2000-01-12',
      //         zip_code: '98726000',
      //     });
      //     await tutorService.createTutor(tutorData);
      //     const tutor = await Tutor.findOne({ email: 'jean@gmail.com' })
      //     tutor_Id = tutor?._id;
      //     req.params = { tutor_Id }
      //     const petData = {
      //         name: "Lilo",
      //         species: "dog",
      //         carry: "p",
      //         weight: 5,
      //         date_of_birth: "1993-12-12 10:10"
      //     }
      //     req.body = { pet: petData }
      //     const newPet = await petController.createPet(req, res)
      //     console.log(newPet)
      // }
    });
  });
});
