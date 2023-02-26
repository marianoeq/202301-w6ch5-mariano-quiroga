import { Request, Response } from 'express';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

export class ThingsControllers {
  constructor(public repo: ThingsFileRepo) {}

  getAllThings(req: Request, res: Response) {
    this.repo.read().then((data) => {
      res.json(data);
    });
  }
  async getThingById(req: Request, res: Response) {
    const id = await this.repo.readById(Number(req.params.id));
    res.json(id);
  }
  postThing(req: Request, res: Response) {
    this.repo.write(req.body);
    res.send(`<p>Data Added</>`);
  }
  updateThing(req: Request, res: Response) {
    this.repo.update(Number(req.params.id), req.body).then();

    res.send(`<p>Data Updated</>`);
  }
  deleteThing(req: Request, res: Response) {
    this.repo.delete(Number(req.params.id));
    res.send(`<p>Data Deleted</p>`);
  }
}
