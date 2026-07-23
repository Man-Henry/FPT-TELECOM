import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
    const response = await fetch('https://formspree.io/f/mpqvjbdw', {
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

function initMap3D() {
  const container = document.getElementById('map3d-container');
  if (!container) return;

  const canvas = document.getElementById('map3d-canvas');
  const rotateBtn = document.getElementById('map-rotate');
  const resetBtn = document.getElementById('map-reset');
  const searchInput = document.getElementById('map-search');
  const searchBtn = document.getElementById('map-search-btn');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, 560);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05142e);

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / 560, 0.1, 1000);
  camera.position.set(0, 80, 180);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = true;
  controls.minDistance = 80;
  controls.maxDistance = 400;
  controls.maxPolarAngle = Math.PI / 2 - 0.05;

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(50, 150, 100);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0x00d4aa, 0.5);
  dirLight2.position.set(-50, 100, -50);
  scene.add(dirLight2);

  const vietnamBounds = { minLat: 8.2, maxLat: 23.5, minLon: 102, maxLon: 110 };
  const width = 200;
  const height = 200;
  const geometry = new THREE.PlaneGeometry(width, height, 100, 100);
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const lat = vietnamBounds.maxLat - (y + height / 2) / height * (vietnamBounds.maxLat - vietnamBounds.minLat);
    const lon = vietnamBounds.minLon + (x + width / 2) / width * (vietnamBounds.maxLon - vietnamBounds.minLon);
    const inVietnam = lat >= 8.2 && lat <= 23.5 && lon >= 102 && lon <= 110;
    const noise = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.5 + Math.sin(x * 0.05 + y * 0.05) * 0.3;
    const elevation = inVietnam ? (noise + 1) * 2 : -10;
    positions.setZ(i, elevation);
  }
  geometry.computeVertexNormals();

  const vertexShader = `
    varying vec3 vPosition;
    varying float vElevation;
    void main() {
      vPosition = position;
      vElevation = position.z;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec3 vPosition;
    varying float vElevation;
    void main() {
      float elev = vElevation;
      float t = uTime * 0.3;
      vec3 landColor = mix(vec3(0.02, 0.15, 0.35), vec3(0.0, 0.4, 0.6), smoothstep(-1.0, 8.0, elev));
      vec3 waterColor = vec3(0.01, 0.08, 0.2);
      float waterLevel = 0.0;
      float isWater = step(elev, waterLevel);
      vec3 color = mix(landColor, waterColor, isWater);
      float grid = 0.0;
      if (elev > waterLevel) {
        grid = step(0.95, fract(vPosition.x * 0.05 + t)) * step(0.95, fract(vPosition.y * 0.05));
        grid += step(0.95, fract(vPosition.x * 0.05)) * step(0.95, fract(vPosition.y * 0.05 + t));
        color += vec3(0.0, 0.8, 0.6) * grid * 0.3;
      }
      float glow = smoothstep(2.0, 8.0, elev) * (0.3 + 0.2 * sin(t * 2.0 + vPosition.x * 0.1));
      color += vec3(0.0, 0.83, 0.67) * glow;
      if (elev < -5.0) {
        color = mix(waterColor, vec3(0.0, 0.3, 0.5), sin(t + vPosition.x * 0.02) * 0.5 + 0.5);
      }
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: { uTime: { value: 0 } },
    wireframe: false,
    transparent: false
  });

  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -2;
  scene.add(plane);

  const cities = [
    { name: 'Hà Nội', lat: 21.0285, lon: 105.8542, type: 'core' },
    { name: 'TP.HCM', lat: 10.8231, lon: 106.6297, type: 'core' },
    { name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022, type: 'core' },
    { name: 'Cần Thơ', lat: 10.0452, lon: 105.7469, type: 'bts' },
    { name: 'Hải Phòng', lat: 20.8449, lon: 106.6881, type: 'bts' },
    { name: 'Nha Trang', lat: 12.2388, lon: 109.1967, type: 'fiber' },
    { name: 'Vũng Tàu', lat: 10.3459, lon: 107.0843, type: 'coverage' },
    { name: 'Biên Hòa', lat: 10.9447, lon: 106.8243, type: 'bts' },
    { name: 'Huế', lat: 16.4637, lon: 107.5909, type: 'fiber' },
    { name: 'Quy Nhơn', lat: 13.7563, lon: 109.2297, type: 'coverage' },
    { name: 'Bắc Ninh', lat: 21.1861, lon: 106.0763, type: 'bts' },
    { name: 'Thái Nguyên', lat: 21.5672, lon: 105.8252, type: 'coverage' },
  ];

  const typeColors = {
    core: 0x00D4AA,
    bts: 0xFFB800,
    fiber: 0x6366F1,
    coverage: 0x06B6D4
  };

  const cityMeshes = [];
  cities.forEach(city => {
    const x = ((city.lon - vietnamBounds.minLon) / (vietnamBounds.maxLon - vietnamBounds.minLon) - 0.5) * width;
    const z = -((city.lat - vietnamBounds.minLat) / (vietnamBounds.maxLat - vietnamBounds.minLat) - 0.5) * height;
    const y = 4;

    const coneGeo = new THREE.ConeGeometry(1.5, 6, 6);
    const coneMat = new THREE.MeshBasicMaterial({
      color: typeColors[city.type],
      transparent: true,
      opacity: 0.9
    });
    const mesh = new THREE.Mesh(coneGeo, coneMat);
    mesh.position.set(x, y, z);
    mesh.userData = { city, baseY: y };
    scene.add(mesh);
    cityMeshes.push(mesh);

    const ringGeo = new THREE.RingGeometry(1.8, 2.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: typeColors[city.type],
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(x, 0.5, z);
    ring.rotation.x = -Math.PI / 2;
    scene.add(ring);
    mesh.userData.ring = ring;
  });

  let autoRotate = false;
  if (rotateBtn) rotateBtn.addEventListener('click', () => {
    autoRotate = !autoRotate;
    rotateBtn.textContent = autoRotate ? '⟳ Dừng quay' : '⟳ Tự quay';
  });
  if (resetBtn) resetBtn.addEventListener('click', () => {
    controls.reset();
    camera.position.set(0, 80, 180);
  });

  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value += 1/60;
    cityMeshes.forEach(mesh => {
      mesh.rotation.y += 0.01;
      if (mesh.userData.ring) {
        mesh.userData.ring.rotation.z += 0.005;
      }
    });
    if (autoRotate) {
      camera.position.x = Math.sin(Date.now() * 0.0001) * 180;
      camera.position.z = Math.cos(Date.now() * 0.0001) * 180;
      camera.lookAt(0, 0, 0);
    }
    controls.update();
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    renderer.setSize(width, 560);
    camera.aspect = width / 560;
    camera.updateProjectionMatrix();
  });

  animate();
}

initMap3D();