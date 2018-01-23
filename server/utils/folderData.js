const fs = require("fs")
const path = require("path")
const mm = require("musicmetadata")
const sharp = require("sharp")

const handleError = fn => (...params) => fn(...params).catch(console.error)


async function folderData(rootFolder, folderPath) {
  const folderItemsFn = handleError(_ => explorePath(rootFolder + folderPath))
  const promises = (await folderItemsFn()).map(item => {
    return parseItem(rootFolder, folderPath + item)
  })

  const files = await Promise.all(promises).catch(err => console.log(err))

  const musicMetadataFn = handleError(file =>
    getMusicMetadata(rootFolder + file.path)
  )

  //find way to make promises run in parallel
  for (let file of files) {
    if (file.type === "music") {
      file.metadata = await musicMetadataFn(file)
    }
  }

  return files
}

//return
function explorePath(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, items) => {
      //error not null
      if (err) {
        reject(err)
      } else {
        //log each item
        resolve(items)
      }
    })
  })
}

//see if item is folder or file
function parseItem(rootFolder, filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(rootFolder + filePath, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        if (stats.isFile()) {
          resolve(parseFile(rootFolder, filePath))
        } else if (stats.isDirectory()) {
          // console.log('directory', filePath);
          resolve({
            type: "directory",
            path: filePath + "/"
          })
        }
      }
    })
  })
}

//if file look for music file
function parseFile(rootFolder, filePath) {
  const FILEEXT = path.extname(rootFolder + filePath).toLocaleLowerCase()
  const MUSICEXT = [".mp3", ".m4a", ".ogg", ".flac", ".vma", ".wmv"]

  const fileStats = {
    type: "file",
    path: filePath,
    ext: FILEEXT
  }

  if (!MUSICEXT.indexOf(FILEEXT)) {
    fileStats.type = "music"
  }

  return fileStats
}

function getMusicMetadata(musicFile) {
  return new Promise((resolve, reject) => {
    const readableStream = fs.createReadStream(musicFile)
    mm(
      readableStream,
      { duration: false, skipCovers: true },
      (err, metadata) => {
        if (err) {
          // console.log(musicFile, err);
          reject("Metadata error", musicFile)
        }
        readableStream.close()
        if (metadata.picture.length) {
          sharp(metadata.picture[0].data)
            .resize(30)
            .toBuffer()
            .then(data => {
              metadata.picture[0].data = data
            })
            .catch(err => {
              console.log("error in sharp")
            })
        }
        resolve(metadata)
      }
    )
  })
}

module.exports.get = folderData