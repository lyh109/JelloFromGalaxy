export default class Item extends Phaser.Physics.Matter.Image
{
    private isCollided: boolean = false
    private xSpeed: number = Phaser.Math.Between(-1, 1)
    private ySpeed: number = Phaser.Math.Between(2, 4)

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene.matter.world, x, y, texture)
        scene.add.existing(this)

        this.scene = scene
        this.name = texture

        this.setIgnoreGravity(true)
        this.setStatic(true)
    }

    update()
    {
        this.x -= this.xSpeed
        this.y -= this.ySpeed
    }

    IsCollided()
    {
        return this.isCollided
    }

    despawn()
    {
        this.isCollided = true
    }
}