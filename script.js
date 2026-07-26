
const tabs = document.querySelectorAll('.tab');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW setup failed', err));
  });
}

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
  tabs.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');
    item.setAttribute('tabindex', '-1');
  });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
  const area = tab.dataset.area;
  document.querySelectorAll('[data-rural]').forEach(price => price.textContent = price.dataset[area]);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'tab_switch',
    'area_type': area
  });
}));

document.querySelectorAll('a[href="#contact"]').forEach(link => link.addEventListener('click', () => {
  const packageName = link.closest('.package')?.querySelector('h3')?.textContent.trim();
  if (packageName) {
    const finalPackage = packageName.includes('GIGA') ? 'GIGA / SKY' : packageName;
    document.querySelector('[name="package"]').value = finalPackage;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'package_select',
      'package_name': finalPackage
    });
  }
}));

async function getUserLocation() {
  const getIpLocation = async (reason) => {
    try {
      const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
      const data = await res.json();
      if (data.latitude && data.longitude) {
        return `IP: ${data.city}, ${data.region} | https://www.google.com/maps?q=${data.latitude},${data.longitude} (${reason})`;
      }
      return 'Không lấy được vị trí (' + reason + ')';
    } catch (e) {
      return 'Không lấy được vị trí (' + reason + ')';
    }
  };

  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(getIpLocation('Trình duyệt không hỗ trợ GPS'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(`GPS: https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`);
      },
      (error) => {
        let reason = 'Lỗi GPS chưa rõ';
        if (error.code === 1) reason = 'Khách chặn quyền GPS';
        if (error.code === 2) reason = 'Không định vị được GPS';
        if (error.code === 3) reason = 'GPS phản hồi quá lâu';
        resolve(getIpLocation(reason));
      },
      { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
    );
  });
}

document.querySelector('#leadForm').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const result = form.querySelector('.success');
  const originalLabel = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.textContent = 'Đang gửi thông tin...';
  result.textContent = '';
  result.classList.remove('error');

  // Honeypot check — silently reject bots
  const honeypot = form.querySelector('[name="website"]');
  if (honeypot && honeypot.value) {
    result.textContent = 'Cảm ơn bạn! FPT sẽ liên hệ tư vấn trong thời gian sớm nhất.';
    form.reset();
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
    return;
  }

  try {
    const endpoint = 'https://script.google.com/macros/s/AKfycbz3Oe508e2qCk32j38c2_ZGogZ5vluiMd15F_BQT7jpiPtf6EAIfjiVuW5X7NttwrVJlQ/exec';
    const formData = new FormData(form);

    const locationInfo = await getUserLocation();
    formData.append('Tọa độ', locationInfo);

    await fetch(endpoint, {
      method: 'POST',
      body: formData
    });
    result.textContent = 'Cảm ơn bạn! FPT sẽ liên hệ tư vấn trong thời gian sớm nhất.';

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'form_submit',
      'package_name': new FormData(form).get('Gói cước'),
      'time_preference': new FormData(form).get('Thời gian liên hệ')
    });

    form.reset();
  } catch (error) {
    console.error("Form submit error:", error);
    result.textContent = 'Chưa thể gửi thông tin (' + error.message + '). Vui lòng gọi ngay 0358513269 hoặc 0383 900 321 để được hỗ trợ.';
    result.classList.add('error');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});

// Track Phone clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'phone_click',
      'phone_number': link.getAttribute('href').replace('tel:', '')
    });
  });
});

