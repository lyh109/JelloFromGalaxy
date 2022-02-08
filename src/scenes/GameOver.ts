import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"

export default class GameOver extends Phaser.Scene
{
    private score!: number
    private background!: Phaser.GameObjects.TileSprite

    constructor()
    {
        super(SceneKeys.GameOver)
    }

    /**
	 * @param {{ score: number }} data 
	 */
    init(data)
    {
        this.score = data.score
    }

    create()
    {
        this.cameras.main.fadeIn()

        const width = this.scale.width
        const height = this.scale.height

        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background).setOrigin(0)
    }

    update(time: number, delta: number): void 
    {
        this.background.tilePositionY += 0.5
    }
}