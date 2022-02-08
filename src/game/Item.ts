import EventKeys from "~/consts/EventKeys"
import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"

export class Item extends Phaser.Physics.Matter.Image
{
    private isCollided: boolean = false
    private xSpeed: number = Phaser.Math.Between(-1, 1)
    private ySpeed: number = Phaser.Math.Between(2, 4)

    GameScene = this.scene.scene.get(SceneKeys.Game)
    count = 0

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.PILL)
    {
        super(scene.matter.world, x, y, texture)
        scene.add.existing(this)

        this.scene = scene
        this.name = texture

        this.setIgnoreGravity(true)
        this.setStatic(true)
        this.setBounce(0.5)
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

    getItem()
    {
        console.log(++this.count)
    }
}

export class Pill extends Item
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.PILL)
    {
        super(scene, x, y, texture)
    }

    getItem(): void 
    {
        this.GameScene.events.emit(EventKeys.ADD_ENERGY)
    }
}

export class PowerUP extends Item
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.POWERUP)
    {
        super(scene, x, y, texture)
    }

    getItem(): void 
    {
        this.GameScene.events.emit(EventKeys.GET_POWERUP)
    }
}

export class Shield extends Item
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.SHIELD)
    {
        super(scene, x, y, texture)
    }

    getItem(): void 
    {
        this.GameScene.events.emit(EventKeys.GET_SHIELD)
    }
}

export class Star extends Item
{
    private myScore: number = 10

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.STAR_BRONZE)
    {
        super(scene, x, y, texture)

        if(texture == TextureKeys.STAR_SILVER)
        {
            this.myScore = 30
        }
        else if(texture == TextureKeys.STAR_GOLD)
        {
            this.myScore = 50
        }
    }

    getItem(): void 
    {
        this.GameScene.events.emit(EventKeys.ADD_SCORE, this.myScore)
    }
}