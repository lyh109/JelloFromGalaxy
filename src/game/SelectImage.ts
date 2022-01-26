export default class SelectImage extends Phaser.GameObjects.Container
{
    private img!: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string)
    {
        super(scene, x, y)

        this.scene = scene
        
        this.img = this.scene.add.image(x, y, texture, frame).setInteractive()

        this.img.on('pointerover', () => {
            this.img.setScale(1.2, 1.2)
        })

        this.img.on('pointerout', () => {
            this.img.setScale(1, 1)
        })

        this.img.on('pointerdown', () => {
            // TODO: 효과음 재생
            this.scene.events.emit('pointerdown', frame)
        })
    }
}