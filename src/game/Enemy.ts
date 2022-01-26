export default class Enemy extends Phaser.Physics.Matter.Image
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene.matter.world, x, y, texture)

        scene.add.existing(this)
        this.scene = scene
    }
}