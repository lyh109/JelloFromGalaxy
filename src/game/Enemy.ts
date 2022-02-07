export default class Enemy extends Phaser.Physics.Matter.Image
{
    isCollided: boolean = false
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene.matter.world, x, y, texture)

        scene.add.existing(this)
        this.scene = scene
        this.setIgnoreGravity(true)
    }

    update()
    {
        this.y -= 5
    }

    despawn()
    {
        console.log('despawn')
        this.isCollided = true
    }
}