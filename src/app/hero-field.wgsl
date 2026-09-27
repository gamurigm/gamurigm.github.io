struct Params {
  time: f32,
  texel: vec2f,
  pointer: vec2f,
  pointerActive: f32,
}

@group(0) @binding(0) var<uniform> params: Params;

fn hash21(value: vec2f) -> f32 {
  var p = fract(vec3f(value.xyx) * 0.1031);
  p += dot(p, p.yzx + vec3f(33.33));
  return fract((p.x + p.y) * p.z);
}

fn segmentDistance(point: vec2f, start: vec2f, end: vec2f) -> f32 {
  let delta = end - start;
  let amount = clamp(dot(point - start, delta) / max(dot(delta, delta), 0.0001), 0.0, 1.0);
  return distance(point, start + delta * amount);
}

fn nodePosition(seed: vec2f, time: f32) -> vec2f {
  let base = vec2f(hash21(seed), hash21(seed + vec2f(7.2, 3.1)));
  let drift = vec2f(
    sin(time * 0.24 + seed.x * 4.0),
    cos(time * 0.2 + seed.y * 3.0)
  ) * 0.055;
  return 0.08 + base * 0.84 + drift;
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / max(params.texel.x, 0.0001);
  let point = vec2f((uv.x - 0.5) * aspect + 0.5, uv.y);
  let time = params.time;
  var network = 0.0;
  var nodes = 0.0;

  for (var index = 0; index < 18; index = index + 1) {
    let seed = vec2f(f32(index) * 1.73 + 0.7, f32(index) * 2.41 + 1.3);
    let start = nodePosition(seed, time);
    let end = nodePosition(seed + vec2f(2.8, 4.6), time * 0.9 + 0.7);
    let line = segmentDistance(point, start, end);
    network += exp(-line * 520.0) * 0.8;
    nodes += exp(-distance(point, start) * 92.0) * 0.38;
  }

  let pointer = vec2f((params.pointer.x - 0.5) * aspect + 0.5, 1.0 - params.pointer.y);
  let pointerGlow = params.pointerActive * exp(-distance(point, pointer) * 16.0);
  let edgeFade = 1.0 - smoothstep(0.32, 0.88, distance(uv, vec2f(0.5)));
  let intensity = clamp((network + nodes + pointerGlow * 0.75) * edgeFade, 0.0, 1.0);
  let cobalt = vec3f(0.19, 0.36, 1.0) * intensity;
  let ice = vec3f(0.42, 0.72, 1.0) * clamp(nodes + pointerGlow, 0.0, 1.0);

  return vec4f(cobalt + ice, 1.0);
}
