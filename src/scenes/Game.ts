import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"

import Player from "~/game/Player"
import LaserPool from "~/game/Laser"

import Enemy from "~/game/Enemy"

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite
    private selectedCharacter!: string

    private player!: Player
    private PlayerController!: Phaser.Types.Input.Keyboard.CursorKeys
    private playerEnergy: Phaser.GameObjects.Image[] = []
    private laserGroup?: LaserPool

    private enemies: Enemy[] = []
    private enemyCat: any

    private score: number = 0
    private scoreText!: Phaser.GameObjects.Text

    AttackCount = 0

    private spawnLaser(x: number, y: number, texKey: string)
    {
        if(!this.laserGroup)
        {
            return
        }

        const laser = this.laserGroup.spawn(x, y, texKey)
        if(!laser)
        {
            return
        }

        return laser
    }

    private updateEnergy = (num: number) =>
    {
        this.player.setEnergyNum(num)

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

    private addScore = (num: number) =>
    {
        this.score += num
        this.scoreText.setText('SCORE: ' + this.score)
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
        this.events.on('IncreaseScore', this.addScore)

        // 48~64 임시 충돌체크
        this.enemyCat = this.matter.world.nextCategory()
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

        this.player.setCollidesWith(this.enemyCat)

        this.matter.world.on('collisionstart', (event) => {
            if(event.pairs[0].bodyB.gameObject.texture.key[0] == 'S')
            {
                event.pairs[0].bodyB.gameObject.despawn()
                this.updateEnergy(this.player.getEnergyNum() - 1)
            }
            else if(event.pairs[0].bodyB.gameObject.texture.key[0] == 'L')
            {
                event.pairs[0].bodyA.gameObject.updateHP()
                this.laserGroup?.despawn(event.pairs[0].bodyB.gameObject)
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

        for(const o of this.enemies)
        {  
            if(o.isCollided)
                o.destroy()
            else
                o.update()
        }
    }
}