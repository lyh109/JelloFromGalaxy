import EventKeys from "~/consts/EventKeys"
import TextureKeys from "~/consts/TextureKeys"

const SHIP_BLUE_TEXTURE: string[] = [TextureKeys.SHIP_BLUE1, TextureKeys.SHIP_BLUE2, TextureKeys.SHIP_BLUE3, TextureKeys.SHIP_BLUE4]
const SHIP_GREEN_TEXTURE: string[] = [TextureKeys.SHIP_GREEN1, TextureKeys.SHIP_GREEN2, TextureKeys.SHIP_GREEN3, TextureKeys.SHIP_GREEN4]
const SHIP_ORANGE_TEXTURE: string[] = [TextureKeys.SHIP_ORANGE1, TextureKeys.SHIP_ORANGE2, TextureKeys.SHIP_ORANGE3, TextureKeys.SHIP_ORANGE4]
const SHIP_RED_TEXTURE: string[] = [TextureKeys.SHIP_RED1, TextureKeys.SHIP_RED2, TextureKeys.SHIP_RED3, TextureKeys.SHIP_RED4]

export default class Enemy extends Phaser.Physics.Matter.Image
{
    private isCollided: boolean = false
    private maxHP: number = 4
    private hp: number = this.maxHP

    private textures: string[] = SHIP_BLUE_TEXTURE

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.SHIP_BLUE1)
    {
        super(scene.matter.world, x, y, texture)

        scene.add.existing(this)
        this.scene = scene
        this.setIgnoreGravity(true)
        // this.setStatic(true)

        if(texture == TextureKeys.SHIP_GREEN1)
        {
            this.textures = SHIP_GREEN_TEXTURE
            this.maxHP = 8
            this.hp = this.maxHP
        }
        else if(texture == TextureKeys.SHIP_ORANGE1)
        {
            this.textures = SHIP_ORANGE_TEXTURE
            this.maxHP = 12
            this.hp = this.maxHP
        }
        else if(texture == TextureKeys.SHIP_RED1)
        {
            this.textures = SHIP_RED_TEXTURE
            this.maxHP = 16
            this.hp = this.maxHP
        }
    }

    update()
    {
        this.y -= 1

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

    updateHP(damage: number)
    {
        // 4 3 2 1 0
        // 8 6 4 2 0
        // 12 9 6 3 0
        // 16 12 8 4 0

        this.hp -= damage

        if(this.hp <= 0)
        {
            this.scene.events.emit(EventKeys.DESTROY_ENEMY, 10 * this.maxHP, this.x, this.y)
            this.despawn()
            return
        }
        
        if(this.hp <= this.maxHP * 1 / 4)
        {
            this.setTexture(this.textures[3])
        }
        else if(this.hp <= this.maxHP * 2 / 4)
        {
            this.setTexture(this.textures[2])
        }
        else if(this.hp <= this.maxHP * 3 / 4)
        {
            this.setTexture(this.textures[1])
        }
    }
}