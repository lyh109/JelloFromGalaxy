import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"

import Player from "~/game/Player"
import LaserPool from "~/game/Laser"

import Enemy from "~/game/Enemy"

import Item from "~/game/Item"

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite
    private selectedCharacter!: string

    private player!: Player
    private PlayerController!: Phaser.Types.Input.Keyboard.CursorKeys
    private playerEnergy: Phaser.GameObjects.Image[] = []
    private laserGroup?: LaserPool
    private playerCat: any

    private enemies: Enemy[] = []
    private enemyCat: any

    private items: Item[] = []
    private itemCat: any

    private score: number = 0
    private scoreText!: Phaser.GameObjects.Text

    private spawnLaser(x: number, y: number, texKey: string)
    {
        if(!this.laserGroup)
        {
            return
        }

        const laser = this.laserGroup.spawn(x, y, texKey)
        laser.setCollidesWith(this.enemyCat)

        if(!laser)
        {
            return
        }

        return laser
    }

    private updateEnergy = (num: number) =>
    {
        if(num <= this.player.getMaxEnergyNum())
        {
            this.player.setEnergyNum(num)
        }
        else
        {
            this.addScore(5)
        }

        for(let i = 0; i < this.player.getMaxEnergyNum(); ++i)
        {
            if(i < this.player.getEnergyNum())
            {
                this.playerEnergy[i].setTexture(TextureKeys.ENERGY)
            }
            else
            {
                this.playerEnergy[i].setTexture(TextureKeys.ENERGY_BLANK)
            }
        }
    }

    private getItem(name: string)
    {
        switch(name)
        {
            case TextureKeys.PILL: {
                this.updateEnergy(this.player.getEnergyNum() + 1)
                break
            }
            case TextureKeys.POWERUP: {
                // TODO: PowerUP 아이템 효과 구현
                break
            }
            case TextureKeys.SHIELD: {
                // TODO: Shield 아이템 효과 구현
                break
            }
            case TextureKeys.STAR_BRONZE: {
                this.addScore(10)
                break
            }
            case TextureKeys.STAR_SILVER: {
                this.addScore(30)
                break
            }
            case TextureKeys.STAR_GOLD: {
                this.addScore(50)
                break
            }
        }
    }

    private addScore = (num: number) =>
    {
        this.score += num
        this.scoreText.setText('SCORE: ' + this.score)
    }

    private spawnItem = (x: number, y: number) =>
    {
        if(Phaser.Math.Between(1, 10) <= 6)
        {
            let item = new Item(this, x, y, TextureKeys.PILL)
            item.setCollisionCategory(this.itemCat)
            item.setCollidesWith(this.playerCat)
            this.items.push(item)
        }

        if(Phaser.Math.Between(1, 10) <= 6)
        {
            let item = new Item(this, x, y, TextureKeys.POWERUP)
            item.setCollisionCategory(this.itemCat)
            this.items.push(item)
        }

        if(Phaser.Math.Between(1, 10) <= 3)
        {
            let item = new Item(this, x, y, TextureKeys.SHIELD)
            item.setCollisionCategory(this.itemCat)
            this.items.push(item)
        }

        if(Phaser.Math.Between(1, 10) <= 5)
        {
            let item = new Item(this, x, y, TextureKeys.STAR_BRONZE)
            item.setCollisionCategory(this.itemCat)
            this.items.push(item)
        }
        
        if(Phaser.Math.Between(1, 10) <= 3)
        {
            let item = new Item(this, x, y, TextureKeys.STAR_SILVER)
            item.setCollisionCategory(this.itemCat)
            this.items.push(item)
        }

        if(Phaser.Math.Between(1, 10) <= 1)
        {
            let item = new Item(this, x, y, TextureKeys.STAR_GOLD)
            item.setCollisionCategory(this.itemCat)
            this.items.push(item)
        }
    }

    private destroyEnemy = (num: number, x: number, y: number) =>
    {
        this.addScore(num)
        this.spawnItem(x, y)
    }

    constructor()
    {
        super(SceneKeys.Game)
    }

    /**
	 * @param {{ character: string }} data 
	 */
    init(data)
    {
        this.selectedCharacter = data.character
    }

    create()
    {
        this.scene.launch(SceneKeys.Pause)
        this.cameras.main.fadeIn()

        const width = this.scale.width
        const height = this.scale.height

        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background).setOrigin(0)

        this.player = new Player(this, width / 2, 150, TextureKeys.SPACESHIP, this.selectedCharacter)
        this.PlayerController = this.input.keyboard.createCursorKeys()

        this.laserGroup = new LaserPool(this)

        // PAUSE
        this.input.keyboard.on('keydown-ESC', () => {
            this.events.emit('pause')
        })

        // IncreaseScore
        this.events.on('DestroyEnemy', this.destroyEnemy)

        this.playerCat = this.matter.world.nextCategory()
        this.enemyCat = this.matter.world.nextCategory()
        this.itemCat = this.matter.world.nextCategory()

        this.player.setCollisionCategory(this.playerCat)

        const objectData = this.cache.json.get('object')
        for(let o of objectData)
        {
            let enemy
            if(o.name[1] == 0)
            {
                enemy = new Enemy(this, o.x, o.y, TextureKeys.SHIP_BLUE1)
            }
            else if(o.name[1] == 1)
            {
                enemy = new Enemy(this, o.x, o.y, TextureKeys.SHIP_GREEN1)
            }
            else if(o.name[1] == 2)
            {
                enemy = new Enemy(this, o.x, o.y, TextureKeys.SHIP_ORANGE1)
            }
            else if(o.name[1] == 3)
            {
                enemy = new Enemy(this, o.x, o.y, TextureKeys.SHIP_RED1)
            }

            enemy.setCollisionCategory(this.enemyCat)
            this.enemies.push(enemy)
        }

        this.player.setCollidesWith([this.enemyCat, this.itemCat])

        this.matter.world.on('collisionstart', (event) => {
            if(event.pairs[0].bodyA.gameObject.texture.key[0] == 'P'
                &&event.pairs[0].bodyB.gameObject.texture.key[0] == 'S')
            {
                event.pairs[0].bodyB.gameObject.despawn()
                this.updateEnergy(this.player.getEnergyNum() - 1)
            }
            else if(event.pairs[0].bodyA.gameObject.texture.key[0] == 'S'
                    && event.pairs[0].bodyB.gameObject.texture.key[0] == 'L')
            {
                event.pairs[0].bodyA.gameObject.updateHP()
                this.laserGroup?.despawn(event.pairs[0].bodyB.gameObject)
            }
            else if(event.pairs[0].bodyA.gameObject.texture.key[0] == 'P'
                    && event.pairs[0].bodyB.gameObject.texture.key[0] == 'I')
            {
                event.pairs[0].bodyB.gameObject.despawn()
                this.getItem(event.pairs[0].bodyB.gameObject.name)
            }
        })

        for(let i = 0; i < this.player.getEnergyNum(); ++i)
        {
            let e = this.add.image(i * 20 + 20, 80, TextureKeys.ENERGY)
            this.playerEnergy.push(e)
        }

        this.scoreText = this.add.text(13, 25, 'SCORE: ' + this.score, {fontFamily: 'CustomFont'})
            .setFontSize(30)
    }

    update(time: number, delta: number): void 
    {
        this.background.tilePositionY += 1

        if(this.PlayerController.left.isDown)
        {
            this.player.MoveLeft()
        }
        else if(this.PlayerController.right.isDown)
        {
            this.player.MoveRight()
        }
        else
        {
            this.player.Idle()
        }

        if(Phaser.Input.Keyboard.JustDown(this.PlayerController.space))
        {
            if(!this.laserGroup)
            {
                return
            }

            this.spawnLaser(this.player.x, this.player.y + this.player.height / 2 + 10, TextureKeys.LASER1)
        }

        for(const e of this.enemies)
        {  
            if(e.IsCollided())
            {
                e.destroy()
            }
            else
            {
                e.update()
            }    
        }

        for(const i of this.items)
        {
            if(i.IsCollided())
            {
                i.destroy()
            }
            else
            {
                i.update()
            }
        }
    }
}