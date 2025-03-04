import React, { useEffect } from "react";
import "./App.css";
import { Tree, type TreeView } from "fluid-framework";
import { loadFluidData } from "./infra/fluid";
import type { Dice } from "./infra/treeSchema";

function App() {
  // diceTree is the TreeView object we will use to interact with the fluid data.
  const [diceTree, setDiceTree] = React.useState<
    TreeView<typeof Dice> | undefined
  >(undefined);
  // The diceValue is the value of the dice that we will use to update the view.
  const [diceValue, setDiceValue] = React.useState<number | undefined>();

  function roll() {
    if (diceTree !== undefined) {
      // We will not directly call setDiceValue. Instead, we will allow the "nodeChanged"
      // event to fire and update the value to reduce redundancy.
      diceTree.root.value = Math.floor(Math.random() * 6) + 1;
    }
  }

  useEffect(() => {
    if (diceTree === undefined) {
      // We will load the fluid data and setup the diceTree and diceValue.
      loadFluidData().then((tree) => {
        setDiceTree(tree);
        setDiceValue(tree.root.value);
      });
    } else {
      const unsubscribe = Tree.on(diceTree.root, "nodeChanged", () => {
        setDiceValue(diceTree.root.value);
      });
      return unsubscribe;
    }
  }, [diceTree]);

  // We will only render the component if the diceValue is defined.
  if (diceValue !== undefined) {
    return (
      <div className="wrapper">
        <img
          className="dice"
          alt="dice"
          src={`/images/dice-${diceValue}.png`}
        />
        <button className="rollButton" type="button" onClick={roll}>
          <span className="rollText">Roll</span>
        </button>
      </div>
    );
  }
}

export default App;
