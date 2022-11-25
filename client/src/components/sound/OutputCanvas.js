import React, { useRef, useEffect } from 'react';
import { getTypeFromOutput } from './soundFunctions';

const OutputCanvas = (p) => {
    const canvasRef = useRef(null);
    const { sounds } = p;

    //Hardcoded
    const color = '#2563eb';

    const draw = (ctx) => {
        ctx.fillStyle = color;
        if (!sounds || sounds.length === 0) return;
        sounds.map((i) => {
            const soundType = getTypeFromOutput(i.output);
            console.log(soundType);
            if (i.xPosition > 244) {
                const difference = i.xPosition - 244;
                ctx.beginPath();
                ctx.rect(i.xPosition + difference, i.height, difference, 2);
                ctx.fill();
                return;
            }
            ctx.beginPath();
            ctx.rect(i.xPosition, i.height, 6, 2);
            ctx.fill();
        });
        return;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#4b5563';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, [sounds]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        draw(context);
    }, [draw]);

    return <canvas ref={canvasRef} {...p} />;
};

export { OutputCanvas };
