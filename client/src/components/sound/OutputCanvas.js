import React, { useRef, useEffect } from 'react';
import { getTypeFromOutput, colorIsValidHexValue } from './soundFunctions';
import { selectUserColor } from '../../store';
import { useSelector } from 'react-redux';

const OutputCanvas = (p) => {
    const canvasRef = useRef(null);
    const { sounds } = p;
    const userColor = useSelector(selectUserColor);
    const draw = (ctx) => {
        if (!sounds || sounds.length === 0) return;
        sounds.map((i) => {
            let color = undefined;
            if (!i.color) {
                color = userColor;
            }
            if (i.origin === 'recorder') {
                color = '#FF0000';
            }
            if (i.color) {
                color = i.color;
            }
            if (!colorIsValidHexValue(color)) {
                color = '#2563eb';
            }
            ctx.fill();
            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 5;
            ctx.shadowColor = color;
            if (i.xPosition < 60) {
                ctx.globalAlpha = (i.xPosition - 10) / 50;
            }
            if (i.xPosition < 10) {
                ctx.globalAlpha = 0;
            }
            ctx.fillStyle = color;
            const soundType = getTypeFromOutput(i.output);
            if (soundType === 'drum') {
                if (i.xPosition > 244 && i.output === 'sound/steban/kick.mp3') {
                    ctx.arc(i.xPosition, i.height, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = color;
                    ctx.globalAlpha = 0.2;
                }
                if (i.xPosition > 244) {
                    ctx.arc(i.xPosition, i.height, 3, 0, 2 * Math.PI);
                }
                if (
                    i.output === 'sound/steban/kick.mp3' &&
                    i.xPosition <= 244
                ) {
                    ctx.arc(i.xPosition, i.height, 3, 0, 2 * Math.PI);
                    ctx.fillStyle = color;
                }
                if (i.xPosition <= 244) {
                    ctx.arc(i.xPosition, i.height, 2, 0, 2 * Math.PI);
                }
                ctx.fill();
                return;
            }
            if (soundType === 'piano') {
                if (i.xPosition > 242) {
                    const difference = i.xPosition - 232;
                    ctx.rect(
                        i.xPosition + difference,
                        i.height,
                        2 + difference,
                        2,
                    );
                    ctx.fill();

                    return;
                }
                if (i.xPosition < 18) {
                    ctx.rect(i.xPosition - 18, i.height, 24, 2);
                    return;
                }
                ctx.rect(i.xPosition, i.height, 6, 2);
                ctx.fill();
            }
        });
        return;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#4b5563';
        ctx.shadowBlur = 7;
        ctx.shadowColor = '#4b5563';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!sounds || sounds.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [sounds]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        draw(context);
    }, [draw]);

    return <canvas ref={canvasRef} {...p} />;
};

export { OutputCanvas };
