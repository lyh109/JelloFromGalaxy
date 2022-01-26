import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"

import Player from "~/game/Player"
import Enemy from "~/game/Enemy"

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite
    private selectedCharacter!: string

    private player!: Player
    private PlayerController!: Phaser.Types.Input.Keyboard.CursorKeys

    private enemies: Enemy[] = []

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

        this.input.keyboard.on('keydown-ESC', () => {
            this.events.emit('pause')
        })

        const objectData = this.cache.json.get('object')
        for(let o of objectData)
        {
            this.enemies.push(new Enemy(this, o.x, o.y, TextureKeys.SHIP_BLUE))
        }
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

        if(this.PlayerController.space.isDown)
        {
            // TODO: 공격 함수 추가
        }
    }
}