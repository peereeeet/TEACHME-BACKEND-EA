import { Request, Response, NextFunction } from 'express';

export const AdminValidation = (req: Request, res: Response, next: NextFunction) => {
    console.log('Verifying admin');
    try{
        //Recogemos datos del payload del token
        const admin = req.user.isAdmin;
        console.log(admin);
        if(admin != true){
            return res.json('You are not admin'); 
        }
         //eres administrador
         console.log('seguent funcio')
        return next();
         
          
    } catch{
        return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
    }
        
};