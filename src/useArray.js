// Author:
//
// ████████╗██╗  ██╗███████╗██╗      ██████╗ ██╗      ██████╗ ███████╗
// ╚══██╔══╝██║  ██║██╔════╝██║     ██╔═══██╗██║     ██╔═══██╗██╔════╝
//    ██║   ███████║█████╗  ██║     ██║   ██║██║     ██║   ██║███████╗
//    ██║   ██╔══██║██╔══╝  ██║     ██║   ██║██║     ██║   ██║╚════██║
//    ██║   ██║  ██║███████╗███████╗╚██████╔╝███████╗╚██████╔╝███████║
//    ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝
//

import { useState } from "react";

export default function useArray(defaultValue) {
  const [array, setArray] = useState(defaultValue);

  function push(element) {
    setArray((a) => [...a, element]);
  }

  function filter(callback) {
    setArray((a) => a.filter(callback));
  }

  return { array, set: setArray, push, filter };
}
