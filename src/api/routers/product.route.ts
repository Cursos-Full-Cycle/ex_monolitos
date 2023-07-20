import express, {Request, Response} from 'express';
import AddProductUseCase from '../../modules/product-adm/usecase/add-product/add-product.usecase';
import ProductRepository from '../../modules/product-adm/repository/product.repository';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new AddProductUseCase(new ProductRepository ());
    try {
        const product = await usecase.execute(req.body);

        res.status(201).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// productRoute.put('/:id', async (req: Request, res: Response) => {
//     const usecase = new UpdateProductUseCase(new ProductRepository());    
    
//     try {
//         const input: InputUpdateProductDto = {
//             id: req.params.id,
//             name: req.body.name,
//             price: req.body.price,
//         }
//         const output = await usecase.execute(input);
//         res.status(200).send(output);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// productRoute.get('/:id', async (req: Request, res: Response) => {
//     const usecase = new FindProductUseCase(new ProductRepository());    

//     try {
//         const input: InputFindProductDto = {
//             id: req.params.id            
//         }
//         const output = await usecase.execute(input);
//         res.status(200).send(output);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// productRoute.get('/', async (req: Request, res: Response) => {
//     const usecase = new ListProductUseCase(new ProductRepository());
//     try {
//         const output = await usecase.execute({});
//         res.send(output);
//     } catch (error) {
//         res.status(500).send(error);
//     }    
// });