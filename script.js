import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const tabs = document.querySelectorAll('.tab');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navigation.classList.remove('open')));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!prefersReducedMotion && hasFinePointer) {
  document.querySelectorAll('.tilt-3d').forEach(card => {
    const strength = card.classList.contains('tilt-hero') ? 4 : 7;
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.setProperty('--tilt-x', `${-y * strength}deg`);
      card.style.setProperty('--tilt-y', `${x * strength}deg`);
      card.style.setProperty('--glow-x', `${(x + .5) * 100}%`);
      card.style.setProperty('--glow-y', `${(y + .5) * 100}%`);
      card.classList.add('is-tilting');
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.classList.remove('is-tilting');
    });
  });
}
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => item.classList.remove('active'));
  tab.classList.add('active');
  const area = tab.dataset.area;
  document.querySelectorAll('[data-rural]').forEach(price => price.textContent = price.dataset[area]);
}));

document.querySelectorAll('a[href="#contact"]').forEach(link => link.addEventListener('click', () => {
  const packageName = link.closest('.package')?.querySelector('h3')?.textContent.trim();
  if (packageName) document.querySelector('[name="package"]').value = packageName.includes('GIGA') ? 'GIGA / SKY' : packageName;
}));

document.querySelector('#lead-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const result = form.querySelector('.success');
  const originalLabel = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.textContent = 'Đang gửi thông tin...';
  result.textContent = '';
  result.classList.remove('error');

  try {
    // Decode Base64 endpoint to prevent simple bot scraping
    const endpoint = atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi9tcHF2amJkdw==');
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Lead submission failed');
    result.textContent = 'Cảm ơn bạn! FPT sẽ liên hệ tư vấn trong thời gian sớm nhất.';
    form.reset();
  } catch (error) {
    result.textContent = 'Chưa thể gửi thông tin. Vui lòng gọi ngay 0358513269 hoặc 0383 900 321 để được hỗ trợ.';
    result.classList.add('error');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});

/* =========================================================
   BẢN ĐỒ VIỆT NAM 3D – EXTRUDE + BLOOM + DATA PARTICLES
   ========================================================= */
