import SoundKeys from "~/consts/SoundKeys"

export default class SelectImage extends Phaser.GameObjects.Container
{
    private img!: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string)
    {
        super(scene, x, y)

        this.scene = scene
        
        this.img = this.scene.add.image(x, y, texture, frame).setInteractive()

        const onSound = this.scene.sound.add(SoundKeys.S_ON, {volume: 0.1})
        const offSound = this.scene.sound.add(SoundKeys.S_OFF, {volume: 0.1})

        this.img.on('pointerover', () => {
            onSound.play()
            this.img.setScale(1.2, 1.2)
        })

        this.img.on('pointerout', () => {
            this.img.setScale(1, 1)
        })

        this.img.on('pointerdown', () => {
            offSound.play()
            this.scene.events.emit('pointerdown', frame)
        })
    }
}