// Track Zalo clicks
document.querySelectorAll('a[href^="https://zalo.me"]').forEach(link => {
  link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'zalo_click',
      'zalo_number': link.getAttribute('href').replace('https://zalo.me/', '')
    });
  });
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
  const cW = container.clientWidth, cH = container.clientHeight;

  // Import THREE dynamically
  Promise.all([
    import('three'),
    import('three/addons/controls/OrbitControls.js'),
    import('three/addons/postprocessing/EffectComposer.js'),
    import('three/addons/postprocessing/RenderPass.js'),
    import('three/addons/postprocessing/UnrealBloomPass.js')
  ]).then(([THREE, { OrbitControls }, { EffectComposer }, { RenderPass }, { UnrealBloomPass }]) => {

    const S = 0.6, H = 6, TOP = H;
    const P = (x, y, yTop = TOP) => new THREE.Vector3((x - 50) * S, yTop, -(y - 50) * S);

    /* ── Trạm phát sóng (tọa độ thực tế lat/lon → lưới) ── */
    const STATIONS = [
      { n: 'Hà Nội', x: 39, y: 74 },   // 105.85°E, 21.03°N
      { n: 'Hải Phòng', x: 47, y: 73 },   // 106.68°E, 20.86°N
      { n: 'Vinh', x: 38, y: 61 },   // 105.68°E, 18.68°N
      { n: 'Huế', x: 55, y: 49 },   // 107.59°E, 16.46°N
      { n: 'Đà Nẵng', x: 60, y: 47 },   // 108.22°E, 16.05°N
      { n: 'Nha Trang', x: 69, y: 26 },   // 109.19°E, 12.24°N
      { n: 'Đà Lạt', x: 62, y: 24 },   // 108.44°E, 11.94°N
      { n: 'TP. HCM', x: 46, y: 18 },   // 106.63°E, 10.82°N
      { n: 'Cần Thơ', x: 38, y: 14 },   // 105.75°E, 10.05°N
      { n: 'Hoàng Sa', x: 95, y: 50, sea: true },  // ~112°E, 16.5°N
      { n: 'Trường Sa', x: 113, y: 14, sea: true },  // ~114°E, 10°N
    ];

    /* ── SCENE / CAMERA / RENDERER ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02060d);
    scene.fog = new THREE.FogExp2(0x02060d, 0.006);

    const camera = new THREE.PerspectiveCamera(50, cW / cH, 0.1, 2000);
    camera.position.set(0, 50, 70 + Math.max(0, (1.5 - (cW / cH)) * 40));

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

    /* ── KHỐI Bản đồ (Được fetch động từ Highcharts GeoJSON) ── */
    const mapGroup = new THREE.Group();
    mapGroup.rotation.x = -Math.PI / 2;
    scene.add(mapGroup);

    // Hiệu ứng phát sáng khối
    const mat = new THREE.MeshPhongMaterial({
      color: 0xb00010, emissive: 0x550008, shininess: 40, transparent: true, opacity: 0.95
    });
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00fff0, transparent: true, opacity: 0.3 });

    fetch('assets/vn-all.geo.json')
      .then(r => r.json())
      .then(geojson => {
        // Tìm centroid của Hà Nội và TP.HCM trong GeoJSON
        let hnCenter = { x: 0, y: 0, c: 0 }, hcCenter = { x: 0, y: 0, c: 0 };
        geojson.features.forEach(f => {
          const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
          polys.forEach(poly => {
            poly[0].forEach(pt => {
              if (f.properties['hc-key'] === 'vn-318' || f.properties['hc-key'] === 'vn-hn') { hnCenter.x += pt[0]; hnCenter.y += pt[1]; hnCenter.c++; }
              if (f.properties['hc-key'] === 'vn-hc') { hcCenter.x += pt[0]; hcCenter.y += pt[1]; hcCenter.c++; }
            });
          });
        });
        hnCenter.x /= hnCenter.c; hnCenter.y /= hnCenter.c;
        hcCenter.x /= hcCenter.c; hcCenter.y /= hcCenter.c;

        // Tính công thức scale khớp với hệ trục 0-100 của STATIONS
        const targetHN = { x: 39, y: 74 }, targetHC = { x: 46, y: 18 };
        const scaleX = (targetHC.x - targetHN.x) / (hcCenter.x - hnCenter.x);
        const offsetX = targetHN.x - hnCenter.x * scaleX;
        const scaleY = (targetHC.y - targetHN.y) / (hcCenter.y - hnCenter.y);
        const offsetY = targetHN.y - hnCenter.y * scaleY;

        const mapX = hx => hx * scaleX + offsetX;
        const mapY = hy => hy * scaleY + offsetY;

        const shapes = [];
        geojson.features.forEach(f => {
          const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
          polys.forEach(poly => {
            const shape = new THREE.Shape();
            const ring = poly[0];
            for (let i = 0; i < ring.length; i++) {
              // Simplify (Skip points to boost performance)
              if (i > 0 && i < ring.length - 1 && i % 3 !== 0) continue;
              const X = (mapX(ring[i][0]) - 50) * S;
              const Y = (mapY(ring[i][1]) - 50) * S;
              if (i === 0) shape.moveTo(X, Y);
              else shape.lineTo(X, Y);
            }
            shape.closePath();
            shapes.push(shape);
          });
        });

        const extrudeGeo = new THREE.ExtrudeGeometry(shapes, {
          depth: H, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 1, curveSegments: 1
        });

        mapGroup.add(new THREE.Mesh(extrudeGeo, mat));
        mapGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(extrudeGeo, 2), lineMat));
      })
      .catch(e => console.error("Lỗi tải bản đồ:", e));

    /* ── NGÔI SAO VÀNG (khu vực Hà Nội) ── */
    const starS = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? 2 : 5, a = Math.PI / 2 + i * Math.PI / 5;
      i ? starS.lineTo(Math.cos(a) * r, Math.sin(a) * r) : starS.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    starS.closePath();
    const star = new THREE.Mesh(new THREE.ShapeGeometry(starS), new THREE.MeshBasicMaterial({ color: 0xffd400 }));
    star.rotation.x = -Math.PI / 2;
    star.position.copy(P(38, 46, H + 0.3));
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
    [[0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [4, 9], [7, 10], [0, 4]].forEach(([a, b]) => {
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
    const N = 2000;
    const posArr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * 400; // Tăng độ rộng trục X
      posArr[i * 3 + 1] = H + Math.random() * 100;   // Tăng độ cao trục Y
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 400; // Tăng độ rộng trục Z
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
      camera.position.set(0, 50, 70 + Math.max(0, (1.5 - camera.aspect) * 40));
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
        arr[i * 3 + 1] += dt * 3;
        if (arr[i * 3 + 1] > H + 100) arr[i * 3 + 1] = H;
      }
      pGeo.attributes.position.needsUpdate = true;

      controls.update();
      composer.render();
    })();

    /* ── RESIZE ── */
    window.addEventListener('resize', () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;

      // Tự động thu phóng để hạt xanh (bản đồ) luôn lắp đầy khung trên màn hình hẹp
      camera.position.z = 70 + Math.max(0, (1.5 - camera.aspect) * 40);

      camera.updateProjectionMatrix();
      composer.setSize(w, h);
    });
  }).catch(() => {
    // Fallback khi CDN fail / bị chặn / mạng yếu
    if (container) {
      container.innerHTML = `
        <div style="display:grid;place-items:center;height:100%;color:#94a3b8;text-align:center;padding:40px">
          <div>
            <p style="font-size:48px;margin:0">🗺️</p>
            <p style="font-size:14px;margin:12px 0 0">Bản đồ cần kết nối mạng ổn định để hiển thị.</p>
          </div>
        </div>`;
    }
  }); // End of Promise.all
}

