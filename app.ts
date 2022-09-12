import * as express from 'express';
import  { Request, Response, Application } from 'express';
import { readFile, writeFile } from 'fs/promises';


const app: Application = express();
app.use(express.json());

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

export default app;
