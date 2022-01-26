import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"

export default class Game extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite
    private selectedCharacter!: string

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

        this.add.image(width / 2, 150, TextureKeys.SPACESHIP, this.selectedCharacter)
    }

    update(time: number, delta: number): void 
    {
        this.background.tilePositionY += 0.5
    }
}