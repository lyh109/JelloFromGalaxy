export default class SelectImage extends Phaser.GameObjects.Image
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string)
    {
        super(scene, x, y, texture, frame)

        this.scene = scene
        this.Initialize(x, y, texture, frame)      
    }

    Initialize(x: number, y: number, texture: string, frame: string)
    {
        // TODO: 이미지 생성, setInteractive()
        // pointerover, out 이벤트 생성
        // clicked 이벤트 생성
    }
}