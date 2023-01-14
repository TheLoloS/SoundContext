// Author:
//
// ████████╗██╗  ██╗███████╗██╗      ██████╗ ██╗      ██████╗ ███████╗
// ╚══██╔══╝██║  ██║██╔════╝██║     ██╔═══██╗██║     ██╔═══██╗██╔════╝
//    ██║   ███████║█████╗  ██║     ██║   ██║██║     ██║   ██║███████╗
//    ██║   ██╔══██║██╔══╝  ██║     ██║   ██║██║     ██║   ██║╚════██║
//    ██║   ██║  ██║███████╗███████╗╚██████╔╝███████╗╚██████╔╝███████║
//    ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝
//

import { useContext } from "react";
import { AudioBlobsContext } from "./SoundContext";

export default function Component() {
  // Take blobs audio objects from useContext and save it to variable.
  const { playSound, volumeChange, playBgSound } =
    useContext(AudioBlobsContext);

  return (
    <>
      <button onClick={() => playSound("sound1")}>Play Sound 1</button>
      <button onClick={() => playSound("sound2")}>Play Sound 2</button>
      <button onClick={() => playSound("sound3")}>Play Sound 3</button>
      <button onClick={() => playBgSound("sound3", true)}> start/pause</button>

      {volumeChange}
    </>
  );
}
