import {proxy} from 'valtio';

const state = proxy({
    intro: true,
    color:'#EFBD48',
    isLogoTexture: true,
    isFullTexture: true,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
    Home:true,
})

export default state;