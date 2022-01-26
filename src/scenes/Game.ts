import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"

import Player from "~/game/Player"

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite
    private selectedCharacter!: string

    private player!: Player
    private PlayerController!: Phaser.Types.Input.Keyboard.CursorKeys

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
        this.cameras.main.fadeIn()

        const width = this.scale.width
        const height = this.scale.height

        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background).setOrigin(0)

        this.player = new Player(this, width / 2, 150, TextureKeys.SPACESHIP, this.selectedCharacter)
        this.PlayerController = this.input.keyboard.createCursorKeys()
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