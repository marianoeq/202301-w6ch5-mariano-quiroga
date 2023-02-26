import fs from 'fs/promises';

const file = './data/data.json';
type knowledge = {
  id: number;
  name: string;
};
export class ThingsFileRepo {
  read() {
    return fs.readFile(file, { encoding: 'utf-8' }).then((data) => {
      return JSON.parse(data) as any[];
    });
  }

  async readById(id: knowledge['id']) {
    const data = await fs.readFile(file, 'utf-8');

    const dataParsed = JSON.parse(data);
    const result = dataParsed.find((item: knowledge) => item.id === id);
    return result;
  }

  write(newThing: knowledge) {
    return fs.readFile(file, 'utf-8').then((data) => {
      const dataParsed: knowledge[] = JSON.parse(data);

      const id = dataParsed.length;

      newThing.id = id + 1;

      const dataAdded = JSON.stringify([...dataParsed, newThing]);

      return fs.writeFile(file, dataAdded, 'utf-8');
    });
  }
  update(id: knowledge['id'], newThing: knowledge) {
    return fs.readFile(file, 'utf-8').then((data) => {
      const dataParsed: knowledge[] = JSON.parse(data);
      newThing.id = id;

      const idFound = dataParsed.map((item: knowledge) =>
        item.id === id ? (item = newThing) : item
      );

      const finalData = JSON.stringify(idFound);
      return fs.writeFile(file, finalData, 'utf-8');
    });
  }

  async delete(id: knowledge['id']) {
    const data = await fs.readFile(file, 'utf-8');
    const dataParsed = JSON.parse(data);
    const dataFiltered = dataParsed.filter((item: knowledge) => item.id !== id);
    const finalData = JSON.stringify(dataFiltered);
    console.log(finalData);
    return fs.writeFile(file, finalData, 'utf-8');
  }
}
