import { Request, Response } from 'express';
import Color from 'colors';

class Respuestas {

    success(req: Request, res: Response, mensaje: any, estado: number){
        res.status(estado || 200).send(mensaje);
    }

    error(req: Request, res: Response, mensaje: any, estado: number, detalles: string){
        Color.bgRed(Color.white(detalles.toLocaleUpperCase()));

        res.status(estado || 500).send({ 
            error: mensaje,
            body: '',
        });
    }
}


let responder = new Respuestas();
export default responder;