const mapSection = document.getElementById('areas');
if (mapSection) {
  const mapObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      initMap3D();
      mapObserver.disconnect();
    }
  }, { rootMargin: '400px' });
  mapObserver.observe(mapSection);
}

/* =========================================================
   CRO: STICKY CTA & SOCIAL PROOF TOAST
   ========================================================= */
const stickyCta = document.getElementById('sticky-cta');
const contactSection = document.getElementById('contact');
const heroSection = document.querySelector('.hero');

if (stickyCta && contactSection && heroSection) {
  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const contactTop = contactSection.getBoundingClientRect().top;

    // Show sticky CTA if scrolled past hero AND haven't reached contact form
    if (heroBottom < 0 && contactTop > window.innerHeight) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }, { passive: true });
}

// Social Proof Toast Logic
const toast = document.getElementById('social-proof-toast');
const toastName = document.getElementById('toast-name');
const toastAction = document.getElementById('toast-action');

const names = [
  'Anh Khang', 'Chị Mai', 'Anh Tuấn', 'Chị Lan', 'Anh Hoàng', 'Anh Vinh', 'Chị Thảo', 'Anh Minh', 'Chị Ngọc', 'Anh Đạt',
  'Chú Hùng', 'Cô Yến', 'Anh Sơn', 'Chị Trâm', 'Chị Hằng', 'Anh Phong', 'Chị Quyên', 'Anh Cường', 'Chị Phượng', 'Anh Bách',
  'Chị Linh', 'Anh Đức', 'Chị Phương', 'Anh Tài', 'Chị Vy', 'Anh Hưng', 'Chị Trang', 'Anh Huy', 'Chị Hà', 'Anh Bảo',
  'Chú Bình', 'Cô Hoa', 'Anh Hiếu', 'Chị Dung', 'Anh Vũ', 'Chị Nhung', 'Anh Trường', 'Chị Oanh', 'Anh Thành', 'Chị Ngân',
  'Anh Tâm', 'Chị My', 'Anh Kiên', 'Chị Thu', 'Anh Tùng', 'Chị Thúy', 'Anh Nam', 'Chị Liên', 'Anh Hải', 'Chị Yến',
  'Em Duy', 'Em Vân', 'Bác Long', 'Bác Nga', 'Anh Phát', 'Chị Quỳnh', 'Anh Lộc', 'Chị Tiên', 'Anh Luân', 'Chị Trinh',
  'Anh Trung', 'Chị Hương', 'Anh Thắng', 'Chị Tuyết', 'Anh Quân', 'Chị Loan', 'Anh Dũng', 'Chị Nhi', 'Anh Lâm', 'Chị Thủy',
  'Anh Phúc', 'Chị Giang', 'Anh Thiện', 'Chị Thanh', 'Anh Khoa', 'Chị Huyền', 'Anh Nghĩa', 'Chị Châu', 'Anh Trí', 'Chị Ly',
  'Anh Tân', 'Chị Kim', 'Anh Hậu', 'Chị Đào', 'Anh Toàn', 'Chị Sương', 'Anh Nhật', 'Chị Diệp', 'Anh Sang', 'Chị Tú',
  'Chú Thanh', 'Cô Tuyến', 'Anh Khôi', 'Chị Thơ', 'Anh Nguyên', 'Chị Mơ', 'Anh Thịnh', 'Chị Trúc', 'Anh Quang', 'Chị Cẩm'
];
const locations = [
  'Q.1', 'Q.2', 'Q.3', 'Q.4', 'Q.5', 'Q.7', 'Q.9', 'Q.10', 'Q.12', 'Gò Vấp', 'Thủ Đức', 'Tân Bình', 'Tân Phú', 'Bình Thạnh', 'Phú Nhuận',
  'Hà Nội', 'Đà Nẵng', 'Bình Dương', 'Biên Hòa', 'Hải Phòng', 'Cần Thơ', 'Nha Trang', 'Vũng Tàu', 'Thanh Hóa', 'Đà Lạt',
  'Huế', 'Quảng Ninh', 'Bắc Ninh', 'Nghệ An', 'Quy Nhơn'
];

