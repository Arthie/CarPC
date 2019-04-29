//todo : check if picture already exists + save metadata to file

import sharp from "sharp"
import { parseFile } from "music-metadata"

import { getFolderData } from "./getFolderData"
import { FileItem } from "#graphql/generated/resolvers"

const checkFileIsMusic = (ext: string) =>
  [".mp3", ".m4a", ".ogg", ".flac", ".vma", ".wmv"].includes(ext)

const generatePicture = async (
  blob: Buffer,
  path: string,
  rootPath: string
) => {
  await sharp(blob)
    .resize(80)
    .toFile(rootPath + path + ".png")

  return path + ".png"
}

const MusicMetadata = async (
  rootPath: string,
  musicFile: FileItem,
  skipCovers: boolean = false
) => {
  const { ext, path } = musicFile
  const { format, common } = await parseFile(rootPath + path, {
    duration: true,
    skipCovers
  })

  return {
    path,
    ext,
    metadata: {
      duration: format.duration as number,
      album: common.album,
      artist: common.artist,
      title: common.title,
      picture: common.picture
        ? await generatePicture(common.picture[0].data, path, rootPath)
        : undefined
    }
  }
}

// const rootPath = "C:/Users/arthie/Music"
// const relativePath = "/"

//todo move to reducer
export const checkFolder = async (rootPath: string, relativePath: string) => {
  try {
    const folderData = await getFolderData(rootPath, relativePath)
    if (!folderData) {
      throw "no folder data"
    }

    const musicFiles = folderData.files.filter(item =>
      checkFileIsMusic(item.ext)
    )

    console.log(musicFiles)

    const musicFileMetaDataPromises = musicFiles.map(musicFile => {
      return MusicMetadata(rootPath, musicFile)
    })
    const musicFileMetaDatas = await Promise.all(musicFileMetaDataPromises)
    console.log(musicFileMetaDatas)
    return {
      directories: folderData.directories,
      files: folderData.files,
      music: musicFileMetaDatas
    }
  } catch (e) {
    console.log(e)
    return {
      directories: [],
      files: [],
      music: []
    }
  }
}
