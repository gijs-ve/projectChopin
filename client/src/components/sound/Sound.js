import React from 'react';
import styled from 'styled-components';

function Sound(p) {
    const { xPos } = p;
    const opacity = xPos * 0.00125 + 0.2;
    return (
        <SoundCircle
            xPos={xPos}
            style={{ marginLeft: `${xPos}px`, opacity }}
        ></SoundCircle>
    );
}

export { Sound };
const SoundCircle = styled.div`
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 9999px;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(14 165 233);
    background-color: rgb(14 165 233);
    position: absolute;
`;

//margin-left: ${(p) => p.xPos}px;
