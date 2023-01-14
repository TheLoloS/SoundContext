# **SoundContext** 🎶
React useContext module for play sounds.
 

## Usage:
Play sound:
```javascript
  playSounds(String: "name", Loop: true/false)
```
Play background music
  *Difrent beetwen normal is:*
   - *You can use it only one time*
   - *When you reuse playBgSounds() you will stop and pause this music*
```javascript
  playBgSounds(String: "name", Loop: true/false)
```
Import Context:
  - in main:
```javascript
import { AudioBlobsProvider } from "./SoundContext";

<AudioBlobsProvider>
   <Components />
</AudioBlobsProvider>
```
  - in components:
```javascript
import { useContext } from "react";
import { AudioBlobsContext } from "./SoundContext";

const { playSound, volumeChange, playBgSound } = useContext(
   AudioBlobsContext
);
```
Add volume lvl changer:
```javascript
{volumeChange}
```

## Futures: 
 - Load file only one time in load and then use sound for memory
 - Create on onended event for evry sound
 - Add loop functionality
 - You can play unlimitend sounds in this same time 
 - Add change volume item

## Authors

- [@TheLoloS 💣](https://github.com/TheLoloS)
