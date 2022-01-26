export default class Player extends Phaser.Physics.Matter.Image
{
    private img!: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string)
    {
        super(scene.matter.world, x, y, texture, frame)

        this.scene = scene
        this.img = this.scene.add.image(x, y, texture, frame)
    }
}