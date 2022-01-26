import SceneKeys from "~/consts/SceneKeys";
import TextureKeys from "~/consts/TextureKeys";
import ShipKeys from "~/consts/ShipKeys";

import SelectImage from "~/game/SelectImage";

export default class CharacterSelect extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite
    private playerImages: SelectImage[] = []

    private selectKey!: string

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

        const atlasTexture = this.textures.get(TextureKeys.SPACESHIP)
        const frames = atlasTexture.getFrameNames()

        this.playerImages.push(new SelectImage(this, width / 4, height / 3, TextureKeys.SPACESHIP, frames[ShipKeys.BEIGE]))
        this.playerImages.push(new SelectImage(this, width / 4 * 3, height / 3, TextureKeys.SPACESHIP, frames[ShipKeys.BLUE]))
        this.playerImages.push(new SelectImage(this, width / 2, height / 3 * 1.5, TextureKeys.SPACESHIP, frames[ShipKeys.GREEN]))
        this.playerImages.push(new SelectImage(this, width / 4, height / 3 * 2, TextureKeys.SPACESHIP, frames[ShipKeys.PINK]))
        this.playerImages.push(new SelectImage(this, width / 4 * 3, height / 3 * 2, TextureKeys.SPACESHIP, frames[ShipKeys.YELLOW]))
        
        this.events.on('pointerdown', (frame: string) => {
            this.cameras.main.fadeOut()
            this.selectKey = frame
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.time.delayedCall(1000, () => {
                this.scene.start(SceneKeys.Game, {character: this.selectKey})
            })
        }) 
    }

    update(time: number, delta: number): void 
    {
        this.background.tilePositionY += 0.5
    }
}