import TextureKeys from "~/consts/TextureKeys"

export default class Meteor extends Phaser.Physics.Matter.Image
{
    private isCollided: boolean = false

    private rotaitonSpeed: number = Phaser.Math.FloatBetween(-0.02, 0.02)
    private xSpeed: number = Phaser.Math.FloatBetween(-1, 1)

    constructor(scene: Phaser.Scene, x: number, y: number, minSize: number, maxSize: number)
    {
        let texture: string = TextureKeys.METEOR1
        if(Phaser.Math.Between(0, 1) == 0)
        {
            texture = TextureKeys.METEOR2
        }

        super(scene.matter.world, x, y, texture)

        scene.add.existing(this)
        this.scene = scene
        this.setIgnoreGravity(true)
        this.setScale(Phaser.Math.FloatBetween(minSize, maxSize))

        if(minSize >= 1)
        {
            this.xSpeed = 0
        }
    }

    update()
    {
        this.x -= this.xSpeed
        this.y -= 3
        this.rotation += this.rotaitonSpeed

        if(this.x <= 17 || this.x >= this.scene.scale.width - 17)
        {
            this.xSpeed *= -1
        }

        if(this.y < -this.height)
        {
            this.despawn()
        }
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