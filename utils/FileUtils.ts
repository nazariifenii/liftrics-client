import { FileSystem } from "expo";

export default { getFileByUri };

function getFileByUri(uri) {
  FileSystem.downloadAsync(uri, FileSystem.documentDirectory + "small.mp4")
    .then(({ uri }) => {
      console.log("Finished downloading to ", uri);
    })
    .catch(error => {
      console.error(error);
    });
}
