export default class Player extends Phaser.Physics.Matter.Image
{
    private worldWidth!: number
    private initY: number

    private maxEnergyNum: number = 5
    private energyNum: number = this.maxEnergyNum

    private maxPowerupNum: number = 5
    private powerupNum: number = 0

    private maxShieldNum: number = 5
    private shieldNum: number = 0
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string)
    {
        super(scene.matter.world, x, y, texture, frame)

        scene.add.existing(this)
        this.scene = scene
        this.worldWidth = scene.scale.width
        this.initY = y

        this.setIgnoreGravity(true)
    }

    getMaxEnergyNum()
    {
        return this.maxEnergyNum
    }

    getEnergyNum()
    {
        return this.energyNum
    }

    setEnergyNum(num: number)
    {
        this.energyNum = num
    }

    getMaxPowerupNum()
    {
        return this.maxPowerupNum
    }

    getPowerupNum()
    {
        return this.powerupNum
    }

    setPowerupNum(num: number)
    {
        this.powerupNum = num
    }

    getShieldNum()
    {
        return this.shieldNum
    }

    setShieldNum(num: number)
    {
        this.shieldNum = num
    }

    MoveLeft()
    {
        if(this.rotation > -0.1)
        {
            this.rotation -= 0.01
        }

        if(this.x > this.width / 2)
        {
            this.x -= 5
        }
    }

    MoveRight()
    {
        if(this.rotation < 0.1)
        {
            this.rotation += 0.01
        }

        if(this.x < this.worldWidth - this.width / 2)
        {
            this.x += 5
        }
    }

    Idle()
    {
        this.y = this.initY

        if(this.rotation > 0)
        {
            this.rotation -= 0.01
        }
        else if(this.rotation < 0)
        {
            this.rotation += 0.01
        }
    }
}