function getRandomCustomer() {
  const name = names[Math.floor(Math.random() * names.length)];
  const loc = locations[Math.floor(Math.random() * locations.length)];
  return `${name} (${loc})`;
}
const actions = [
  'vừa đăng ký gói COMBO VIP',
  'đang nhận tư vấn lắp đặt',
  'vừa lắp xong gói GIGA',
  'đã đăng ký gói F-GAME',
  'vừa lắp FPT Camera AI',
  'đăng ký Internet 6 tháng (Tặng 1)',
  'vừa nâng cấp lên modem WiFi 6',
  'vừa lắp Combo Internet + Truyền hình',
  'đã đăng ký gói SKY tốc độ cao',
  'vừa yêu cầu khảo sát hạ tầng mạng'
];
function getRandomTimeAgo() {
  const r = Math.random();
  if (r < 0.25) return 'vừa xong';
  if (r < 0.85) return `${Math.floor(Math.random() * 59) + 1} phút trước`;
  return `${Math.floor(Math.random() * 4) + 1} giờ trước`;
}

function showRandomToast() {
  if (!toast) return;
  const randomCustomer = getRandomCustomer();
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  const randomTime = getRandomTimeAgo();

  toastName.textContent = randomCustomer;
  toastAction.textContent = `${randomAction} (${randomTime})`;

  toast.classList.add('show');

  const displayDuration = Math.floor(3000 + Math.random() * 4000); // Hiển thị ngẫu nhiên từ 3 đến 7 giây
  setTimeout(() => {
    toast.classList.remove('show');
  }, displayDuration);
}

