import util from "util"
import fs from "fs"
import path from "path"

const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)

export interface DirectoryItem {
  type: "directory"
  path: string
}

export interface FileItem {
  type: "file"
  path: string
  ext: string
}

const fileStat = (
  rootPath: string,
  relativePath: string
): Promise<DirectoryItem | FileItem> =>
  new Promise(async (resolve, reject) => {
    const absolutePath = rootPath + relativePath
    try {
      const stats = await stat(absolutePath)

      if (stats.isFile()) {
        const FILEEXT = path.extname(absolutePath).toLocaleLowerCase()

        resolve({
          type: "file",
          path: relativePath,
          ext: FILEEXT
        })
      }

      if (stats.isDirectory()) {
        resolve({
          type: "directory",
          path: relativePath
        })
      }

      reject("not file / directory")
    } catch (e) {
      reject(e)
    }
  })

export const getFolderData = async (rootPath: string, relativePath: string) => {
  const absolutePath = rootPath + relativePath
  try {
    // 1) list file names from absolute path
    const fileNames = await readdir(absolutePath)
    if (!fileNames) {
      throw "Folder is empty"
    }

    // 2) list file stat
    const fileStatPromises = fileNames.map(fileName => {
      return fileStat(rootPath, relativePath + fileName)
    })
    const fileStats = await Promise.all(fileStatPromises)

    // 3) sort file data
    interface SortedItems {
      directories: DirectoryItem[]
      files: FileItem[]
    }

    const sortedFiles = fileStats.reduce<SortedItems>(
      (acc, item) => {
        if (item.type === "file") {
          acc.files.push(item as FileItem)
        } else {
          acc.directories.push(item as DirectoryItem)
        }
        return acc
      },
      {
        directories: [],
        files: []
      }
    )

    return sortedFiles
  } catch (e) {
    console.log(e)
  }
}
