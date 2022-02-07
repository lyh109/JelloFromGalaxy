export default class Item extends Phaser.Physics.Matter.Image
{
   private isCollided: boolean = false

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene.matter.world, x, y, texture)
        this.name = texture
    }

    update()
    {
        this.y -= 5
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