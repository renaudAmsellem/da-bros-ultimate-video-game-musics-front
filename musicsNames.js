import path from "path"
import fs from 'fs'

const getFilesFromDir = () => {
    const files = fs.readdirSync("./public").filter(file => path.extname(file) === '.webm')
    fs.writeFile('./src/assets/musicNames', files.toString(), err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      });
    console.log(files)
}
    

getFilesFromDir()