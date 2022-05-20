import { config } from '../config/Constants';
import { Request, Response } from 'express';
import shortid from 'shortid';
import { URLModel } from '../database/model/URL';

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originUrl } = req.body;
    const url = await URLModel.findOne({ originUrl });
    if (url) {
      res.json(url);
      return;
    }

    const hash = shortid.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    //salvar no banco
    const newURL = await URLModel.create({ hash, shortURL, originUrl });
    //retornar a url salva
    res.json(newURL);
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    const url = await URLModel.findOne({ hash });
    if (url) {
      res.redirect(url.originUrl);
      return;
    }

    res.status(400).json({ error: 'URL not found' });
  }
}
