export default class Player extends Phaser.Physics.Matter.Image
{
    private worldWidth!: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string)
    {
        super(scene.matter.world, x, y, texture, frame)

        scene.add.existing(this)
        this.scene = scene
        this.worldWidth = scene.scale.width
        this.setStatic(true)
    }

    MoveLeft()
    {
        if(this.rotation > -0.1)
        {
            this.rotation -= 0.01
        }

        if(this.x > this.width / 2)
        {
            this.x -= 5
        }
    }

    MoveRight()
    {
        if(this.rotation < 0.1)
        {
            this.rotation += 0.01
        }

        if(this.x < this.worldWidth - this.width / 2)
        {
            this.x += 5
        }
    }

    Idle()
    {
        if(this.rotation > 0)
        {
            this.rotation -= 0.01
        }
        else if(this.rotation < 0)
        {
            this.rotation += 0.01
        }
    }
}