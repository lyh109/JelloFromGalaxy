import TextureKeys from "~/consts/TextureKeys"

export default class Meteor extends Phaser.Physics.Matter.Image
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.SHIP_BLUE1)
    {
        super(scene.matter.world, x, y, texture)
    }
}