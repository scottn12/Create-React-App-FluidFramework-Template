import { TinyliciousClient, type TinyliciousClientProps } from "@fluidframework/tinylicious-client";
import { SharedTree, type ContainerSchema, type IFluidContainer, type TreeView } from "fluid-framework";
import { Dice, treeConfiguration } from "./treeSchema";

// We define the container schema here, which is a map of the initial objects in the container.
const containerSchema = {
    initialObjects: {
        diceTree: SharedTree,
    },
} satisfies ContainerSchema;

/**
 * Creates a fluid container, or loads if it already exists.
 */
export async function loadFluidData(
): Promise<TreeView<typeof Dice>> {
    const clientProps: TinyliciousClientProps = {};
    const client = new TinyliciousClient(clientProps);

    // We will use the hash of the URL to identify the container.
    const containerId = window.location.hash.substring(1);
    let container: IFluidContainer<typeof containerSchema>;
    if (containerId.length === 0) {
        // If there is no hash, we create a new container.
        ({ container } = await client.createContainer(containerSchema, "2"));
        const id = await container.attach();
        // We should update the URL with the newly created ID.
        window.history.replaceState(undefined, "", `#${id}`);
    } else {
        ({ container } = await client.getContainer(containerId, containerSchema, "2"));
    }

    // We can now access the initial objects in the container.
    // We will initialize the dice tree if it is not already initialized with a value of 1.
    const dice = container.initialObjects.diceTree.viewWith(treeConfiguration);
    if (dice.compatibility.canInitialize) {
        dice.initialize(new Dice({ value: 1 }));
    }

    return dice;
}