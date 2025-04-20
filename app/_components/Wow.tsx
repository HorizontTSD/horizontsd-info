import React from 'react';
import { useEffect, useRef } from "react";

const V = `#version 300 es
in vec2 aVertexPosition;
void main() {
  gl_Position = vec4(aVertexPosition, 0, 1);
}
`;
const F = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 uColor;
out vec4 fragColor;
float h(float x){return fract(sin(x*12.9898)*43758.5453);}
void main(){vec2 u=gl_FragCoord.xy/iResolution.xy;float s=0.001,t=0.02,m=0.1,M=0.9,r=floor(u.y/s),y=fract(u.y/s),a=step(y,t),L=mix(m,M,h(r)),v=mix(.1,.5,h(r+1.)),p=fract(1.-u.x+iTime*v+h(r)),b=step(p,L),o=clamp(1.-p/L,0.,1.);fragColor=vec4(uColor,a*b*o);}
`;

type WebGLBackgroundProps = {
	color?: [number, number, number];
};

export const WebGLBackground: React.FC<WebGLBackgroundProps> = ({
	color = [0.0, 0.0, 1.0],
}) => {
	const ref = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		const c = ref.current;
		if (!c) return;
		const gl = c.getContext('webgl2', { alpha: true })!;
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		const resize = () => {
			c.width = c.clientWidth;
			c.height = c.clientHeight;
			gl.viewport(0, 0, c.width, c.height);
		};
		window.addEventListener('resize', resize);
		resize();

		const compile = (s: string, t: number) => {
			const sh = gl.createShader(t)!;
			gl.shaderSource(sh, s);
			gl.compileShader(sh);
			return sh;
		};
		const prog = gl.createProgram()!;
		gl.attachShader(prog, compile(V, gl.VERTEX_SHADER));
		gl.attachShader(prog, compile(F, gl.FRAGMENT_SHADER));
		gl.linkProgram(prog);
		gl.useProgram(prog);
		const buf = gl.createBuffer()!;
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]),
			gl.STATIC_DRAW
		);
		const posLoc = gl.getAttribLocation(prog, 'aVertexPosition');
		gl.enableVertexAttribArray(posLoc);
		gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
		const rLoc = gl.getUniformLocation(prog, 'iResolution')!;
		const tLoc = gl.getUniformLocation(prog, 'iTime')!;
		const cLoc = gl.getUniformLocation(prog, 'uColor')!;
		const start = performance.now();
		const render = () => {
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.uniform3f(rLoc, c.width, c.height, 1);
			gl.uniform1f(tLoc, (performance.now() - start) * 0.001);
			gl.uniform3f(cLoc, color[0], color[1], color[2]);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			requestAnimationFrame(render);
		};
		render();
		return () => window.removeEventListener('resize', resize);
	}, [color]);
	return <canvas
		ref={ref}
		style={{
			position: "absolute",
			top: "0",
			left: "0",
			width: '100%',
			height: '100%',
			background: 'transparent'
		}} />;
};
