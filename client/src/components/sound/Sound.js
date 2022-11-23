import React from 'react';
import styled from 'styled-components';

function Sound(p) {
    const { xPos } = p;
    //margin-right: ${(p) => p.xPos}px;
    return <SoundCircle xPos={xPos}></SoundCircle>;
}

export { Sound };
const SoundCircle = styled.div`
    margin-left: ${(p) => p.xPos}px;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 9999px;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(14 165 233);
    background-color: rgb(14 165 233);
    position: absolute;
`;
