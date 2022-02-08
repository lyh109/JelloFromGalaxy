import TextureKeys from "~/consts/TextureKeys"

export default class Player extends Phaser.Physics.Matter.Image
{
    private worldWidth!: number
    private initY: number

    private maxEnergyNum: number = 5
    private energyNum: number = this.maxEnergyNum

    private maxPowerupNum: number = 5
    private powerupNum: number = 5

    private maxShieldNum: number = 3
    private shieldNum: number = 0

    private shieldEffect: Phaser.GameObjects.Image
    private shieldEffectTween: any
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string)
    {
        super(scene.matter.world, x, y, texture, frame)

        scene.add.existing(this)
        this.scene = scene
        this.worldWidth = scene.scale.width
        this.initY = y

        this.setIgnoreGravity(true)

        this.shieldEffect = this.scene.add.image(x, y + 15, TextureKeys.SHIELD_EFFECT)
        this.shieldEffect.setVisible(false)

        this.shieldEffectTween = this.scene.tweens.add({
            targets: this.shieldEffect,
            alpha: 0.3,
            duration: 1500,
            yoyo: true,
            repeat: -1
        }).pause()
    }

    reset()
    {
        this.energyNum = this.maxEnergyNum
        this.powerupNum = 0
        this.shieldNum = 0
        
        this.shieldEffect.setVisible(false)
        this.shieldEffectTween.pause()
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

    getMaxShieldNum()
    {
        return this.maxShieldNum
    }

    getShieldNum()
    {
        return this.shieldNum
    }

    setShieldNum(num: number)
    {
        this.shieldNum = num
        
        if(this.shieldNum == this.maxShieldNum)
        {
            this.shieldEffect.setVisible(true)
            if(this.shieldEffectTween.isPaused())
            {
                this.shieldEffectTween.play()
            }
        }
        else if(this.shieldNum == 0)
        {
            this.shieldEffect.setVisible(false)
            this.shieldEffectTween.pause()
        }
    }

    MoveLeft()
    {
        if(this.rotation > -0.1)
        {
            this.rotation -= 0.01
            this.shieldEffect.rotation -= 0.01
        }

        if(this.x > this.width / 2)
        {
            this.x -= 5
            this.shieldEffect.x -= 5
        }
    }

    MoveRight()
    {
        if(this.rotation < 0.1)
        {
            this.rotation += 0.01
            this.shieldEffect.rotation += 0.01
        }

        if(this.x < this.worldWidth - this.width / 2)
        {
            this.x += 5
            this.shieldEffect.x += 5
        }
    }

    Idle()
    {
        this.y = this.initY
        this.shieldEffect.setPosition(this.x, this.y + 15)

        if(this.rotation > 0)
        {
            this.rotation -= 0.01
        }
        else if(this.rotation < 0)
        {
            this.rotation += 0.01
        }

        this.shieldEffect.rotation = this.rotation
    }
}