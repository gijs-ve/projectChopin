import React, { useRef, useEffect } from 'react';
import { getTypeFromOutput } from './soundFunctions';

const OutputCanvas = (p) => {
    const canvasRef = useRef(null);
    const { sounds } = p;

    //Hardcoded

    const draw = (ctx) => {
        if (!sounds || sounds.length === 0) return;

        sounds.map((i) => {
            let color = '#2563eb';
            ctx.beginPath();
            ctx.globalAlpha = 1;
            if (i.xPosition < 100) {
                ctx.globalAlpha = i.xPosition / 100;
            }
            ctx.fillStyle = color;
            const soundType = getTypeFromOutput(i.output);
            console.log(i.output);
            if (soundType === 'drum') {
                if (i.xPosition > 244 && i.output === 'sound/steban/kick.mp3') {
                    ctx.arc(i.xPosition, i.height, 5, 0, 2 * Math.PI);
                }
                if (i.xPosition > 244) {
                    ctx.arc(i.xPosition, i.height, 3, 0, 2 * Math.PI);
                }
                if (
                    i.output === 'sound/steban/kick.mp3' &&
                    i.xPosition <= 244
                ) {
                    ctx.arc(i.xPosition, i.height, 3, 0, 2 * Math.PI);
                }
                if (i.xPosition <= 244) {
                    ctx.arc(i.xPosition, i.height, 2, 0, 2 * Math.PI);
                }
                ctx.fill();
                return;
            }
            if (soundType === 'piano') {
                if (i.xPosition > 244) {
                    const difference = i.xPosition - 244;
                    ctx.rect(i.xPosition + difference, i.height, difference, 2);
                    ctx.fill();
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
        const context = canvas.getContext('2d');
        context.fillStyle = '#4b5563';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        if (!sounds || sounds.length === 0) {
            context.clearRect(0, 0, canvas.width, canvas.height);
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
