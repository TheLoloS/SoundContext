// Author:
//
// ████████╗██╗  ██╗███████╗██╗      ██████╗ ██╗      ██████╗ ███████╗
// ╚══██╔══╝██║  ██║██╔════╝██║     ██╔═══██╗██║     ██╔═══██╗██╔════╝
//    ██║   ███████║█████╗  ██║     ██║   ██║██║     ██║   ██║███████╗
//    ██║   ██╔══██║██╔══╝  ██║     ██║   ██║██║     ██║   ██║╚════██║
//    ██║   ██║  ██║███████╗███████╗╚██████╔╝███████╗╚██████╔╝███████║
//    ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝
//

import { createContext, useState, useEffect, useRef } from "react";
import useArray from "./useArray";

/* Usage:
      If we want use some sound, we must ad it to list in Sound Context file with specify name,
      and then we can use function playsound("name-that-we-add"), or playBg
  */

// Here we give ll links and names to load on start sounds
const audioFiles = {
  sound1: "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg",
  sound2: "https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg",
  sound3: "https://actions.google.com/sounds/v1/sports/bicycle_pedaling.ogg"
};

// this helper function queries the src given in the argument. we use it to fetch all audio files.
const fetchAudio = async (src) => {
  const response = await fetch(src);
  const blob = await response.blob();
  return blob;
};

// Create context
const AudioBlobsContext = createContext({});

const AudioBlobsProvider = ({ children }) => {
  // Volume level state varible
  const [volume, setVolume] = useState(1);

  // Save someware audioblobs
  const [audioBlobs, setAudioBlobs] = useState({});

  // Use custom hook to have methods od usestate array
  // eslint-disable-next-line
  const { array, set, push, remove, filter, update, clear } = useArray([]);

  // Create bg music ref to store bg-music audio and then can play/pause it.
  const bgMusic = useRef({ audio: false, isPlaing: false });

  // Volume change component. (usage: {volumeChange})
  const volumeChange = (
    <input
      type="range"
      id="cowbell"
      name="cowbell"
      min="0"
      max="1"
      value={volume}
      step="0.1"
      onChange={(e) => setVolume(e.target.value)}
    />
  );

  /*
  That function take text from argument (e. g. "sound1").
  With this argument, we can get blob from audioBlobs variable. Next from blob it creates audio object.
  We save object in variable.
  After that, we can normally use audio variable like normal audio object
*/
  const playSound = (name) => {
    const audio = new Audio(URL.createObjectURL(audioBlobs[name]));
    // We push audio object to useState array, for next uses.
    push(audio);
    // set start volume with actual volume lvl
    audio.volume = volume;

    // On audio done, play event will filter useState array and delete from it audio what is ended.
    audio.onended = () => {
      console.log("audio ended");
      console.log(array);
      filter((n) => n.src !== audio.src);
      // console.log(array);
    };
    // Start play sound
    audio.play();
  };
  // backgroundSound can be pause and play
  const playBgSound = (name, loop) => {
    if (!bgMusic.current.audio) {
      // Create new Audio object
      const audio = new Audio(URL.createObjectURL(audioBlobs[name]));

      // start playing info in bg ref
      bgMusic.current.audio = audio;
      bgMusic.current.isPlaing = true;

      // We push audio object to useState array, for next uses.
      push(audio);

      // set start volume with actual volume lvl
      audio.volume = volume;
      // if loop argument is true then audio will play in loop
      if (loop) audio.loop = loop;
      // On audio done, play event will filter useState array and delete from it audio what is ended.
      audio.onended = () => {
        filter((n) => n.src !== audio.src);
        bgMusic.current.isPlaing = false;
      };
      // Start play sound
      audio.play();
    } else {
      // It's simple toggle method operating on bgMusic.current.isPlaing value
      if (bgMusic.current.isPlaing) {
        bgMusic.current.audio.pause();
        bgMusic.current.isPlaing = false;
      } else {
        bgMusic.current.audio.play();
        bgMusic.current.isPlaing = true;
      }
    }

    // We push audio object to useState array, for next uses.
  };

  /*
  useEffect that create async func for load audio files on site load 
  (here we use fetch helper function)
*/
  useEffect(() => {
    // create function
    async function preloadAudio() {
      // loop through all audioFiles and set it to useState
      for (const [name, src] of Object.entries(audioFiles)) {
        const blob = await fetchAudio(src).then((res) => {
          res.name = name;

          return res;
        });
        // console.log(blob);
        setAudioBlobs((prevBlobs) => ({ ...prevBlobs, [name]: blob }));
      }
    }
    preloadAudio();
  }, []);

  // clear url bloob objects
  useEffect(() => {
    // console.log(audioBlobs);
    return () => {
      Object.values(audioBlobs).forEach((blob) => URL.revokeObjectURL(blob));
    };
  }, [audioBlobs]);
  // every time when volume value are change wi filter in array and change to aktual volome lvl
  useEffect(() => {
    filter((n) => (n.volume = volume));
    // eslint-disable-next-line
  }, [volume]);

  // return context  component
  return (
    <AudioBlobsContext.Provider
      value={{ playSound, volumeChange, playBgSound }}
    >
      {children}
    </AudioBlobsContext.Provider>
  );
};

// export context and provider
export { AudioBlobsContext, AudioBlobsProvider };
