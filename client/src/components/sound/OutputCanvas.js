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
                    ctx.rect(i.xPosition, 1, 1, ctx.canvas.clientHeight);
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
                    ctx.rect(i.xPosition, 1, 1, ctx.canvas.clientHeight);
                }
                if (i.xPosition <= 244) {
                    ctx.arc(i.xPosition, i.height, 2, 0, 2 * Math.PI);
                }
                ctx.fill();
                return;
            }
            if (soundType === 'piano') {
                if (i.xPosition > 232) {
                    const difference = i.xPosition - 232;
                    ctx.rect(i.xPosition + difference, i.height, difference, 2);
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
