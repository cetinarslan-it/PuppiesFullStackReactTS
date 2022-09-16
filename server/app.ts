import * as express from 'express';
import  { Request, Response, Application } from 'express';
import { readFile, writeFile } from 'fs/promises';
import * as cors from 'cors';



const app: Application = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(express.json());
app.use(cors(corsOptions));

interface tsPuppy  {
  id:number;
  name:string;
  breed:string;
  birthDate:string;

}

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

const readFileData = async (filePath: string) => {
  const data = await readFile(filePath, 'utf8');
  const json = JSON.parse(data);
  return json;
};

app.get('/api/puppies', async (_req: Request, res: Response) => {
  const json = await readFileData('../puppies.json');
  return res.status(200).json(json);
});


app.get('/api/puppie/:id', async (_req: Request, res: Response) => {
  const json = await readFileData('../puppies.json')
  const puppy = json.find((p: tsPuppy) => p.id === Number(_req.params.id))

  if (!puppy) {
    return res.status(404).json({
      message: 'NOT found',
    });
  }
  return res.status(200).json(puppy);
});

app.post('/api/puppies', async (_req: Request, res: Response) => {
  const data = await readFileData('../puppies.json');
  const newPuppy: tsPuppy = {
    id: Date.now(),
    name: _req.body.name,
    breed: _req.body.breed,
    birthDate: _req.body.birthDate,
  }
  data.push(newPuppy);
  await writeFile('../puppies.json', JSON.stringify(data));
  return res.status(201).json(newPuppy);
});

app.put('/api/puppies/:id', async (_req: Request, res: Response) => {
  const data = await readFileData('../puppies.json');
  const puppy = data.find((p: tsPuppy) => p.id === Number(_req.params.id));
  if (!puppy) {
    return res.status(404).json({
      message: 'NOT found',
    });
  }
  
  puppy.name = _req.body.name;
  puppy.breed = _req.body.breed;
  puppy.birthDate = _req.body.birthDate;

  console.log(data);

  await writeFile('../puppies.json', JSON.stringify(data));
  return res.status(204).json(puppy);
});

app.delete('/api/puppies/:id', async (_req: Request, res: Response) => {
  const data = await readFileData('../puppies.json');
  const puppy = data.findIndex((p: tsPuppy) => p.id === Number(_req.params.id));
  
  data.splice(puppy, 1);
  await writeFile('../puppies.json', JSON.stringify(data));
  return res.status(200).json({msg:"puppy is deleted"});

});

export default app;
