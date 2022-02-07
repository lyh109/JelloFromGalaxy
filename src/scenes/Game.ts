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
    private laserGroup?: LaserPool

    private enemies: Enemy[] = []

    private enemyCat: any

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

        this.input.keyboard.on('keydown-ESC', () => {
            this.events.emit('pause')
        })

        // 48~64 임시 충돌체크
        this.enemyCat = this.matter.world.nextCategory()
        const objectData = this.cache.json.get('object')
        for(let o of objectData)
        {
            const enemy = new Enemy(this, o.x, o.y, TextureKeys.SHIP_BLUE)
            enemy.setCollisionCategory(this.enemyCat)
            this.enemies.push(enemy)
        }

        this.player.setCollidesWith(this.enemyCat)

        this.matter.world.on('collisionstart', (event) => {
            if(event.pairs[0].bodyB.gameObject.texture.key == TextureKeys.SHIP_BLUE)
            {
                console.log('collide')
                event.pairs[0].bodyB.gameObject.despawn()
            }
        })
    }

    update(time: number, delta: number): void 
    {
        this.background.tilePositionY += 0.5

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
            // TODO: 공격 함수 추가
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