if (toast) {
  const firstDelay = Math.floor(5000 + Math.random() * 10000); // Lần xuất hiện đầu tiên sau 5-15s
  setTimeout(function triggerToast() {
    showRandomToast();
    const nextInterval = Math.floor(10000 + Math.random() * 25000); // Khoảng cách giữa 2 lần từ 10s đến 35s
    setTimeout(triggerToast, nextInterval);
  }, firstDelay);
}

/* =========================================================
   ADVANCED TRACKING & CRO LOGIC
   ========================================================= */
// 1. Page Load DataLayer Push
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'page_data',
  page_title: document.title,
  page_url: window.location.href,
  page_type: 'landing_page'
});

// 2. Scroll Depth Tracking
const scrollMarks = { 25: false, 50: false, 75: false, 100: false };
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  [25, 50, 75, 100].forEach(mark => {
    if (scrollPercent >= mark && !scrollMarks[mark]) {
      scrollMarks[mark] = true;
      if (typeof gtag === 'function') gtag('event', 'scroll_depth', { depth: mark + '%' });
    }
  });
}, { passive: true });

// 3. Time on Page Tracking
const timeSegments = [
  { time: 30000, label: '< 30s' },
  { time: 120000, label: '30s - 2m' },
  { time: 300000, label: '2m - 5m' }
];
timeSegments.forEach(seg => {
  setTimeout(() => {
    if (typeof gtag === 'function') gtag('event', 'time_on_page', { segment: seg.label });
  }, seg.time);
});

// 4. Exit Intent Popup
let exitIntentTriggered = false;
const exitPopup = document.getElementById('exit-popup');
// Exit intent popup — desktop only
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !exitIntentTriggered && exitPopup) {
      exitIntentTriggered = true;
      exitPopup.classList.add('show');
      if (typeof gtag === 'function') gtag('event', 'exit_intent_show');
    }
  });
}
if (exitPopup) {
  exitPopup.querySelector('.close-popup').addEventListener('click', () => {
    exitPopup.classList.remove('show');
  });
}

