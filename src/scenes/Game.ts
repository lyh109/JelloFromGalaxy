import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"
import EventKeys from "~/consts/EventKeys"

import Player from "~/game/Player"
import LaserPool from "~/game/Laser"

import Enemy from "~/game/Enemy"

import { Item, Pill, PowerUP, Shield, Star } from "~/game/Item"
import SoundKeys from "~/consts/SoundKeys"

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite
    private selectedCharacter!: string

    private player!: Player
    private playerCat: any
    private PlayerController!: Phaser.Types.Input.Keyboard.CursorKeys
    private playerEnergy: Phaser.GameObjects.Image[] = []

    private laserGroup?: LaserPool
    private laser1Sound!: Phaser.Sound.BaseSound
    private laser2Sound!: Phaser.Sound.BaseSound

    private enemies: Enemy[] = []
    private enemyCat: any

    private items: Item[] = []
    private itemCat: any

    private score: number = 0
    private scoreText!: Phaser.GameObjects.Text

    private resetGame()
    {
        for(const e of this.enemies)
        {
            e.despawn()
        }

        for(const i of this.items)
        {
            i.despawn()
        }

        this.player.setEnergyNum(this.player.getMaxEnergyNum())
        this.playerEnergy = []
    }

    private spawnLaser(x: number, y: number, texKey: string)
    {
        if(!this.laserGroup)
        {
            return
        }

        const laser = this.laserGroup.spawn(x, y, texKey)
        laser.setCollidesWith(this.enemyCat)

        laser.laserTween = this.tweens.add({
            targets: laser,
            y: this.scale.height + 10,
            onComplete: () => {
                this.tweens.killTweensOf(laser)
                this.laserGroup?.despawn(laser)
            }
        })

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

        if(num == 0)
        {
            this.cameras.main.fadeOut()
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.time.delayedCall(1000, () => {
                    this.resetGame()
                    this.scene.start(SceneKeys.GameOver, {score: this.score})
                })
            }) 
        }
    }

    private addEnergy = () =>
    {
        this.updateEnergy(this.player.getEnergyNum() + 1)
    }

    private addScore = (num: number) =>
    {
        this.score += num
        this.scoreText.setText('SCORE: ' + this.score)
    }

    private getPowerUp = () =>
    {
        this.player.setPowerupNum(this.player.getMaxPowerupNum())
    }

    private getShield = () =>
    {
        this.player.setShieldNum(this.player.getMaxShieldNum())
    }

    private spawnItem = (x: number, y: number, item: Item) =>
    {
        item.setCollisionCategory(this.itemCat)
        item.setCollidesWith([this.playerCat, this.itemCat])
        this.items.push(item)
    }

    private destroyEnemy = (num: number, x: number, y: number) =>
    {
        this.addScore(num)

        let item: Item
        if(Phaser.Math.Between(1, 10) <= 6)
        {
            item = new Pill(this, x, y)
            this.spawnItem(x, y, item)
        }

        if(Phaser.Math.Between(1, 10) <= 6)
        {
            item = new PowerUP(this, x, y)
            this.spawnItem(x, y, item)
        }
        else
        {
            item = new Shield(this, x, y)
            this.spawnItem(x, y, item)
        }

        if(Phaser.Math.Between(1, 10) <= 5)
        {
            item = new Star(this, x, y, TextureKeys.STAR_BRONZE)
            this.spawnItem(x, y, item)
        }
        else if(Phaser.Math.Between(1, 10) <= 3)
        {
            item = new Star(this, x, y, TextureKeys.STAR_SILVER)
            this.spawnItem(x, y, item)
        }
        else if(Phaser.Math.Between(1, 10) <= 1)
        {
            item = new Star(this, x, y, TextureKeys.STAR_GOLD)
            this.spawnItem(x, y, item)
        }
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
        this.laser1Sound = this.sound.add(SoundKeys.S_LASER1, {volume: 0.1})
        this.laser2Sound = this.sound.add(SoundKeys.S_LASER2, {volume: 0.1}) 

        // PAUSE
        this.input.keyboard.on('keydown-ESC', () => {
            this.events.emit(EventKeys.PAUSE)
        })

        // Events
        this.events.on(EventKeys.ADD_ENERGY, this.addEnergy)
        this.events.on(EventKeys.ADD_SCORE, this.addScore)
        this.events.on(EventKeys.GET_POWERUP, this.getPowerUp)
        this.events.on(EventKeys.GET_SHIELD, this.getShield)
        this.events.on(EventKeys.DESTROY_ENEMY, this.destroyEnemy)

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
                if(this.player.getShieldNum() > 0)
                {
                    this.player.setShieldNum(this.player.getShieldNum() - 1)
                }
                else
                {
                    this.updateEnergy(this.player.getEnergyNum() - 1)
                }
            }
            else if(event.pairs[0].bodyA.gameObject.texture.key[0] == 'S'
                    && event.pairs[0].bodyB.gameObject.texture.key[0] == 'L')
            {
                event.pairs[0].bodyA.gameObject.updateHP(event.pairs[0].bodyB.gameObject.getDamage())
                event.pairs[0].bodyB.gameObject.laserTween.stop()
                this.laserGroup?.despawn(event.pairs[0].bodyB.gameObject)
            }
            else if(event.pairs[0].bodyA.gameObject.texture.key[0] == 'P'
                    && event.pairs[0].bodyB.gameObject.texture.key[0] == 'I')
            {
                event.pairs[0].bodyB.gameObject.getItem()
                event.pairs[0].bodyB.gameObject.despawn()
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

        if(this.player.getEnergyNum() > 0)
        {
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

                if(this.player.getPowerupNum() > 0)
                {
                    this.laser2Sound.play()
                    this.spawnLaser(this.player.x, this.player.y + this.player.height / 2 + 10, TextureKeys.LASER2)
                }
                else
                {
                    this.laser1Sound.play()
                    this.spawnLaser(this.player.x, this.player.y + this.player.height / 2 + 10, TextureKeys.LASER1)
                }
            }
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