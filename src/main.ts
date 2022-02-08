import Phaser from 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'

import Preloader from './scenes/Preloader'
import Title from './scenes/Title'
import CharacterSelect from './scenes/CharacterSelect'
import Game from './scenes/Game'
import Pause from './scenes/Pause'
import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: [Preloader, Title, CharacterSelect, Game, Pause, GameOver],
    plugins: {
        scene: [
            { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine'}
        ]
    }
}

export default new Phaser.Game(config)