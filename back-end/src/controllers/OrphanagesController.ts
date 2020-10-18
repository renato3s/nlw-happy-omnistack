import {Request, response, Response} from 'express';

import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';  

export default {

    async show(req: Request,res: Response) {
        const { id } = req.params

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });    

        return res.json(orphanageView.render(orphanage));
    },


    async index(req: Request,res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.json(orphanageView.renderMany(orphanages));
    },

    async create(req: Request,res: Response) {
        
        const {
            name,
            whatsapp,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
        
        const orphanagesRepository = getRepository(Orphanage);
    
        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            whatsapp,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            whatsapp: Yup.number().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required(),
            instructions: Yup.string().required().max(300),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: true
        });

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
        
        return res.status(201).json(orphanage);
    }
}