function initMap3D() {
  const container = document.getElementById('map3d-container');
  if (!container) return;
  const canvas = document.getElementById('map3d-canvas');
  const rotateBtn = document.getElementById('map-rotate');
  const resetBtn = document.getElementById('map-reset');
  const cW = container.clientWidth, cH = 560;

  const S = 0.6, H = 6, TOP = H;
  const P = (x, y, yTop = TOP) => new THREE.Vector3((x - 50) * S, yTop, -(y - 50) * S);

  /* ── Giải mã bản đồ Việt Nam từ chuỗi ASCII nổi tiếng ── */
  function decodeVNMap() {
    const str = "LA0KCAA0BABBAJ0AP0BP0BQ0DS0CR0DO0IH0JG0KE0HG0GH0IE0JD0LC0MD0NC0OC0PC0QC0QEKABA0SDMA0TD0TE0VD0UE0UF0UF0TH0UG0UG0UG0UHOUH0TH0RJ0OM0OL0OJ0LL0JL0GABI0GACGQAAA0KGQA0KEPAAAAAA0KCEAMA0KBUA0";
    const rows = [];
    let row = [], col = 0, j = 1;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (c > 64) {
        const ch = (j & 1) ? 0 : 1; // 0=space, 1=fill
        for (let k = 0; k < c - 64; k++) { row.push({ col: col++, fill: ch }); }
        j++;
      } else {
        rows.push(row); row = []; col = 0; j = 1;
      }
    }
    if (row.length) rows.push(row);

    // Trích xuất cạnh trái/phải mỗi hàng
    const edges = [];
    rows.forEach((r, ri) => {
      let left = -1, right = -1;
      r.forEach(p => { if (p.fill) { if (left < 0) left = p.col; right = p.col; } });
      if (left >= 0) edges.push({ row: ri, left, right });
    });

    // Chuyển sang tọa độ 0-100
    const totalRows = rows.length;
    const maxCol = Math.max(...edges.map(e => e.right));
    const xScale = 55 / maxCol, xOff = 20;
    const yScale = 88 / totalRows, yOff = 5;
    const toXY = (col, row) => [
      Math.round(col * xScale + xOff),
      Math.round((totalRows - row) * yScale + yOff)
    ];

    // Trace bờ Đông (trên → dưới) rồi bờ Tây (dưới → trên)
    const eastCoast = edges.map(e => toXY(e.right, e.row));
    const westCoast = edges.slice().reverse().map(e => toXY(e.left, e.row));
    return [...eastCoast, ...westCoast];
  }

  const VN_BORDER = decodeVNMap();

  /* ── Trạm phát sóng (kể cả hải đảo) ── */
  const STATIONS = [
    { n:'Hà Nội',    x:46, y:82 },
    { n:'Hải Phòng', x:54, y:80 },
    { n:'Vinh',      x:45, y:64 },
    { n:'Huế',       x:52, y:54 },
    { n:'Đà Nẵng',   x:56, y:48 },
    { n:'Nha Trang', x:60, y:33 },
    { n:'Đà Lạt',    x:58, y:28 },
    { n:'TP. HCM',   x:58, y:22 },
    { n:'Cần Thơ',   x:48, y:14 },
    { n:'Hoàng Sa',  x:108,y:58, sea:true },
    { n:'Trường Sa', x:106,y:22, sea:true },
  ];

  /* ── SCENE / CAMERA / RENDERER ── */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x02060d);
  scene.fog = new THREE.FogExp2(0x02060d, 0.006);

  const camera = new THREE.PerspectiveCamera(50, cW / cH, 0.1, 2000);
  camera.position.set(0, 75, 95);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(cW, cH);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.6;
  controls.maxPolarAngle = Math.PI / 2.1;

  // Ánh sáng
  scene.add(new THREE.AmbientLight(0x223344, 1.2));
  const dir = new THREE.DirectionalLight(0x88ccff, 1.0);
  dir.position.set(30, 60, 20);
  scene.add(dir);

  // Lưới nền công nghệ
  const grid = new THREE.GridHelper(240, 48, 0x0a4a55, 0x06222b);
  grid.position.y = -0.1;
  scene.add(grid);

  /* ── KHỐI BẢN ĐỒ 3D (EXTRUDE) + VIỀN NEON ── */
  const mapGroup = new THREE.Group();
  mapGroup.rotation.x = -Math.PI / 2;
  scene.add(mapGroup);

  const shape = new THREE.Shape();
  VN_BORDER.forEach(([x, y], i) => {
    const X = (x - 50) * S, Y = (y - 50) * S;
    i ? shape.lineTo(X, Y) : shape.moveTo(X, Y);
  });
  shape.closePath();

  const extrudeGeo = new THREE.ExtrudeGeometry(shape, {
    depth: H, bevelEnabled: true, bevelThickness: 0.4, bevelSize: 0.4, bevelSegments: 2
  });
  mapGroup.add(new THREE.Mesh(extrudeGeo, new THREE.MeshPhongMaterial({
    color: 0xb00010, emissive: 0x550008, shininess: 40, transparent: true, opacity: 0.95
  })));
  mapGroup.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(extrudeGeo, 1),
    new THREE.LineBasicMaterial({ color: 0x00fff0 })
  ));

  /* ── NGÔI SAO VÀNG (khu vực Hà Nội) ── */
  const starS = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 2 : 5, a = Math.PI / 2 + i * Math.PI / 5;
    i ? starS.lineTo(Math.cos(a) * r, Math.sin(a) * r) : starS.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  starS.closePath();
  const star = new THREE.Mesh(new THREE.ShapeGeometry(starS), new THREE.MeshBasicMaterial({ color: 0xffd400 }));
  star.rotation.x = -Math.PI / 2;
  star.position.copy(P(44, 88, H + 0.3));
  scene.add(star);

  /* ── TRẠM PHÁT SÓNG + VÒNG SÓNG LAN TỎA (PULSE) ── */
  const pulses = [];
  const ringGeo = new THREE.RingGeometry(0.85, 1.0, 48);

  function makeLabel(text, sea) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.font = 'bold 26px Inter, system-ui, sans-serif';
    ctx.fillStyle = sea ? '#ff6b6b' : '#eafff9';
    ctx.shadowColor = sea ? '#ff0000' : '#00ffd0';
    ctx.shadowBlur = 10;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 32);
    const tex = new THREE.CanvasTexture(c);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
    sp.scale.set(14, 3.5, 1);
    return sp;
  }

  STATIONS.forEach(st => {
    const base = P(st.x, st.y, st.sea ? 0.2 : H + 0.2);

    // Chấm sáng trung tâm trạm
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 16, 16),
      new THREE.MeshBasicMaterial({ color: st.sea ? 0xff5555 : 0x9bffff })
    );
    dot.position.copy(base);
    scene.add(dot);

    // Nhãn tên
    const label = makeLabel(st.n, st.sea);
    label.position.copy(base).add(new THREE.Vector3(0, 4, 0));
    scene.add(label);

    // 3 vòng sóng lệch pha => phát sóng liên tục
    for (let k = 0; k < 3; k++) {
      const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
        color: st.sea ? 0xff4444 : 0x00ffd0, transparent: true, opacity: 0.9,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
      }));
      m.rotation.x = -Math.PI / 2;
      m.position.copy(base);
      scene.add(m);
      pulses.push({ mesh: m, phase: k / 3, speed: 0.35, max: st.sea ? 22 : 16 });
    }
  });

  /* ── MẠNG LƯỚI KẾT NỐI (MESH NETWORK) ── */
  const dashMat = new THREE.LineDashedMaterial({
    color: 0x33e0ff, dashSize: 1.2, gapSize: 0.8,
    transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending
  });
  [[0,1],[0,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[4,9],[7,10],[0,4]].forEach(([a, b]) => {
    const pa = P(STATIONS[a].x, STATIONS[a].y, STATIONS[a].sea ? 0.2 : H + 0.2);
    const pb = P(STATIONS[b].x, STATIONS[b].y, STATIONS[b].sea ? 0.2 : H + 0.2);
    const mid = pa.clone().add(pb).multiplyScalar(0.5); mid.y += 8;
    const geo = new THREE.BufferGeometry().setFromPoints(
      new THREE.QuadraticBezierCurve3(pa, mid, pb).getPoints(40)
    );
    const line = new THREE.Line(geo, dashMat);
    line.computeLineDistances();
    scene.add(line);
  });

  /* ── HẠT DỮ LIỆU BAY (DATA PARTICLES) ── */
  const N = 500;
  const posArr = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    posArr[i*3]   = (Math.random()-0.5) * 70;
    posArr[i*3+1] = H + Math.random() * 22;
    posArr[i*3+2] = (Math.random()-0.5) * 90;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0x66ffee, size: 0.5, transparent: true, opacity: 0.8,
    blending: THREE.AdditiveBlending, depthWrite: false
  })));

  /* ── POST-PROCESSING: BLOOM (hiệu ứng phát sáng) ── */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(cW, cH), 1.25, 0.5, 0.0));

  /* ── ĐIỀU KHIỂN ── */
  if (rotateBtn) {
    rotateBtn.textContent = '⟳ Dừng quay';
    rotateBtn.addEventListener('click', () => {
      controls.autoRotate = !controls.autoRotate;
      rotateBtn.textContent = controls.autoRotate ? '⟳ Dừng quay' : '⟳ Tự quay';
    });
  }
  if (resetBtn) resetBtn.addEventListener('click', () => {
    camera.position.set(0, 75, 95);
    controls.target.set(0, 0, 0);
  });

  /* ── VÒNG LẶP ANIMATION ── */
  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();

    // Vòng sóng lan tỏa + mờ dần => cảm giác "phủ sóng"
    pulses.forEach(p => {
      p.phase += dt * p.speed;
      if (p.phase > 1) p.phase -= 1;
      const s = 1 + p.phase * p.max;
      p.mesh.scale.set(s, s, s);
      p.mesh.material.opacity = (1 - p.phase) * 0.9;
    });

    // Chạy nét đứt trên đường kết nối
    dashMat.dashSize = 1.2 + Math.sin(clock.elapsedTime * 2) * 0.3;

    // Hạt bay lên
    const arr = pGeo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      arr[i*3+1] += dt * 3;
      if (arr[i*3+1] > H + 22) arr[i*3+1] = H;
    }
    pGeo.attributes.position.needsUpdate = true;

    controls.update();
    composer.render();
  })();

  /* ── RESIZE ── */
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    renderer.setSize(w, cH);
    camera.aspect = w / cH;
    camera.updateProjectionMatrix();
    composer.setSize(w, cH);
  });
}

initMap3D();