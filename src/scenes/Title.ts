import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"

export default class Title extends Phaser.Scene
{
    private background!: Phaser.GameObjects.TileSprite
    private pressText!: Phaser.GameObjects.Text

    constructor()
    {
        super(SceneKeys.Title)
    }

    create()
    {
        this.cameras.main.fadeIn()

        const width = this.scale.width
        const height = this.scale.height

        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background).setOrigin(0)
        this.add.image(width / 2, 300, TextureKeys.LOGO)

        this.pressText = this.add.text(width / 2, height / 2, 'PRESS ANY KEY', {fontFamily: 'CustomFont'})
            .setFontSize(50)
            .setOrigin(0.5)

        this.tweens.add({
            targets: this.pressText,
            alpha: 0.3,
            duration: 1500,
            yoyo: true,
            repeat: -1
        })

        this.input.keyboard.on('keydown', () => {
            this.cameras.main.fadeOut()
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.time.delayedCall(1000, () => {
                this.scene.start(SceneKeys.CharacterSelect)
            })
        })
    }

    update(time: number, delta: number): void 
    {
        this.background.tilePositionY += 0.5
    }
}