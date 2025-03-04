import { SchemaFactory, TreeViewConfiguration } from "fluid-framework";

// The string passed to the SchemaFactory should be unique
const schemaFactory = new SchemaFactory("fluidReactTemplate");

// Here we define an object we'll use in the schema, a Dice.
export class Dice extends schemaFactory.object("Dice", {
    value: schemaFactory.number,
}) { }

// Here we define the tree schema, which has a single Dice object.
export const treeConfiguration = new TreeViewConfiguration({ schema: Dice });