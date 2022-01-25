import SceneKeys from "~/consts/SceneKeys";
import TextureKeys from "~/consts/TextureKeys";
import ShipKeys from "~/consts/ShipKeys";

export default class CharacterSelect extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite

    constructor()
    {
        super(SceneKeys.CharacterSelect)
    }

    create()
    {
        this.cameras.main.fadeIn()

        const width = this.scale.width
        const height = this.scale.height

        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background).setOrigin(0)

        var atlasTexture = this.textures.get(TextureKeys.SPACESHIP)
        var frames = atlasTexture.getFrameNames()

        var beige = this.add.image(width / 4, height / 3, TextureKeys.SPACESHIP, frames[ShipKeys.BEIGE]).setInteractive()
        var blue = this.add.image(width / 4 * 3, height / 3, TextureKeys.SPACESHIP, frames[ShipKeys.BLUE]).setInteractive()
        var green = this.add.image(width / 2, height / 3 * 1.5, TextureKeys.SPACESHIP, frames[ShipKeys.GREEN]).setInteractive()
        var pink = this.add.image(width / 4, height / 3 * 2, TextureKeys.SPACESHIP, frames[ShipKeys.PINK]).setInteractive()
        var yellow = this.add.image(width / 4 * 3, height / 3 * 2, TextureKeys.SPACESHIP, frames[ShipKeys.YELLOW]).setInteractive()

        
    }

    update(time: number, delta: number): void 
    {
        this.background.tilePositionY += 0.5
    }
}