// 5. Countdown timer — end of week (Sunday 23:59:59)
const timer = document.getElementById('countdown-timer');
const announce = document.getElementById('countdown-announce');
if (timer) {
  function getNextSundayEnd() {
    const now = new Date();
    const end = new Date(now);
    const daysUntilSunday = now.getDay() === 0 ? 0 : 7 - now.getDay();
    end.setDate(now.getDate() + daysUntilSunday);
    end.setHours(23, 59, 59, 0);
    if (end <= now) end.setDate(end.getDate() + 7);
    return end;
  }

  let endOfWeek = getNextSundayEnd();
  let tickCount = 0;

  function updateCountdown() {
    const now = new Date();
    let diff = endOfWeek - now;
    if (diff <= 0) { endOfWeek = getNextSundayEnd(); diff = endOfWeek - now; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const text = d > 0 ? `${d} ngày ${h}h ${m}p` : `${h}h ${m}p ${s}s`;
    timer.textContent = text;

    // Announce cho screen reader mỗi 5 phút (300 ticks)
    tickCount++;
    if (announce && tickCount % 300 === 0) {
      announce.textContent = `Ưu đãi kết thúc sau ${text}`;
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// 6. Social Proof Weekly Counter
const socialProofCountEl = document.getElementById('social-proof-count');
if (socialProofCountEl) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
  const currentDay = dayOfWeek === 0 ? 7 : dayOfWeek; // Treat Mon as 1, Sun as 7

  // Base count scales up as the week progresses (Day 1: ~25, Day 7: ~160)
  const baseCount = currentDay * 23 + (now.getDate() % 5);

  // Calculate current week string (e.g. "2026-W30")
  const startDate = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - startDate) / (24 * 60 * 60 * 1000));
  const weekNumber = now.getFullYear() + '-W' + Math.ceil((now.getDay() + 1 + days) / 7);

  const storedWeek = localStorage.getItem('fpt_sp_week');
  const storedCount = parseInt(localStorage.getItem('fpt_sp_count'), 10);

  let displayCount = baseCount;

  // If we are in the same week, ensure the number only goes UP, never down
  if (storedWeek === weekNumber && !isNaN(storedCount) && storedCount > displayCount) {
    displayCount = storedCount;
  }

  socialProofCountEl.textContent = displayCount;
  localStorage.setItem('fpt_sp_week', weekNumber);
  localStorage.setItem('fpt_sp_count', displayCount);

  // Auto increment by 1-3 occasionally while user is on the page
  setInterval(() => {
    if (Math.random() > 0.6) {
      displayCount += Math.floor(Math.random() * 3) + 1;
      socialProofCountEl.textContent = displayCount;
      localStorage.setItem('fpt_sp_count', displayCount);
    }
  }, 45000); // Check every 45 seconds
}

// 7. Chat Widget Logic
const chatToggle = document.getElementById('chat-toggle');
const chatWidget = document.getElementById('chat-widget');
const chatMinimize = document.getElementById('chat-minimize');
const chatIcon = chatToggle?.querySelector('.chat-icon');
const closeIcon = chatToggle?.querySelector('.close-icon');

if (chatToggle && chatWidget) {
  const popupAudio = new Audio('assets/music/thongbao.mp3');
  popupAudio.preload = 'auto';

  let audioUnlocked = false;
  const initAudio = () => {
    if (audioUnlocked) return;
    popupAudio.muted = true; // Chạy nền im lặng để trình duyệt dễ dàng chấp nhận
    const playPromise = popupAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        popupAudio.pause();
        popupAudio.currentTime = 0;
        popupAudio.muted = false; // Trả lại âm thanh bình thường
        audioUnlocked = true;
        ['click', 'touchstart', 'keydown'].forEach(evt =>
          document.removeEventListener(evt, initAudio)
        );
      }).catch(() => {
        popupAudio.muted = false;
      });
    }
  };

  ['click', 'touchstart', 'keydown'].forEach(evt =>
    document.addEventListener(evt, initAudio)
  );

  const playDing = () => {
    try {
      popupAudio.currentTime = 0;
      const playPromise = popupAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn("Trình duyệt chặn phát âm thanh tự động:", err));
      }
    } catch (e) { }
  };

  let userInteractedWithChat = false;
  let hasPlayedSound = false;

  const toggleChat = (isAutoOpen = false) => {
    const isOpen = chatWidget.classList.toggle('open');

    if (isOpen && isAutoOpen && !hasPlayedSound) {
      playDing();
      hasPlayedSound = true;
    }

    if (chatIcon && closeIcon) {
      chatIcon.style.display = isOpen ? 'none' : 'block';
      closeIcon.style.display = isOpen ? 'block' : 'none';
    }
  };

  chatToggle.addEventListener('click', () => {
    userInteractedWithChat = true;
    hasPlayedSound = true; // Hủy âm thanh nếu user tự bấm
    toggleChat(false);
  });

  // Auto open popup after 10 seconds
  setTimeout(() => {
    if (!chatWidget.classList.contains('open') && !userInteractedWithChat) {
      toggleChat(true);
    }
  }, 10000);
  if (chatMinimize) {
    chatMinimize.addEventListener('click', () => {
      chatWidget.classList.remove('open');
      if (chatIcon && closeIcon) {
        chatIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    });
  }

  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatHistory = []; // Lưu ngữ cảnh trò chuyện

  if (chatInput && chatSendBtn && chatMessages) {
    const appendMessage = (text, sender) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${sender}-msg`;
      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble';

      const parts = text.split(/(\*\*.*?\*\*|\n)/g);
      parts.forEach(part => {
        if (!part) return;
        if (part === '\n') {
          bubble.appendChild(document.createElement('br'));
        } else if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          const b = document.createElement('b');
          b.textContent = part.slice(2, -2);
          bubble.appendChild(b);
        } else {
          bubble.appendChild(document.createTextNode(part));
        }
      });

      msgDiv.appendChild(bubble);
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return msgDiv;
    };

    let sessionId = localStorage.getItem('chat_session_id');
    const chatWidgetBody = document.querySelector('.chat-widget-body');

    function promptForNameAndStart(onComplete) {
      const nameOverlay = document.createElement('div');
      nameOverlay.id = 'chat-name-overlay';
      nameOverlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#fff;z-index:10;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px;box-sizing:border-box;border-radius:0 0 16px 16px;';
      nameOverlay.innerHTML = `
        <img src="assets/images/logo.png" alt="FPT Logo" style="width: 48px; height: 48px; object-fit: contain; margin-bottom: 12px; border-radius: 50%; padding: 2px; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
        <h4 style="margin:0 0 10px 0;color:#333;font-size:16px;">Chào bạn! 👋</h4>
        <p style="margin:0 0 15px 0;color:#666;font-size:14px;text-align:center;">Vui lòng cho biết tên của bạn để nhân viên dễ xưng hô</p>
        <input type="text" id="chat-name-input" placeholder="Nhập tên của bạn..." style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin-bottom:15px;font-size:14px;outline:none;box-sizing:border-box;">
        <button id="chat-name-submit" style="width:100%;padding:10px;background:#0066ff;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer;font-weight:600;">Bắt đầu chat</button>
      `;
      chatWidgetBody.appendChild(nameOverlay);
      
      const submitBtn = nameOverlay.querySelector('#chat-name-submit');
      const nameInput = nameOverlay.querySelector('#chat-name-input');
      nameInput.focus();
      
      const startChat = () => {
        let name = nameInput.value.trim();
        if (!name) name = "Khach";
        // Lọc dấu tiếng Việt và ký tự đặc biệt để làm ID an toàn
        const safeName = name.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '');
        const randomStr = (window.crypto.getRandomValues(new Uint32Array(1))[0]).toString(36).substring(0, 6);
        sessionId = (safeName || 'Khach') + '_' + randomStr;
        localStorage.setItem('chat_session_id', sessionId);
        nameOverlay.remove();
        if (onComplete) onComplete();
      };
      
      submitBtn.onclick = startChat;
      nameInput.onkeydown = (e) => { if (e.key === 'Enter') startChat(); };
    }

    if (!sessionId) {
      promptForNameAndStart();
    }
    let chatMode = 'ai'; // Mặc định là chat với AI
    let pollInterval;
    let pollTimerMs = 2500;
    let isClosed = false;
    let lastOwnerMsgId = 0;

    const API_ENDPOINT = 'https://man-chatbot.tvm19624.workers.dev/api/chat';
    const POLL_ENDPOINT = API_ENDPOINT.replace('/api/chat', '/api/poll');
    const CLOSE_ENDPOINT = API_ENDPOINT.replace('/api/chat', '/api/close');

    function showClosedNotice(reason) {
      const notice = document.createElement("div");
      notice.className = "chat-msg bot-msg";
      
      let msgText = "Phiên chat đã tự động đóng do không hoạt động sau 5 phút.";
      if (reason === "session_closed") msgText = "Phiên chat với nhân viên đã kết thúc.";
      
      notice.innerHTML = `<div class="msg-bubble" style="background: #fff3cd; color: #856404; font-style: italic;">${msgText}</div>`;
      chatMessages.appendChild(notice);
      
      const btnDiv = document.createElement("div");
      btnDiv.className = "chat-msg bot-msg";
      btnDiv.style.justifyContent = "center";
      
      const btn = document.createElement("button");
      btn.textContent = "💬 Bắt đầu chat với AI";
      btn.style.cssText = "display:block;margin:12px auto;padding:10px 20px;background:#0066ff;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:14px;";
      
      btn.onclick = () => {
        localStorage.removeItem('chat_session_id');
        promptForNameAndStart(() => {
          lastOwnerMsgId = 0;
        isClosed = false;
        chatMode = 'ai';
        chatHistory.length = 0;
        
        notice.remove();
        btnDiv.remove();
        
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatInput.placeholder = "Nhập câu hỏi của bạn...";
        
        appendMessage("Chào bạn! 👋 Mình là trợ lý ảo FPT Telecom. Bạn cần tư vấn gì ạ?", "bot");
        });
      };
      
      btnDiv.appendChild(btn);
      chatMessages.appendChild(btnDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      chatInput.disabled = true;
      chatSendBtn.disabled = true;
      chatInput.placeholder = "Phiên đã đóng. Bấm nút trên để chat mới.";
    }

    const pollMessages = async () => {
      if (chatMode !== 'live' || isClosed) return;
      try {
        const res = await fetch(`${POLL_ENDPOINT}?session=${sessionId}&after=${lastOwnerMsgId}`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.closed) {
          isClosed = true;
          if (pollInterval) clearInterval(pollInterval);
          showClosedNotice(data.reason);
          return;
        }

        if (data.messages && data.messages.length > 0) {
          for (const m of data.messages) {
            appendMessage(m.text, 'bot');
            chatHistory.push({ role: "model", text: m.text });
            lastOwnerMsgId = Math.max(lastOwnerMsgId, m.id);
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    function startLiveChatPolling() {
      if (pollInterval) clearInterval(pollInterval);
      pollInterval = setInterval(pollMessages, pollTimerMs);
    }

    // Chuyển sang chế độ kết nối nhân viên
    window.switchToLiveChat = async function() {
      if (chatMode === 'live' || isClosed) return;
      chatMode = 'live';
      appendMessage('✅ Đã gửi yêu cầu kết nối trực tiếp với nhân viên hỗ trợ (Tiểu Mẫn FPT). Bạn vui lòng chờ trong giây lát nhé!', 'bot');

      try {
        await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: "Khách hàng vừa nhấn nút yêu cầu chat trực tiếp với nhân viên.", 
            history: chatHistory, 
            session: sessionId, 
            mode: 'live' 
          })
        });
      } catch (e) {
        console.error(e);
      }

      startLiveChatPolling();
    };

    // Tối ưu Polling khi ẩn/hiện Tab
    document.addEventListener("visibilitychange", () => {
      if (chatMode !== 'live' || isClosed) return;
      if (document.hidden) {
        pollTimerMs = 15000; // Giãn 15s khi ẩn tab
      } else {
        pollTimerMs = 2500; // Trở lại 2.5s khi mở tab
        pollMessages(); // Poll ngay lập tức 1 phát cho đỡ trễ
      }
      startLiveChatPolling();
    });

    const sendMessage = async () => {
      const message = chatInput.value.trim();
      if (!message || isClosed) return;

      appendMessage(message, 'user');
      chatHistory.push({ role: "user", text: message });
      
      chatInput.value = '';
      chatInput.style.height = 'auto';
      chatSendBtn.disabled = true;

      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'chat-msg bot-msg';
      typingIndicator.innerHTML = `<div class="msg-bubble typing-indicator"><span></span><span></span><span></span></div>`;
      chatMessages.appendChild(typingIndicator);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      try {
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: message, history: chatHistory, session: sessionId, mode: chatMode })
        });
        
        const data = await response.json();
        
        if (chatMode === 'ai') {
          if (typingIndicator.parentNode) chatMessages.removeChild(typingIndicator);
          
          if (data.reply) {
            appendMessage(data.reply, 'bot');
            chatHistory.push({ role: "model", text: data.reply });
          } else {
            appendMessage(data.error || 'Xin lỗi, hệ thống AI đang bận.', 'bot');
          }
        } else {
          // Live Chat Mode
          if (typingIndicator.parentNode) chatMessages.removeChild(typingIndicator);
          if (data.error) {
             appendMessage(data.error, 'bot');
          }
        }
      } catch (err) {
        if (typingIndicator.parentNode) chatMessages.removeChild(typingIndicator);
        appendMessage('Xin lỗi, không thể kết nối đến máy chủ.', 'bot');
      } finally {
        chatSendBtn.disabled = false;
        if (!isClosed) chatInput.focus();
      }
    };

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    chatInput.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }

  window.openPolicyModal = (e) => {
    if (e) e.preventDefault();
    const modal = document.getElementById('policy-modal');
    if (modal) modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang nền
  };

  window.closePolicyModal = () => {
    const modal = document.getElementById('policy-modal');
    if (modal) modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  // FAQ Accordion Logic
  const faqDetails = document.querySelectorAll('.faq-list details');
  if (faqDetails.length > 0) {
    faqDetails.forEach(detail => {
      detail.addEventListener('click', (e) => {
        if (!detail.open) {
          faqDetails.forEach(d => {
            if (d !== detail && d.open) d.open = false;
          });
        }
      });
    });

  }
}

/* =========================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ========================================================= */
const scrollElements = document.querySelectorAll('.scroll-animate');
if (scrollElements.length > 0) {
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Stop observing if we only want it to animate once
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  scrollElements.forEach(el => scrollObserver.observe(el));
}
