import EventKeys from "~/consts/EventKeys"
import SceneKeys from "~/consts/SceneKeys"
import SoundKeys from "~/consts/SoundKeys"
import TextureKeys from "~/consts/TextureKeys"

export class Item extends Phaser.Physics.Matter.Image
{
    private isCollided: boolean = false
    private xSpeed: number = Phaser.Math.Between(-2, 2)
    private ySpeed: number = Phaser.Math.Between(2, 4)

    mySound!: Phaser.Sound.BaseSound

    GameScene = this.scene.scene.get(SceneKeys.Game)

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.PILL)
    {
        super(scene.matter.world, x, y, texture)
        scene.add.existing(this)

        this.scene = scene
        this.name = texture

        this.setIgnoreGravity(true)
        // this.setStatic(true)
        this.setBounce(1)
    }

    update()
    {
        this.x -= this.xSpeed
        this.y -= this.ySpeed

        if(this.x < -10 || this.x > this.scene.scale.width + 10
            || this.y < -10 || this.y > this.scene.scale.height + 10)
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

    getItem()
    {
        return
    }
}

export class Pill extends Item
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.PILL)
    {
        super(scene, x, y, texture)
        
        this.mySound = this.scene.sound.add(SoundKeys.S_PILL, {volume: 0.1})
    }

    getItem()
    {
        this.mySound.play()
        this.GameScene.events.emit(EventKeys.ADD_ENERGY)
    }
}

export class PowerUP extends Item
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.POWERUP)
    {
        super(scene, x, y, texture)

        this.mySound = this.scene.sound.add(SoundKeys.S_POWERUP_SHIELD, {volume: 0.1})
    }

    getItem()
    {
        this.mySound.play()
        this.GameScene.events.emit(EventKeys.GET_POWERUP)
    }
}

export class Shield extends Item
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.SHIELD)
    {
        super(scene, x, y, texture)

        this.mySound = this.scene.sound.add(SoundKeys.S_POWERUP_SHIELD, {volume: 0.1})
    }

    getItem()
    {
        this.mySound.play()
        this.GameScene.events.emit(EventKeys.GET_SHIELD)
    }
}

export class Star extends Item
{
    private myScore: number = 10

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.STAR_BRONZE)
    {
        super(scene, x, y, texture)

        this.mySound = this.scene.sound.add(SoundKeys.S_STAR, {volume: 0.1})

        if(texture == TextureKeys.STAR_SILVER)
        {
            this.myScore = 30
        }
        else if(texture == TextureKeys.STAR_GOLD)
        {
            this.myScore = 50
        }
    }

    getItem()
    {
        this.mySound.play()
        this.GameScene.events.emit(EventKeys.ADD_SCORE, this.myScore)
    }
}