import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion';
const CustomHome = () => {
    const snap = useSnapshot(state);
    return (
        <div>
            <AnimatePresence>
                {/* Display intro section */}
                {snap.intro && (
                    <motion.section className='home' {...slideAnimation('left')}>
                        <motion.div className='home-content' {...headContainerAnimation}>
                            <motion.div {...headTextAnimation}>
                                <h1 className='head-text'>
                                    LET'S <br className='xl:block hidden' /> DO IT.
                                </h1>
                            </motion.div>
                            <motion.div {...headContentAnimation} className='customHome1'>
                                <p className='customHome2'>
                                    Create your unique and exclusive shirt with (our brand new 3D customization tool).  <strong>Unleash your imagination </strong>
                                    and define your own style.
                                </p>
                                <CustomButton
                                    type="filled"
                                    title="Customize It"
                                    handleClick={() => state.intro = false}
                                    // handleClick={()=><Customizer/>}
                                    customStyles="customHome3"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.section>
                )}
                
            </AnimatePresence>

            
        </div>
    );
}

export default CustomHome