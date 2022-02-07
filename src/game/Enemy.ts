import TextureKeys from "~/consts/TextureKeys"

const SHIP_BLUE_TEXTURE: string[] = [TextureKeys.SHIP_BLUE1, TextureKeys.SHIP_BLUE2, TextureKeys.SHIP_BLUE3, TextureKeys.SHIP_BLUE4]

export default class Enemy extends Phaser.Physics.Matter.Image
{
    isCollided: boolean = false
    maxHP: number = 3
    hp: number = 3

    textures: string[] = SHIP_BLUE_TEXTURE

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string = TextureKeys.SHIP_BLUE1)
    {
        super(scene.matter.world, x, y, texture)

        scene.add.existing(this)
        this.scene = scene
        this.setIgnoreGravity(true)
        this.setStatic(true)
    }

    update()
    {
        this.y -= 1
    }

    despawn()
    {
        this.isCollided = true
    }

    updateHP()
    {
        // 4 3 2 1 0
        // 8 6 4 2 0
        // 12 9 6 3 0
        // 16 12 8 4 0

        --this.hp

        if(this.hp == 0)
        {
            this.scene.events.emit('IncreaseScore', 10 * this.maxHP)
            this.despawn()
            return
        }
        
        if(this.hp <= this.maxHP * 1 / 4)
        {
            this.setTexture(this.textures[3])
            SHIP_BLUE_TEXTURE
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