// Author:
//
// ████████╗██╗  ██╗███████╗██╗      ██████╗ ██╗      ██████╗ ███████╗
// ╚══██╔══╝██║  ██║██╔════╝██║     ██╔═══██╗██║     ██╔═══██╗██╔════╝
//    ██║   ███████║█████╗  ██║     ██║   ██║██║     ██║   ██║███████╗
//    ██║   ██╔══██║██╔══╝  ██║     ██║   ██║██║     ██║   ██║╚════██║
//    ██║   ██║  ██║███████╗███████╗╚██████╔╝███████╗╚██████╔╝███████║
//    ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝
//

import "./styles.css";
import { AudioBlobsProvider } from "./SoundContext";

import Component from "./Component";

export default function App() {
  return (
    <div className="App">
      <AudioBlobsProvider>
        <Component />
      </AudioBlobsProvider>
    </div>
  );
}
